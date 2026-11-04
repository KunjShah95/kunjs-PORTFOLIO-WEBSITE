/**
 * "People also ask" — the visible half of the FAQ markup on case studies and
 * essays. The matching `FAQPage` JSON-LD is emitted next to it via
 * `faqPageJsonLd` (components/seo/json-ld), so the two always carry the same
 * questions. Answers are plain text rendered as text; no HTML is injected.
 */

export type PeopleAlsoAskItem = { question: string; answer: string };

export function PeopleAlsoAsk({
  items,
  title = "People also ask",
}: {
  items: PeopleAlsoAskItem[];
  title?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="paa-title" className="flex flex-col gap-5" id="people-also-ask">
      <div className="border-t border-text-primary pt-4">
        <h2 className="font-headline-lg text-headline-lg text-text-primary" id="paa-title">
          {title}
        </h2>
      </div>
      <div className="border-t border-border-hairline">
        {items.map((item) => (
          <details className="group border-b border-border-hairline" key={item.question}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-body-lg text-body-lg font-medium text-text-primary [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                aria-hidden="true"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border-hairline text-text-muted transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pb-6 pr-12 font-body-md text-body-md text-text-secondary max-w-[64ch]">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
