/* ==========================================================================
   Spam and abuse detection for the contact form.

   The contact form is the only public write endpoint on this site, so it
   attracts the three kinds of noise a personal site picks up: automated
   spam, throwaway-mailbox submissions, and people who want to send abuse to
   the person who built it. These guards run before anything is delivered,
   so none of it reaches the inbox.

   Everything here is pure and server-side. The client mirrors the
   field-length rules for instant feedback, but it never decides what is
   spam — a client-side check is advice, and this is the decision.

   Tuning notes:
   · The word lists are deliberately narrow. A false positive costs a real
     inquiry, which is more expensive than one spam message slipping
     through, so anything that could plausibly appear in a genuine AI
     engineering brief ("fraud detection", "scam detection", "useless
     without RAG") is deliberately absent.
   · `classifyMessage` and `isDisposableEmail` take plain arguments and
     return plain values, so they can be exercised without a server.
   ========================================================================== */

/* -------------------------------------------------------------------------- */
/*                              Disposable mailboxes                            */
/* -------------------------------------------------------------------------- */

/**
 * Domains that exist to be thrown away.
 *
 * A genuine inquiry from a recruiter, a founder or a client comes from a
 * mailbox someone intends to read. A disposable domain is not evidence of
 * abuse on its own, but it is never the address you want a reply to go to,
 * so these are refused outright.
 */
const DISPOSABLE_DOMAINS = new Set([
  "0-mail.com",
  "10minutemail.com",
  "10minutemail.net",
  "20minutemail.com",
  "33mail.com",
  "anonbox.net",
  "burner.kiwi",
  "cuvox.de",
  "dayrep.com",
  "dispostable.com",
  "discard.email",
  "einrot.com",
  "emailfake.com",
  "emailondeck.com",
  "emailtemporanea.com",
  "fakeinbox.com",
  "fleckens.hu",
  "getairmail.com",
  "getnada.com",
  "grr.la",
  "guerrillamail.biz",
  "guerrillamail.com",
  "guerrillamail.de",
  "guerrillamail.info",
  "guerrillamail.net",
  "guerrillamail.org",
  "gustr.com",
  "inboxbear.com",
  "inboxkitten.com",
  "jetable.org",
  "jourrapide.com",
  "mail-temporaire.fr",
  "mailcatch.com",
  "mailde.de",
  "maildrop.cc",
  "mailinator.com",
  "mailinator.net",
  "mailinator2.com",
  "mailme.lv",
  "mailmetrash.com",
  "mailnesia.com",
  "mailnull.com",
  "mailpoof.com",
  "mailsac.com",
  "mailtemp.info",
  "mailzilla.com",
  "mintemail.com",
  "moakt.com",
  "mohmal.com",
  "mytemp.email",
  "nowmymail.com",
  "pokemail.net",
  "putthisinyourspamdatabase.com",
  "rhyta.com",
  "sharklasers.com",
  "spam4.me",
  "spamfree24.org",
  "spamgourmet.com",
  "spamhereplease.com",
  "spamherelots.com",
  "spambog.com",
  "spambog.ru",
  "temp-mail.org",
  "tempail.com",
  "tempe-mail.com",
  "tempemail.net",
  "tempinbox.com",
  "tempmail.com",
  "tempmail.net",
  "tempmailo.com",
  "tempr.email",
  "temporarymail.com",
  "throwawaymail.com",
  "trash-mail.com",
  "trashmail.com",
  "trashmail.net",
  "uggsrock.com",
  "veryrealemail.com",
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
  "zippymail.info",
]);

/** True when the address belongs to a throwaway-mailbox provider. */
export function isDisposableEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split("@")[1] ?? "";
  if (!domain) return false;
  return DISPOSABLE_DOMAINS.has(domain);
}

/* -------------------------------------------------------------------------- */
/*                              Text normalisation                             */
/* -------------------------------------------------------------------------- */

/** Digits and symbols people swap in to dodge a naive filter. */
const LEET: Record<string, string> = {
  "0": "o",
  "1": "i",
  "3": "e",
  "4": "a",
  "5": "s",
  "7": "t",
  "8": "b",
  "@": "a",
  "$": "s",
};

