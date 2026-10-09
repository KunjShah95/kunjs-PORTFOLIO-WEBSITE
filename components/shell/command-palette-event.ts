/**
 * Name of the DOM event the header trigger fires to ask the palette to open.
 *
 * Kept in its own module because both ends need it — the trigger (eager, in
 * the header) and the palette (deferred) — and a shared constant means neither
 * has to import the other.
 */
export const OPEN_EVENT = "open-command-palette";
