"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";
import { projectFocusOptions, services, site, timelineOptions } from "@/lib/site-data";

type SubmitState = "idle" | "sending" | "sent";
type Field = "name" | "email" | "details";
type Errors = Partial<Record<Field, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(form: HTMLFormElement): Errors {
  const data = new FormData(form);
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const details = String(data.get("details") ?? "").trim();
  const errors: Errors = {};
  if (!name) errors.name = "Add your name so I know who to reply to.";
  if (!email) errors.email = "Add an email address for the reply.";
  else if (!EMAIL.test(email)) errors.email = "That email address looks incomplete.";
  if (details.length < 20) errors.details = "A sentence or two about the project helps (20+ characters).";
  return errors;
}

const inputBase =
  "w-full px-3.5 py-3 rounded-xl bg-surface-subtle text-text-primary font-body-md text-body-md placeholder:text-text-muted border border-transparent focus:outline-hidden focus:bg-surface-card focus:border-text-primary/25 focus:ring-4 focus:ring-text-primary/5 transition-[background-color,border-color,box-shadow] duration-200 aria-invalid:border-error/60 aria-invalid:bg-surface-card aria-invalid:focus:ring-error/10";

/**
 * Service catalogue plus the project inquiry form, in one client boundary so
 * a service card can prefill the details textarea through a shared ref.
 *
 * There is no backend wired up yet: submit validates, then confirms locally.
 * Swap the timeout in `handleSubmit` for a real POST (or a server action)
 * when a mail provider or CRM is connected.
 */
