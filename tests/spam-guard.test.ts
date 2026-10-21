import { strict as assert } from "node:assert";
import { test } from "node:test";
import {
  classifyMessage,
  containsAbuse,
  containsSpamPhrase,
  isDisposableEmail,
  normalizeText,
} from "../lib/spam-guard";

/**
 * The contact form's spam guards.
 *
 * These matter more than most tests on a portfolio site: a false positive
 * costs a real inquiry, and a false negative costs the owner's inbox. Both
 * directions are covered, and the "should never be blocked" cases are the
 * ones worth writing down, because they are the ones that would be easy to
 * break by widening a word list.
 */

/* --------------------------------------------------------------- normalisation */

test("normalizeText folds leetspeak and punctuation", () => {
  // Punctuation inside a word is dropped, not split, so the decorated forms
  // collapse to the plain word.
  assert.equal(normalizeText("F*U*C*K"), "fuck");
  assert.equal(normalizeText("f.u.c.k"), "fuck");
  assert.equal(normalizeText("sh1t"), "shit");
  assert.equal(normalizeText("Hello, World!"), "hello world");
});

test("normalizeText strips accents", () => {
  assert.equal(normalizeText("café"), "cafe");
});

/* ---------------------------------------------------------------------- abuse */

test("containsAbuse catches plain profanity", () => {
  assert.equal(containsAbuse("this is shit"), true);
  assert.equal(containsAbuse("you are an idiot"), true);
});

test("containsAbuse catches obfuscated profanity", () => {
  assert.equal(containsAbuse("f.u.c.k you"), true);
  assert.equal(containsAbuse("f u c k you"), true);
  assert.equal(containsAbuse("sh1t"), true);
  assert.equal(containsAbuse("fuuuuck"), true);
  assert.equal(containsAbuse("shiiiit"), true);
});

test("containsAbuse catches the phrase this site actually gets called", () => {
  assert.equal(containsAbuse("this is AI slop"), true);
  assert.equal(containsAbuse("what a piece of slop"), true);
});

test("containsAbuse does not fire on ordinary engineering language", () => {
  // The words that matter here are the ones a real AI brief contains.
  assert.equal(containsAbuse("we need a fraud detection model"), false);
  assert.equal(containsAbuse("building scam detection for our app"), false);
  assert.equal(containsAbuse("the retrieval is useless without a reranker"), false);
  assert.equal(containsAbuse("our pass rate is garbage in the current setup"), false);
  assert.equal(containsAbuse("this architecture is trash"), false);
});

test("containsAbuse does not fire on substring collisions", () => {
  assert.equal(containsAbuse("the assignment class is fine"), false);
  assert.equal(containsAbuse("we hit a classic bug"), false);
  assert.equal(containsAbuse("the model hallucinates"), false);
});

/* ----------------------------------------------------------------------- spam */

test("containsSpamPhrase catches sales pitches", () => {
  assert.equal(containsSpamPhrase("we offer SEO services for your site"), true);
  assert.equal(containsSpamPhrase("buy followers cheap"), true);
  assert.equal(containsSpamPhrase("click here to claim your prize"), true);
});

test("containsSpamPhrase leaves genuine inquiries alone", () => {
  assert.equal(containsSpamPhrase("we need a RAG pipeline for our docs"), false);
  assert.equal(containsSpamPhrase("our click through rate needs work"), false);
});

/* ------------------------------------------------------------------ disposable */

test("isDisposableEmail identifies throwaway domains", () => {
  assert.equal(isDisposableEmail("someone@mailinator.com"), true);
  assert.equal(isDisposableEmail("x@yopmail.com"), true);
  assert.equal(isDisposableEmail("x@guerrillamail.com"), true);
});

test("isDisposableEmail ignores case and surrounding space", () => {
  assert.equal(isDisposableEmail("  Someone@Mailinator.COM "), true);
});

test("isDisposableEmail lets real addresses through", () => {
  assert.equal(isDisposableEmail("kunj@gmail.com"), false);
  assert.equal(isDisposableEmail("someone@company.co.in"), false);
  assert.equal(isDisposableEmail("not-an-email"), false);
  assert.equal(isDisposableEmail(""), false);
});

/* ----------------------------------------------------------------- classifier */

test("classifyMessage passes a genuine inquiry", () => {
  const result = classifyMessage({
    name: "Priya Mehta",
    company: "Acme AI",
    details:
      "We are building a RAG pipeline over our internal docs and retrieval quality is inconsistent. We need hybrid search with re-ranking and a way to measure recall in CI.",
  });
  assert.equal(result.verdict, "ok");
  assert.equal(result.reason, "");
});

test("classifyMessage drops abusive messages", () => {
  const result = classifyMessage({
    name: "anon",
    company: "",
    details: "your site is AI slop and you are an idiot",
  });
  assert.equal(result.verdict, "abuse");
});

test("classifyMessage drops sales pitches", () => {
  const result = classifyMessage({
    name: "SEO Guy",
    company: "Rank First Ltd",
    details: "We offer SEO services. Buy followers and click here to get traffic.",
  });
  assert.equal(result.verdict, "spam");
});

test("classifyMessage drops link farms", () => {
  const result = classifyMessage({
    name: "Links",
    company: "",
    details:
      "https://a.example https://b.example https://c.example https://d.example",
  });
  assert.equal(result.verdict, "spam");
});

test("classifyMessage allows a normal amount of links", () => {
  const result = classifyMessage({
    name: "Priya",
    company: "Acme",
    details:
      "Here is our current repo https://github.com/acme/app and a doc https://acme.example/spec — we want to add retrieval on top.",
  });
  assert.equal(result.verdict, "ok");
});

test("classifyMessage checks the name and company, not just the body", () => {
  const result = classifyMessage({
    name: "fuck off",
    company: "",
    details: "hello",
  });
  assert.equal(result.verdict, "abuse");
});
