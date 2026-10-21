/* ==========================================================================
   Article HTML → a safe element tree.

   The essay archive stores each post's body exactly as it was published, which
   means third-party markup. It is never trusted: this module rebuilds it from
   an allowlist of tags and attributes and drops everything else, so a malformed
   or hostile post cannot inject script, styling, or a tracking pixel into the
   page.

   The tree is the only representation that leaves this module. React elements
   come from components/writing/article-body, and the Markdown twin comes from
   lib/markdown — neither ever sees a raw HTML string, so neither needs
   dangerouslySetInnerHTML.

   Written by hand rather than pulled from a parser dependency, for the same
   reason the Medium feed is parsed with regexes: the tag set in play is small
   and fixed, and a fixed parser is auditable in one screen.
   ========================================================================== */

export type ArticleNode =
  | { type: "text"; value: string }
  | { type: "element"; tag: string; attrs: Record<string, string>; children: ArticleNode[] };

/** Elements that never have a closing tag. */
const VOID_TAGS = new Set(["br", "hr", "img", "wbr", "source", "col"]);

/**
 * Elements dropped together with everything inside them. Their content is not
 * text a reader would want (script source, style rules, form fields) and some
 * of it is executable, so it must not be unwrapped into the body.
 */
const DROP_TAGS = new Set([
  "script",
  "style",
  "iframe",
  "object",
  "embed",
  "noscript",
  "form",
  "input",
  "button",
  "select",
  "option",
  "textarea",
  "label",
  "svg",
  "math",
  "canvas",
  "video",
  "audio",
  "track",
  "source",
  "link",
  "meta",
  "base",
  "template",
  "head",
  "title",
]);

/** Elements rendered as themselves. Anything else is unwrapped: its text is
 *  kept, its box is discarded. */
const ALLOWED_TAGS = new Set([
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "del",
  "mark",
  "code",
  "pre",
  "blockquote",
  "ul",
  "ol",
  "li",
  "a",
  "img",
  "figure",
  "figcaption",
  "hr",
  "br",
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "sup",
  "sub",
  "dl",
  "dt",
  "dd",
]);

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: "\u00a0",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  trade: "™",
  reg: "®",
  copy: "©",
  middot: "·",
  bull: "•",
  deg: "°",
  euro: "€",
  pound: "£",
  yen: "¥",
  times: "×",
  divide: "÷",
  minus: "−",
  laquo: "«",
  raquo: "»",
  larr: "←",
  rarr: "→",
  harr: "↔",
  ne: "≠",
  le: "≤",
  ge: "≥",
  eacute: "é",
  egrave: "è",
  agrave: "à",
  ccedil: "ç",
  uuml: "ü",
  ouml: "ö",
  auml: "ä",
  szlig: "ß",
  ntilde: "ñ",
  aacute: "á",
  iacute: "í",
  oacute: "ó",
  uacute: "ú",
  hearts: "♥",
  emsp: " ",
  ensp: " ",
  thinsp: " ",
};

/** Decode the entity set that shows up in prose. Unknown entities are left
 *  alone rather than dropped, so a stray `&foo;` still reads as `&foo;`. */
export function decodeEntities(text: string): string {
  return text.replace(/&(#[xX]?[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]{1,31});/g, (match, entity: string) => {
    if (entity.startsWith("#")) {
      const hex = entity[1] === "x" || entity[1] === "X";
      const code = Number.parseInt(hex ? entity.slice(2) : entity.slice(1), hex ? 16 : 10);
      if (!Number.isFinite(code) || code <= 0 || code > 0x10ffff) return match;
      // Surrogates are not valid standalone code points.
      if (code >= 0xd800 && code <= 0xdfff) return match;
      return String.fromCodePoint(code);
    }
    const named = NAMED_ENTITIES[entity.toLowerCase()];
    return named ?? match;
  });
}

/**
 * A URL is kept only if it is unambiguously safe to put in `href`/`src`.
 *
 * `javascript:` and `data:` are rejected outright, and so are protocol-
 * relative URLs (`//evil.example`), which inherit the page's scheme and
 * therefore its trust. Root-relative paths are allowed.
 */
export function safeUrl(value: string | undefined): string | null {
  if (!value) return null;
  const url = value.trim();
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  if (/^mailto:/i.test(url)) return url;
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  if (url.startsWith("#")) return url;
  return null;
}

/**
 * Images that exist to report a read rather than to show something.
 *
 * The published bodies end with a 1x1 pixel that tells Medium that the
 * reader arrived from here. Serving it would tell the publisher who read the
 * article on this site, which is not something a mirror should do, so these
 * are dropped rather than rendered.
 */