export function ContactBody() {
  const reduce = useReducedMotion();
  const detailsRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [focus, setFocus] = useState<string>(projectFocusOptions[0]);
  const [timeline, setTimeline] = useState<string>(timelineOptions[1]);
  const [state, setState] = useState<SubmitState>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [flash, setFlash] = useState(false);

  function prefill(serviceTitle: string) {
    const el = detailsRef.current;
    if (!el) return;
    el.value = `Hi Kunj, I'm reaching out about "${serviceTitle}".\n\nOur current setup:\nKey goals and timeline: `;
    el.focus();
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    setErrors((e) => ({ ...e, details: undefined }));
    // Brief highlight so the eye follows the jump to the form.
    setFlash(true);
    window.setTimeout(() => setFlash(false), 900);
  }

  /** Re-check a single field on blur, but only once it has an error shown. */
  function revalidate(field: Field) {
    if (!errors[field] || !formRef.current) return;
    setErrors((e) => ({ ...e, [field]: validate(formRef.current!)[field] }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(event.currentTarget);
    setErrors(found);
    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setState("sending");
    window.setTimeout(() => setState("sent"), 900);
  }

  function reset() {
    setErrors({});
    setState("idle");
  }

  const errorText = (field: Field) =>
    errors[field] ? (
      <motion.p
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-1.5 font-body-sm text-body-sm text-error"
        id={`${field}-error`}
        initial={reduce ? false : { opacity: 0, y: -4 }}
        transition={{ duration: 0.2, ease: EASE_OUT }}
      >
        {errors[field]}
      </motion.p>
    ) : null;

  return (
    <div className="grid gap-16 lg:grid-cols-12 lg:gap-10 items-start">
      {/* ----------------------------------------------------------- services */}
      <div className="flex flex-col gap-5 lg:col-span-6">
        <h2 className="font-headline-lg text-headline-lg text-text-primary">Services</h2>
        <div className="flex flex-col gap-3">
          {services.map((service) => (
            <div
              className="bg-surface-card rounded-2xl p-5 md:p-6 border border-border-hairline flex flex-col justify-between gap-4"
              key={service.title}
            >
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex flex-col gap-1">
                  <h3 className="font-headline-md text-headline-md text-text-primary">
                    {service.title}
                  </h3>
                  <p className="font-body-md text-body-md text-text-secondary">{service.body}</p>
                  <p className="font-body-sm text-body-sm text-text-muted">
                    <span className="text-text-primary font-medium">Outcome:</span> {service.outcome}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 pt-3 border-t border-border-hairline">
                <span className="font-body-sm text-body-sm text-text-muted">{service.pill}</span>
                <button
                  className="group/cta inline-flex items-center gap-1 h-9 -mr-2 px-2 rounded-full font-body-sm text-body-sm font-medium text-text-primary hover:bg-surface-container active:scale-[0.97] transition-all"
                  onClick={() => prefill(service.title)}
                  type="button"
                >
                  {service.cta}
                  <Icon className="transition-transform duration-300 group-hover/cta:translate-x-0.5" name="arrow_forward" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------- project inquiry */}
      <div className="flex flex-col gap-5 lg:col-span-6 lg:sticky lg:top-28 scroll-mt-24" id="inquiryForm">
        <h2 className="font-headline-lg text-headline-lg text-text-primary">Tell me about the project</h2>

        <div className="bg-surface-card rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0_24px_48px_-24px_rgba(68,25,0,0.18)] border border-border-hairline">
          <AnimatePresence initial={false} mode="wait">
            {state === "sent" ? (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-start gap-4 py-6"
                exit={{ opacity: 0 }}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                key="sent"
                role="status"
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                <span className="w-12 h-12 rounded-full bg-accent-emerald/15 text-accent-emerald flex items-center justify-center">
                  <svg aria-hidden="true" fill="none" height="22" viewBox="0 0 24 24" width="22">
                    <path
                      d="M5 12.5 10 17 19 7.5"
                      stroke="currentColor"
                      strokeDasharray="24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.2"
                      style={{ animation: "check-draw 420ms 120ms var(--ease-out) both" }}
                    />
                  </svg>
                </span>
                <div className="flex flex-col gap-1">
                  <p className="font-headline-lg text-headline-lg text-text-primary">Message received.</p>
                  <p className="font-body-md text-body-md text-text-secondary max-w-[40ch]">
                    I&apos;ll reply within a day. If it&apos;s urgent, email{" "}
                    <a className="text-text-primary link-draw" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                    .
                  </p>
                </div>
                <button
                  className="h-10 px-4 rounded-full border border-border-hairline font-body-sm text-body-sm font-medium text-text-primary hover:border-text-muted active:scale-[0.98] transition-all"
                  onClick={reset}
                  type="button"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                animate={{ opacity: 1 }}
                className="flex flex-col gap-5"
                exit={{ opacity: 0 }}
                initial={false}
                key="form"
                noValidate
                onSubmit={handleSubmit}
                ref={formRef}
                transition={{ duration: 0.2 }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="font-body-sm text-body-sm font-medium text-text-primary" htmlFor="userName">
                      Your name
                    </label>
                    <input
                      aria-describedby={errors.name ? "name-error" : undefined}
                      aria-invalid={Boolean(errors.name)}
                      autoComplete="name"
                      className={inputBase}
                      id="userName"
                      name="name"
                      onBlur={() => revalidate("name")}
                      placeholder="Priya Mehta"
                      type="text"
                    />
                    {errorText("name")}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-body-sm text-body-sm font-medium text-text-primary" htmlFor="userEmail">
                      Work email
                    </label>
                    <input
                      aria-describedby={errors.email ? "email-error" : undefined}
                      aria-invalid={Boolean(errors.email)}
                      autoComplete="email"
                      className={inputBase}
                      id="userEmail"
                      inputMode="email"
                      name="email"
                      onBlur={() => revalidate("email")}
                      placeholder="name@company.com"
                      type="email"
                    />
                    {errorText("email")}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-body-sm text-body-sm font-medium text-text-primary" htmlFor="userCompany">
                    Company <span className="font-normal text-text-muted">(optional)</span>
                  </label>
                  <input
                    autoComplete="organization"
                    className={inputBase}
                    id="userCompany"
                    name="company"
                    placeholder="Startup or lab name"
                    type="text"
                  />
                </div>

                <fieldset className="flex flex-col gap-2">
                  <legend className="font-body-sm text-body-sm font-medium text-text-primary mb-2">
                    What do you need?
                  </legend>
                  <div className="grid grid-cols-2 gap-2">
                    {projectFocusOptions.map((option) => {
                      const active = focus === option;
                      return (
                        <button
                          aria-pressed={active}
                          className={cn(
                            "h-11 px-3 rounded-xl font-body-sm text-body-sm text-left flex items-center justify-between gap-1 border transition-all duration-200 active:scale-[0.98]",
                            active
                              ? "bg-primary-container text-on-primary border-primary-container"
                              : "bg-surface-subtle text-text-secondary border-transparent hover:border-border-hairline hover:text-text-primary",
                          )}
                          key={option}
                          onClick={() => setFocus(option)}
                          type="button"
                        >
                          <span className="truncate">{option}</span>
                          <span
                            className={cn(
                              "transition-[opacity,transform] duration-200",
                              active ? "opacity-100 scale-100" : "opacity-0 scale-50",
                            )}
                          >
                            <Icon name="check" size={14} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset className="flex flex-col gap-2">
                  <legend className="font-body-sm text-body-sm font-medium text-text-primary mb-2">Timeline</legend>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(8.5rem,1fr))] gap-2">
                    {timelineOptions.map((option) => {
                      const active = timeline === option;
                      return (
                        <button
                          aria-pressed={active}
                          className={cn(
                            "h-11 px-3 rounded-xl font-body-sm text-body-sm text-center whitespace-nowrap border transition-all duration-200 active:scale-[0.98]",
                            active
                              ? "bg-primary-container text-on-primary border-primary-container"
                              : "bg-surface-subtle text-text-secondary border-transparent hover:border-border-hairline hover:text-text-primary",
                          )}
                          key={option}
                          onClick={() => setTimeline(option)}
                          type="button"
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="flex flex-col gap-2">
                  <label className="font-body-sm text-body-sm font-medium text-text-primary" htmlFor="projectDetails">
                    Project details
                  </label>
                  <textarea
                    aria-describedby={errors.details ? "details-error" : "details-hint"}
                    aria-invalid={Boolean(errors.details)}
                    className={cn(
                      inputBase,
                      "resize-none min-h-32",
                      flash && "shadow-[0_0_0_6px_rgb(16_185_129_/_0.18)]",
                    )}
                    id="projectDetails"
                    name="details"
                    onBlur={() => revalidate("details")}
                    placeholder="Your stack, where it breaks today, and what good looks like."
                    ref={detailsRef}
                    rows={5}
                  />
                  {errorText("details") ?? (
                    <p className="font-body-sm text-body-sm text-text-muted" id="details-hint">
                      Rough notes are fine. I&apos;ll ask follow-up questions.
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 pt-1">
                  <button
                    aria-live="polite"
                    className="group w-full h-12 px-5 rounded-full bg-primary text-on-primary font-body-md text-body-md font-medium flex items-center justify-center gap-2 hover:bg-primary-container active:scale-[0.99] transition-all disabled:cursor-progress disabled:opacity-80"
                    disabled={state === "sending"}
                    type="submit"
                  >
                    {state === "sending" ? (
                      <>
                        <span
                          aria-hidden="true"
                          className="w-4 h-4 rounded-full border-2 border-on-primary/30 border-t-on-primary animate-spin"
                        />
                        Sending
                      </>
                    ) : (
                      <>
                        Send message
                        <Icon className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px" name="send" size={16} />
                      </>
                    )}
                  </button>
                  <p className="text-center font-body-sm text-body-sm text-text-muted">
                    Replies within a day. Your details are only used to reply.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
