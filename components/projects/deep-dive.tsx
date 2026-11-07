import { Fragment } from "react";
import { Icon } from "@/components/icon";
import { PageSection } from "@/components/ui/page-intro";
import type { Project } from "@/lib/site-data";

type DeepDiveData = NonNullable<Project["deepDive"]>;

/**
 * The parts of a flagship case study a technical reviewer checks: how it is
 * wired, what it ran on, the numbers, and how to rerun it. Rendered only when
 * the project carries `deepDive` data, all of it sourced from the repo.
 */
export function DeepDive({ data, github }: { data: DeepDiveData; github?: string }) {
  return (
    <>
      {data.architecture && data.architecture.length > 0 && (
        <PageSection meta="Each stage feeds the next." title="Architecture">
          {/* A flow diagram in HTML rather than an image: it reflows to a
              vertical stack on phones, stays selectable, and reads correctly
              to a screen reader as an ordered list. */}
          <ol className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-0">
            {data.architecture.map((stage, index) => (
              <Fragment key={stage.title}>
                {index > 0 && (
                  <li aria-hidden="true" className="flex justify-center text-text-muted lg:items-center lg:px-1">
                    <Icon className="rotate-90 lg:rotate-0" name="arrow_forward" size={16} />
                  </li>
                )}
                <li className="flex flex-1 flex-col gap-1.5 rounded-2xl border border-border-hairline bg-surface-card p-4 lg:min-w-0">
                  <span className="eyebrow text-text-muted" data-numeric>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-body-md text-body-md font-medium text-text-primary">{stage.title}</span>
                  <span className="font-body-sm text-body-sm text-text-secondary">{stage.detail}</span>
                </li>
              </Fragment>
            ))}
          </ol>
        </PageSection>
      )}

      {data.setup && data.setup.length > 0 && (
        <PageSection title="Test setup">
          <dl className="grid border-t border-border-hairline">
            {data.setup.map((row) => (
              <div className="grid gap-1 border-b border-border-hairline py-3 md:grid-cols-12 md:gap-6" key={row.label}>
                <dt className="eyebrow text-text-muted md:col-span-3 md:pt-0.5">{row.label}</dt>
                <dd className="font-body-md text-body-md text-text-primary md:col-span-9">{row.value}</dd>
              </div>
            ))}
          </dl>
        </PageSection>
      )}

      {data.results && data.results.length > 0 && (
        <PageSection title="Results">
          <div className="flex flex-col gap-10">
            {data.results.map((table) => (
              <figure className="flex flex-col gap-3" key={table.caption}>
                <figcaption className="font-body-md text-body-md font-medium text-text-primary">{table.caption}</figcaption>
                {/* Wide tables scroll inside their own box on phones, never the page. */}
                <div className="overflow-x-auto rounded-2xl border border-border-hairline">
                  <table className="w-full min-w-[520px] border-collapse text-left font-body-sm text-body-sm">
                    <thead className="bg-surface-container">
                      <tr>
                        {table.columns.map((column) => (
                          <th className="px-4 py-3 font-medium text-text-primary whitespace-nowrap" key={column} scope="col">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row) => (
                        <tr className="border-t border-border-hairline" key={row.join("|")}>
                          {row.map((cell, index) =>
                            index === 0 ? (
                              <th className="px-4 py-3 font-medium text-text-primary" key={index} scope="row">
                                {cell}
                              </th>
                            ) : (
                              <td className="px-4 py-3 text-text-secondary whitespace-nowrap" data-numeric key={index}>
                                {cell}
                              </td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {table.note && (
                  <p className="font-body-sm text-body-sm text-text-secondary max-w-[72ch]">{table.note}</p>
                )}
              </figure>
            ))}
          </div>
        </PageSection>
      )}

      {data.reproduce && (
        <PageSection
          meta={
            <a className="link-dots" href={data.reproduce.source} rel="noopener noreferrer" target="_blank">
              Source in the repo
            </a>
          }
          title="Reproduce it"
        >
          <pre className="overflow-x-auto rounded-2xl border border-border-hairline bg-surface-container p-4 md:p-5 font-mono text-[13px] leading-relaxed text-text-primary">
            <code>
              {github ? `git clone ${github}\n` : ""}
              {data.reproduce.commands.join("\n")}
            </code>
          </pre>
          {data.reproduce.note && (
            <p className="mt-3 font-body-sm text-body-sm text-text-secondary max-w-[72ch]">{data.reproduce.note}</p>
          )}
        </PageSection>
      )}
    </>
  );
}