function isTrackingPixel(attrs: Record<string, string>): boolean {
  const src = attrs.src ?? "";
  if (/\/_\/stat/i.test(src)) return true;
  const width = Number.parseInt(attrs.width ?? "", 10);
  const height = Number.parseInt(attrs.height ?? "", 10);
  return width === 1 && height === 1;
}

/* -------------------------------------------------------------- tokenizing */

type Token =
  | { type: "text"; value: string }
  | { type: "tag"; name: string; closing: boolean; selfClosing: boolean; raw: string };

const TOKEN_RE = /<!--[\s\S]*?-->|<\/?[a-zA-Z][a-zA-Z0-9-]*(?:"[^"]*"|'[^']*'|[^>"'])*>/g;

function tokenize(html: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(html)) !== null) {
    if (match.index > last) {
      tokens.push({ type: "text", value: html.slice(last, match.index) });
    }
    const raw = match[0];
    if (raw.startsWith("<!--")) {
      last = TOKEN_RE.lastIndex;
      continue;
    }
    const name = /^<\/?([a-zA-Z][a-zA-Z0-9-]*)/.exec(raw)?.[1]?.toLowerCase() ?? "";
    tokens.push({
      type: "tag",
      name,
      closing: raw.startsWith("</"),
      selfClosing: raw.endsWith("/>") || VOID_TAGS.has(name),
      raw,
    });
    last = TOKEN_RE.lastIndex;
  }
  if (last < html.length) tokens.push({ type: "text", value: html.slice(last) });
  return tokens;
}

const ATTR_RE = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

/**
 * The only attributes that survive parsing.
 *
 * Everything else is dropped at the source rather than left in the tree for
 * the renderer to remember to ignore. That matters for `on*` handlers: if an
 * attribute ever reached the DOM, the article would be running code. The
 * renderer only reads the attributes listed here too, so the two agree.
 */
const ALLOWED_ATTRS = new Set(["href", "src", "alt", "title", "width", "height"]);

function parseAttrs(raw: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const body = raw.replace(/^<\/?[a-zA-Z][a-zA-Z0-9-]*/, "").replace(/\/?>$/, "");
  ATTR_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = ATTR_RE.exec(body)) !== null) {
    const key = match[1].toLowerCase();
    if (!ALLOWED_ATTRS.has(key)) continue;
    if (key in attrs) continue;
    attrs[key] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return attrs;
}

/* ----------------------------------------------------------------- parsing */

/**
 * Parse an article body into a tree of allowlisted elements.
 *
 * Unbalanced markup is tolerated the way a browser tolerates it: a closing
 * tag with no matching open tag is ignored, and an unclosed element closes at
 * the end of its parent.
 */
export function parseArticleHtml(html: string): ArticleNode[] {
  const root: ArticleNode[] = [];
  /** `stack[k]` holds the children of the element named by `openTags[k]`. */
  const stack: ArticleNode[][] = [root];
  const openTags: string[] = ["#root"];
  /** Non-zero while inside an element whose content is being dropped. */
  let dropDepth = 0;
  /** The tag name that opened the current drop region. */
  let dropTag = "";

  for (const token of tokenize(html)) {
    if (token.type === "text") {
      if (dropDepth === 0) {
        const value = decodeEntities(token.value);
        if (value.trim()) stack[stack.length - 1].push({ type: "text", value });
        else if (value) stack[stack.length - 1].push({ type: "text", value: " " });
      }
      continue;
    }

    const { name, closing, selfClosing } = token;

    if (dropDepth > 0) {
      if (name === dropTag) {
        if (closing) dropDepth -= 1;
        else if (!selfClosing) dropDepth += 1;
      }
      continue;
    }

    if (DROP_TAGS.has(name)) {
      if (!closing && !selfClosing) {
        dropDepth = 1;
        dropTag = name;
      }
      continue;
    }

    if (closing) {
      // Close the nearest open element with this tag name. If there is none,
      // the tag is stray and is ignored.
      for (let k = openTags.length - 1; k >= 1; k -= 1) {
        if (openTags[k] !== name) continue;
        stack.length = k;
        openTags.length = k;
        break;
      }
      continue;
    }

    if (!ALLOWED_TAGS.has(name)) {
      // Unknown tag: unwrap it. Its children still belong to the current
      // parent, so the text survives even though the box does not.
      continue;
    }

    const node: ArticleNode = {
      type: "element",
      tag: name,
      attrs: parseAttrs(token.raw),
      children: [],
    };
    // A read-tracking pixel is not content. Drop it before it becomes a node.
    if (name === "img" && isTrackingPixel(node.attrs)) continue;
    stack[stack.length - 1].push(node);
    if (!selfClosing) {
      stack.push(node.children);
      openTags.push(name);
    }
  }

  return root;
}

