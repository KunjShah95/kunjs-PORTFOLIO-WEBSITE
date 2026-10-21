import { strict as assert } from "node:assert";
import { test } from "node:test";
import {
  decodeEntities,
  nodesToMarkdown,
  nodesToText,
  parseArticleHtml,
  safeUrl,
} from "../lib/article-html";

/**
 * The article HTML parser.
 *
 * This is the only place third-party markup is turned into something the
 * site renders, so it is the place where a hostile or malformed post could
 * do damage. The tests below cover the three things that matter: that
 * dangerous constructs cannot survive, that ordinary prose comes through
 * intact, and that broken markup does not swallow the rest of the document.
 */

/* ------------------------------------------------------------------ safety */

test("script and style elements are dropped with their contents", () => {
  const nodes = parseArticleHtml(
    "<p>before</p><script>alert(1)</script><style>p{color:red}</style><p>after</p>",
  );
  const text = nodesToText(nodes);
  assert.equal(text, "before after");
  assert.equal(text.includes("alert"), false);
  assert.equal(text.includes("color"), false);
});

test("iframes and other embedded content are dropped", () => {
  const nodes = parseArticleHtml('<p>hi</p><iframe src="https://evil.example"></iframe>');
  assert.equal(nodesToText(nodes), "hi");
});

test("javascript: and data: URLs never survive", () => {
  assert.equal(safeUrl("javascript:alert(1)"), null);
  assert.equal(safeUrl("JavaScript:alert(1)"), null);
  assert.equal(safeUrl("data:text/html;base64,PHNjcmlwdD4="), null);
  assert.equal(safeUrl("//evil.example/path"), null);
  assert.equal(safeUrl("vbscript:msgbox"), null);
});

test("ordinary URLs are kept", () => {
  assert.equal(safeUrl("https://example.com/a"), "https://example.com/a");
  assert.equal(safeUrl("http://example.com"), "http://example.com");
  assert.equal(safeUrl("mailto:someone@example.com"), "mailto:someone@example.com");
  assert.equal(safeUrl("/writing"), "/writing");
});

test("event handler attributes never reach the tree", () => {
  const nodes = parseArticleHtml('<p onclick="steal()">text</p>');
  const paragraph = nodes.find((node) => node.type === "element");
  assert.ok(paragraph?.type === "element");
  assert.equal(paragraph.attrs.onclick, undefined);
  assert.equal(nodesToText(nodes), "text");
});

test("the read-tracking pixel is dropped", () => {
  const nodes = parseArticleHtml(
    '<p>read this</p><img src="https://medium.com/_/stat?event=post.clientViewed&postId=abc" width="1" height="1" alt="">',
  );
  const images = nodes.filter(
    (node) => node.type === "element" && node.tag === "img",
  );
  assert.equal(images.length, 0);
  assert.equal(nodesToText(nodes), "read this");
});

test("a 1x1 spacer image is dropped, a real image is kept", () => {
  const spacer = parseArticleHtml('<img src="https://example.com/spacer.gif" width="1" height="1">');
  assert.equal(spacer.filter((node) => node.type === "element" && node.tag === "img").length, 0);

  const real = parseArticleHtml('<img src="https://example.com/photo.png" width="800" height="600" alt="A photo">');
  assert.equal(real.filter((node) => node.type === "element" && node.tag === "img").length, 1);
});

/* ------------------------------------------------------------------ parsing */

test("a closing tag closes its own element, not a later one", () => {
  // The bug this guards against: `<figure>` swallowed everything that
  // followed it, because the parser looked for the open tag among the
  // children rather than among the open elements.
  const nodes = parseArticleHtml(
    '<figure><img src="https://example.com/a.png"></figure><p>after the figure</p>',
  );
  const figure = nodes.find((node) => node.type === "element" && node.tag === "figure");
  const paragraph = nodes.find((node) => node.type === "element" && node.tag === "p");
  assert.ok(figure?.type === "element");
  assert.ok(paragraph?.type === "element");
  assert.equal(figure.children.filter((n) => n.type === "element" && n.tag === "p").length, 0);
  assert.equal(nodesToText(nodes), "after the figure");
});

test("unclosed elements close at the end of their parent", () => {
  const nodes = parseArticleHtml("<p>one<p>two<p>three");
  assert.equal(nodesToText(nodes), "one two three");
});

test("a stray closing tag is ignored", () => {
  const nodes = parseArticleHtml("</div><p>text</p>");
  assert.equal(nodesToText(nodes), "text");
});

test("unknown tags are unwrapped, keeping their text", () => {
  const nodes = parseArticleHtml("<section><custom-tag>kept</custom-tag></section>");
  assert.equal(nodesToText(nodes), "kept");
});

test("nested lists keep their structure", () => {
  const nodes = parseArticleHtml("<ul><li>one<ul><li>two</li></ul></li></ul>");
  const outer = nodes.find((node) => node.type === "element" && node.tag === "ul");
  assert.ok(outer?.type === "element");
  const items = outer.children.filter((n) => n.type === "element" && n.tag === "li");
  assert.equal(items.length, 1);
});

/* ------------------------------------------------------------------ entities */

test("named and numeric entities are decoded", () => {
  assert.equal(decodeEntities("it&#39;s &amp; more"), "it's & more");
  assert.equal(decodeEntities("&mdash; &hellip;"), "— …");
  assert.equal(decodeEntities("&#8217;"), "’");
  assert.equal(decodeEntities("&#x2014;"), "—");
});

test("an unknown entity is left as it was", () => {
  assert.equal(decodeEntities("&notreal;"), "&notreal;");
});

test("a non-breaking space survives decoding", () => {
  assert.equal(decodeEntities("a&nbsp;b"), "a\u00a0b");
});

/* ----------------------------------------------------------------- markdown */

test("markdown keeps headings, lists, links and emphasis", () => {
  const md = nodesToMarkdown(
    parseArticleHtml(
      "<h2>Heading</h2><p>Some <strong>bold</strong> and <em>italic</em>.</p>" +
        "<ul><li>first</li><li>second</li></ul>" +
        '<p>A <a href="https://example.com">link</a>.</p>',
    ),
  );
  assert.match(md, /## Heading/);
  assert.match(md, /\*\*bold\*\*/);
  assert.match(md, /\*italic\*/);
  assert.match(md, /- first/);
  assert.match(md, /\[link\]\(https:\/\/example\.com\)/);
});

test("markdown does not carry a dangerous link through", () => {
  const md = nodesToMarkdown(parseArticleHtml('<p><a href="javascript:alert(1)">click</a></p>'));
  assert.equal(md.includes("javascript:"), false);
  assert.match(md, /click/);
});

test("a blockquote is marked as one", () => {
  const md = nodesToMarkdown(parseArticleHtml("<blockquote><p>quoted</p></blockquote>"));
  assert.match(md, /^> /m);
});
