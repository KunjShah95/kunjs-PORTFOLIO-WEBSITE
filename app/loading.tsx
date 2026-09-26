import { PageShell } from "@/components/shell/page-shell";

/**
 * Route-level skeleton. Mirrors the real page skeleton (title, lead, then
 * rail sections with rows) so nothing jumps when content lands.
 */
export default function Loading() {
  return (
    <PageShell>
      <div aria-busy="true" aria-label="Loading page" className="stack-page" role="status">
        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="skeleton h-12 md:h-16 w-3/4" />
          <div className="skeleton h-4 w-full max-w-xl" />
          <div className="skeleton h-4 w-2/3 max-w-md" />
        </div>

        {[0, 1].map((section) => (
          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-12 lg:gap-x-10" key={section}>
            <div className="lg:col-span-3 flex flex-col gap-2">
              <div className="skeleton h-6 w-40" />
              <div className="skeleton h-3 w-24" />
            </div>
            <div className="lg:col-span-9 grid gap-3 md:grid-cols-2">
              {[0, 1, 2, 3].map((row) => (
                <div className="rounded-2xl border border-border-hairline p-6 flex flex-col gap-3" key={row}>
                  <div className="skeleton h-5 w-1/2" />
                  <div className="skeleton h-3 w-full" />
                  <div className="skeleton h-3 w-4/5" />
                </div>
              ))}
            </div>
          </div>
        ))}
        <span className="sr-only">Loading…</span>
      </div>
    </PageShell>
  );
}