/**
 * Folds one whitespace-separated token down to letters.
 *
 * Punctuation inside a word is dropped rather than split, so "f.u.c.k"
 * becomes "fuck" instead of five separate letters. `!` and `|` are the
 * exception: they are punctuation far more often than they are letters, so
 * they only fold when they sit between two letters — "sh!t" becomes "shit",
 * but "idiot!" stays "idiot" and does not become "idioti".
 */
function foldToken(token: string): string {
  const mapped = token.replace(/[0134578@$]/g, (char) => LEET[char]);
  const between = mapped.replace(
    /(?<=[a-z])[!|](?=[a-z])/g,
    (char) => (char === "!" ? "i" : "l"),
  );
  return between.replace(/[^a-z]/g, "");
}

/**
 * Lowercase, strip accents, fold leetspeak and punctuation down to letters
 * and spaces. "F*U*C*K", "f.u.c.k" and "fu**ck" all land on the same string.
 */
export function normalizeText(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .split(/\s+/)
    .map(foldToken)
    .filter(Boolean)
    .join(" ");
}

/**
 * Re-join letters that were spaced out to hide them: "f u c k" -> "fuck".
 *
 * Only runs where every character is its own single-letter word are joined,
 * so ordinary prose ("I am a builder") is left alone.
 */
function joinSpacedLetters(text: string): string {
  return text.replace(/\b(?:[a-z][\s]+){2,}[a-z]\b/g, (run) => run.replace(/\s+/g, ""));
}

/** "shiiiit" -> "shit", "ass" -> "as". Applied to both sides of a match. */
function collapseRepeats(word: string): string {
  return word.replace(/(.)\1+/g, "$1");
}

/* -------------------------------------------------------------------------- */
/*                                Word lists                                   */
/* -------------------------------------------------------------------------- */

/**
 * Abuse vocabulary.
 *
 * Two groups, deliberately:
 * · Profanity and slurs — unambiguous in a hiring enquiry.
 * · Personal insults aimed at the recipient — the thing that actually
 *   arrives, and the thing worth never delivering.
 *
 * Words that can legitimately appear in an AI engineering brief are NOT
 * here. "fraud detection", "scam detection" and "useless without RAG" are
 * ordinary project descriptions, so those words are absent.
 */
const ABUSE_WORDS = [
  // profanity
  "fuck",
  "fucking",
  "fucker",
  "motherfucker",
  "shit",
  "bullshit",
  "bitch",
  "bastard",
  "cunt",
  "whore",
  "slut",
  "wanker",
  "arsehole",
  "asshole",
  "dickhead",
  "dumbass",
  "prick",
  // slurs
  "nigger",
  "nigga",
  "faggot",
  "fag",
  "retard",
  "retarded",
  "spic",
  "chink",
  "kike",
  "coon",
  "tranny",
  // insults aimed at the recipient
  "idiot",
  "moron",
  "moronic",
  "imbecile",
  "loser",
  "clown",
  "pathetic",
  "cringe",
  "disgusting",
  "worthless",
  "revolting",
  "scum",
  // the phrase this site actually gets called
  "ai slop",
  "slop",
];

/**
 * Phrases that mark an automated sales pitch rather than an inquiry.
 *
 * These are commercial spam, not abuse — a different reason to refuse, and
 * the refusal is reported differently.
 */
const SPAM_PHRASES = [
  "seo services",
  "seo expert",
  "guest post",
  "backlinks",
  "buy followers",
  "buy traffic",
  "make money fast",
  "work from home",
  "double your",
  "guaranteed profit",
  "investment opportunity",
  "crypto giveaway",
  "free bitcoin",
  "click here to",
  "limited time offer",
  "act now",
  "weight loss",
  "casino",
  "viagra",
  "cialis",
  "smm panel",
  "telegram channel",
  "whatsapp group",
];

/* -------------------------------------------------------------------------- */
/*                                  Matching                                   */
/* -------------------------------------------------------------------------- */

