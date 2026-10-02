/* ==========================================================================
   Contact form types and initial state.

   Kept out of `actions.ts` because a `"use server"` module may only export
   async functions — a plain constant exported alongside the action would be a
   build error. Client and server both import from here.
   ========================================================================== */

export type ContactField = "name" | "email" | "details";

export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactState = {
  /** Drives which panel the form renders. */
  status: "idle" | "success" | "error";
  errors: ContactErrors;
  /** Form-level message, shown when the send itself failed. */
  message: string;
};

export const initialContactState: ContactState = { status: "idle", errors: {}, message: "" };
