import { Fragment, type ElementType, type ReactNode } from "react";
import { parseArticleHtml, safeUrl, type ArticleNode } from "@/lib/article-html";

/* ==========================================================================
   Article body renderer.

   The archive stores each essay's body as the markup it was published with.
   That markup is third-party, so it is never injected as HTML: it is parsed
   into an allowlisted tree (lib/article-html) and rebuilt here as React
   elements. There is no dangerouslySetInnerHTML on this page, which means a
   post cannot ship a script tag, an inline handler, or a tracking pixel
   regardless of what the source contains.

   The visual treatment lives in the `article-body` utility in app/globals.css
   so the long-form rules stay in one place instead of being scattered across
   per-tag class names.
   ========================================================================== */

/** Tag → element. Anything not listed is unwrapped by the parser already. */
const TAGS: Record<string, ElementType> = {
  p: "p",
  h1: "h2",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  strong: "strong",
  b: "strong",
  em: "em",
  i: "em",
  u: "u",
  s: "s",
  del: "s",
  mark: "mark",
  code: "code",
  pre: "pre",
  blockquote: "blockquote",
  ul: "ul",
  ol: "ol",
  li: "li",
  a: "a",
  img: "img",
  figure: "figure",
  figcaption: "figcaption",
  hr: "hr",
  br: "br",
  table: "table",
  thead: "thead",
  tbody: "tbody",
  tfoot: "tfoot",
  tr: "tr",
  th: "th",
  td: "td",
  sup: "sup",
  sub: "sub",
  dl: "dl",
  dt: "dt",
  dd: "dd",
};

/** Only these tags may carry a title attribute. */
const TITLE_TAGS = new Set(["a", "img", "figure"]);

/** React refuses children on these, and the source markup has none either. */
const VOID_TAGS = new Set(["br", "hr", "img"]);

function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/** Numeric width/height only — anything else is dropped rather than passed through. */
function dimension(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 && parsed < 10000 ? parsed : undefined;
}

function renderNode(node: ArticleNode, key: number): ReactNode {
  if (node.type === "text") return <Fragment key={key}>{node.value}</Fragment>;

  const { tag, attrs, children } = node;
  const Tag = TAGS[tag];
  if (!Tag) return <Fragment key={key}>{renderNodes(children)}</Fragment>;

  const inner = renderNodes(children);

  if (tag === "a") {
    const href = safeUrl(attrs.href);
    if (!href) return <Fragment key={key}>{inner}</Fragment>;
    const external = isExternal(href);
    return (
      <a
        href={href}
        key={key}
        rel={external ? "noopener noreferrer" : undefined}
        target={external ? "_blank" : undefined}
        title={TITLE_TAGS.has(tag) ? attrs.title : undefined}
      >
        {inner}
      </a>
    );
  }

  if (tag === "img") {
    const src = safeUrl(attrs.src);
    if (!src) return null;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={attrs.alt ?? ""}
        decoding="async"
        height={dimension(attrs.height)}
        key={key}
        loading="lazy"
        src={src}
        title={attrs.title}
        width={dimension(attrs.width)}
      />
    );
  }

  return (
    <Tag key={key} title={TITLE_TAGS.has(tag) ? attrs.title : undefined}>
      {VOID_TAGS.has(tag) ? null : inner}
    </Tag>
  );
}

function renderNodes(nodes: ArticleNode[]): ReactNode {
  return nodes.map((node, index) => renderNode(node, index));
}

export function ArticleBody({ html, className }: { html: string; className?: string }) {
  const nodes = parseArticleHtml(html);
  if (!nodes.length) return null;
  return <div className={className ?? "article-body"}>{renderNodes(nodes)}</div>;
}