function containsWord(haystack: string, word: string): boolean {
  // Word-boundary match, with the escape handled for multi-word phrases.
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|\\s)${escaped}(\\s|$)`, "i").test(haystack);
}

/** True when the text contains one of the abuse terms. */
export function containsAbuse(text: string): boolean {
  const normalized = normalizeText(text);
  if (!normalized) return false;

  // Pass 1: exact tokens, plus the "f u c k" reconstruction.
  const candidates = new Set<string>([
    ...normalized.split(" "),
    ...joinSpacedLetters(normalized).split(" "),
  ]);

  for (const word of ABUSE_WORDS) {
    if (word.includes(" ")) {
      if (containsWord(normalized, word)) return true;
      continue;
    }
    if (candidates.has(word)) return true;
  }

  // Pass 2: collapsed repeats, so "shiiiit" and "fuuuuck" are caught too.
  // Only for terms long enough that collapsing cannot create a collision
  // with an ordinary word.
  const collapsed = new Set<string>();
  for (const word of normalized.split(" ")) {
    collapsed.add(collapseRepeats(word));
  }
  for (const word of joinSpacedLetters(normalized).split(" ")) {
    collapsed.add(collapseRepeats(word));
  }
  for (const word of ABUSE_WORDS) {
    if (word.includes(" ") || word.length < 4) continue;
    if (collapsed.has(collapseRepeats(word))) return true;
  }

  return false;
}

/** True when the text reads like an automated sales pitch. */
export function containsSpamPhrase(text: string): boolean {
  const normalized = normalizeText(text);
  if (!normalized) return false;
  return SPAM_PHRASES.some((phrase) => containsWord(normalized, phrase));
}

/** Counts every http(s) URL in the text. */
export function countLinks(text: string): number {
  return (text.match(/https?:\/\//gi) ?? []).length;
}

/** Counts emoji and other pictographic characters. */
function countEmoji(text: string): number {
  return (text.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu) ?? []).length;
}

/* -------------------------------------------------------------------------- */
/*                               The classifier                                 */
/* -------------------------------------------------------------------------- */

export type Verdict = "ok" | "abuse" | "spam";

export type Classification = {
  verdict: Verdict;
  /** Short, log-safe explanation. Never contains the submitted text. */
  reason: string;
};

export type MessageFields = {
  name: string;
  company: string;
  details: string;
};

/** More than this many links in one inquiry is a link farm, not a project. */
const MAX_LINKS = 3;

/**
 * Classify a submission.
 *
 * Order matters: abuse is checked before spam, because an abusive message
 * that also contains a sales phrase should be reported as abuse. The
 * response to both is the same — nothing is delivered — but the reason is
 * logged, and the distinction is what tells you whether you are being
 * attacked or merely advertised to.
 */
export function classifyMessage(fields: MessageFields): Classification {
  const combined = [fields.name, fields.company, fields.details]
    .filter(Boolean)
    .join("\n");

  if (containsAbuse(combined)) {
    return { verdict: "abuse", reason: "abusive language" };
  }

  if (containsSpamPhrase(combined)) {
    return { verdict: "spam", reason: "sales-pitch phrasing" };
  }

  if (countLinks(fields.details) > MAX_LINKS) {
    return { verdict: "spam", reason: "excessive links" };
  }

  if (countEmoji(fields.details) > 12) {
    return { verdict: "spam", reason: "emoji flood" };
  }

  return { verdict: "ok", reason: "" };
}

/* -------------------------------------------------------------------------- */
/*                                Offender log                                 */
/* -------------------------------------------------------------------------- */

/** How long an offender stays blocked, in milliseconds. */
export const BLOCK_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Repeat offenders, in memory.
 *
 * Per-instance state, like the IP throttle: it protects a single warm
 * lambda rather than enforcing a global quota, which is enough to make
 * repeat abuse unprofitable. Persistent blocking across deploys is the
 * job of the environment-level list below.
 */
const offenders = new Map<string, number>();

/** Emails blocked by configuration. Comma-separated, in the environment. */
function configuredBlocklist(): Set<string> {
  return new Set(
    (process.env.CONTACT_BLOCKED_EMAILS ?? "")
      .split(",")
      .map((entry) => entry.trim().toLowerCase())
      .filter(Boolean),
  );
}

/** True when the address is blocked, either by configuration or by history. */
export function isBlockedEmail(email: string): boolean {
  const key = email.trim().toLowerCase();
  if (!key) return false;
  if (configuredBlocklist().has(key)) return true;

  const until = offenders.get(key);
  if (until === undefined) return false;
  if (until > Date.now()) return true;

  offenders.delete(key);
  return false;
}

/**
 * Record an offence and block the address.
 *
 * Called only when a submission is actually refused, so a genuine inquiry
 * never ends up on this list.
 */
export function blockEmail(email: string): void {
  const key = email.trim().toLowerCase();
  if (!key) return;
  offenders.set(key, Date.now() + BLOCK_DURATION_MS);
}
