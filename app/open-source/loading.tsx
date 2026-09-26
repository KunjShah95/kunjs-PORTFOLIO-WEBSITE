import { PageShell } from "@/components/shell/page-shell";

/** Skeleton for the live GitHub feed: stats strip, then activity rows. */
export default function Loading() {
  return (
    <PageShell>
      <div aria-busy="true" aria-label="Loading open-source activity" className="stack-page" role="status">
        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="skeleton h-12 md:h-16 w-1/2" />
          <div className="skeleton h-4 w-full max-w-lg" />
        </div>

        <div className="grid grid-cols-2 border-y border-border-hairline divide-x divide-border-hairline">
          {[0, 1].map((i) => (
            <div className="flex flex-col gap-2 px-6 py-6" key={i}>
              <div className="skeleton h-9 w-16" />
              <div className="skeleton h-3 w-24" />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-3 skeleton h-6 w-36" />
          <ul className="lg:col-span-9 flex flex-col">
            {Array.from({ length: 6 }, (_, i) => (
              <li className="flex items-start justify-between gap-6 py-4 border-b border-border-hairline" key={i}>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="skeleton h-4 w-3/4" />
                  <div className="skeleton h-3 w-1/3" />
                </div>
                <div className="skeleton h-3 w-12" />
              </li>
            ))}
          </ul>
        </div>
        <span className="sr-only">Loading…</span>
      </div>
    </PageShell>
  );
}