/* ----------------------------------------------------------------- reading */

/** Flatten a tree to plain text, for excerpts and word counts. */
export function nodesToText(nodes: ArticleNode[]): string {
  let out = "";
  for (const node of nodes) {
    if (node.type === "text") {
      out += node.value;
      continue;
    }
    if (["p", "div", "li", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6", "pre", "tr", "br"].includes(node.tag)) {
      out += " ";
    }
    out += nodesToText(node.children);
  }
  return out.replace(/\s+/g, " ").trim();
}

/** Flatten a tree to Markdown, for the markdown twin of an article page. */
export function nodesToMarkdown(nodes: ArticleNode[], depth = 0): string {
  const blocks: string[] = [];

  for (const node of nodes) {
    if (node.type === "text") {
      const value = node.value.trim();
      if (value) blocks.push(value);
      continue;
    }

    const { tag, attrs, children } = node;

    if (tag === "pre") {
      const code = nodesToText(children);
      blocks.push(`\`\`\`\n${code}\n\`\`\``);
      continue;
    }
    if (tag === "blockquote") {
      const inner = nodesToMarkdown(children, depth).trim();
      blocks.push(inner.split("\n").map((line) => `> ${line}`).join("\n"));
      continue;
    }
    if (tag === "ul" || tag === "ol") {
      const items = children
        .filter((child): child is Extract<ArticleNode, { type: "element" }> => child.type === "element" && child.tag === "li")
        .map((item, index) => {
          const marker = tag === "ol" ? `${index + 1}.` : "-";
          const inner = nodesToMarkdown(item.children, depth + 1).trim().replace(/\n+/g, "\n  ");
          return `${marker} ${inner}`;
        });
      if (items.length) blocks.push(items.join("\n"));
      continue;
    }
    if (tag === "img") {
      const src = safeUrl(attrs.src);
      if (src) blocks.push(`![${attrs.alt ?? ""}](${src})`);
      continue;
    }
    if (tag === "figure") {
      const image = children.find(
        (child): child is Extract<ArticleNode, { type: "element" }> => child.type === "element" && child.tag === "img",
      );
      const caption = children.find(
        (child): child is Extract<ArticleNode, { type: "element" }> => child.type === "element" && child.tag === "figcaption",
      );
      const src = safeUrl(image?.attrs.src);
      if (src) blocks.push(`![${image?.attrs.alt ?? ""}](${src})`);
      if (caption) {
        const text = nodesToText(caption.children);
        if (text) blocks.push(`*${text}*`);
      }
      continue;
    }
    if (tag === "hr") {
      blocks.push("---");
      continue;
    }
    if (tag === "br") {
      blocks.push("");
      continue;
    }
    if (/^h[1-6]$/.test(tag)) {
      blocks.push(`${"#".repeat(Number(tag[1]))} ${nodesToText(children)}`);
      continue;
    }

    const inline = inlineMarkdown(children);
    if (!inline.trim()) continue;

    if (["p", "figcaption", "dd", "dt", "td", "th", "li"].includes(tag)) {
      blocks.push(inline.trim());
      continue;
    }
    if (tag === "pre") blocks.push(inline.trim());

    // Any remaining element contributes its inline content to the current
    // block, which is how a `<strong>` inside a `<p>` stays inline.
    if (!blocks.length) blocks.push(inline.trim());
  }

  return blocks.filter((block) => block !== undefined).join("\n\n");
}

/** Inline formatting: bold, italic, code, links. */
function inlineMarkdown(nodes: ArticleNode[]): string {
  let out = "";
  for (const node of nodes) {
    if (node.type === "text") {
      out += node.value;
      continue;
    }
    const { tag, attrs, children } = node;
    if (tag === "strong" || tag === "b") out += `**${inlineMarkdown(children)}**`;
    else if (tag === "em" || tag === "i") out += `*${inlineMarkdown(children)}*`;
    else if (tag === "code") out += `\`${nodesToText(children)}\``;
    else if (tag === "del" || tag === "s") out += `~~${inlineMarkdown(children)}~~`;
    else if (tag === "a") {
      const href = safeUrl(attrs.href);
      out += href ? `[${inlineMarkdown(children)}](${href})` : inlineMarkdown(children);
    } else if (tag === "br") out += "  \n";
    else if (tag === "img") {
      const src = safeUrl(attrs.src);
      out += src ? `![${attrs.alt ?? ""}](${src})` : "";
    } else out += inlineMarkdown(children);
  }
  return out;
}
