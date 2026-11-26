/* ==========================================================================
   The booking door.

   Every primary action on the site points at one of two places: a scheduler,
   when one is configured, or the inquiry form. The fallback is the point —
   the site must never ship a dead booking link because someone forgot a
   deploy variable. Set NEXT_PUBLIC_BOOKING_URL to a Cal.com or Calendly link
   and the instant path turns on everywhere at once.

   Read at module scope, so it is inlined at build time on both the server and
   the client. Changing it needs a redeploy, not a code change.
   ========================================================================== */

/** Scheduler URL, or null when none is configured. */
export const bookingUrl: string | null =
  process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || null;

/** True when a scheduler is configured, so copy can promise an instant slot. */
export const bookingEnabled = bookingUrl !== null;

/** Where the primary "start" action goes. */
export const bookingHref = bookingUrl ?? "/contact#inquiryForm";

/** Label for the primary action, matched to where it actually lands. */
export const bookingLabel = bookingEnabled
  ? "Book the 15-min call"
  : "Start a project";

/** One line under the action, so the cost of clicking is never a surprise. */
export const bookingNote = bookingEnabled
  ? "15 minutes, free. Pick a slot; no form first."
  : "Free 15-minute intro call · reply within one working day";
