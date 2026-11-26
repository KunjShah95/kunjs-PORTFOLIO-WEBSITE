/* ==========================================================================
   Email-capture types and initial state.

   Kept out of `actions.ts` because a `"use server"` module may only export
   async functions — a plain constant exported alongside the action is a build
   error. Client and server both import from here.
   ========================================================================== */

export type SubscribeState = {
  status: "idle" | "success" | "error";
  /** Message shown under the field. Empty on idle. */
  message: string;
  /** Echoed back so a rejected address is not lost from the field. */
  email?: string;
};

export const initialSubscribeState: SubscribeState = {
  status: "idle",
  message: "",
};
