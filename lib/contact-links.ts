import { site } from "./site-data";

/* ==========================================================================
   Direct-contact links.

   One place that turns the published contact details into hrefs, so a phone
   number is never formatted twice and a tel: link cannot drift from the
   number beside it. Every surface asks these helpers rather than building a
   URL of its own.
   ========================================================================== */

/** Digits only: what `tel:` and wa.me accept, whatever the display format. */
const digits = site.phone.replace(/\D/g, "");

/** True when a phone number is configured, so call surfaces can hide. */
export const hasPhone = digits.length > 0;

/** `tel:` href, or null when no number is published. */
export const telHref = hasPhone ? `tel:+${digits}` : null;

/** Mailto for the one published address. */
export const mailtoHref = `mailto:${site.email}`;

/** How the number reads on the page, falling back to the raw digits. */
export const phoneLabel = site.phoneDisplay.trim() || site.phone.trim();

/* ---------------------------------------------------------- WhatsApp intake */

/**
 * What a first message should contain, in the order people answer it.
 *
 * A WhatsApp thread that opens with "hi" costs two extra round trips before
 * anything useful is on the table. This is the same information the email
 * form asks for, so a visitor can swap channel mid-thought without retyping.
 */
export type IntakeFields = {
  name?: string;
  email?: string;
  company?: string;
  focus?: string;
  timeline?: string;
  details?: string;
};

/** Trims a value, and treats an empty string as absent. */
const given = (value?: string) => value?.trim() ?? "";

/**
 * The message a WhatsApp button opens with.
 *
 * Filled values are used as-is. Missing ones become prompts the visitor can
 * overwrite in WhatsApp itself, which is faster than making them fill a form
 * first and cheaper than a thread of clarifying questions.
 */
export function intakeMessage(fields: IntakeFields = {}): string {
  const name = given(fields.name);
  const email = given(fields.email);
  const company = given(fields.company);
  const focus = given(fields.focus);
  const timeline = given(fields.timeline);
  const details = given(fields.details);

  const lines = [
    `Hi Kunj, I found kunjshah.in and would like to work with you.`,
    "",
    `Name: ${name || "<your name>"}`,
    `Company: ${company || "<company, if any>"}`,
    `What I need: ${focus || "<the thing you want built or fixed>"}`,
    `Timeline: ${timeline || "<when you need it>"}`,
    `Reply to: ${email || "<your email or phone>"}`,
  ];

  if (details) lines.push("", details);

  return lines.join("\n");
}

/** A wa.me link carrying `message`, or null when no number is published. */
export function whatsappHrefFor(message: string): string | null {
  if (!hasPhone) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** The generic WhatsApp CTA: opens a message shaped like the inquiry form. */
export const whatsappHref = whatsappHrefFor(intakeMessage());
