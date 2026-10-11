import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/shell/page-shell";
import { DemoVideo } from "@/components/projects/demo-video";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/primitives/Reveal";
import { CopyEmailRow } from "@/components/ui/copy-email";
import { CtaBand, StatStrip, buttonStyles } from "@/components/ui/blocks";
import { PageSection } from "@/components/ui/page-intro";
import { Tag } from "@/components/ui/primitives";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { ORIGIN } from "@/lib/routes";
import { pageMeta } from "@/lib/seo";
import { principles, projectBySlug, projects, site } from "@/lib/site-data";

/** Every case study is known at build time; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projectBySlug(slug);
  if (!project) return {};

  return pageMeta({
    path: `/projects/${project.slug}`,
    title: `${project.title}: ${project.category} case study`,
    description: project.description,
    keywords: [project.title, project.category, ...project.stack],
    ogTitle: `${project.title} — case study by ${site.name}`,
    ogDescription: project.summary,
  });
}

const external = { rel: "noopener noreferrer", target: "_blank" } as const;

export default async function ProjectCaseStudyPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const path = `/projects/${project.slug}`;
  const url = `${ORIGIN}${path}`;

  // The manifesto cites shipped systems as evidence for each principle. Show
  // the reverse link here, so a claim and the system behind it point at each
  // other.
  const provenPrinciples = principles
    .map((principle) => ({
      title: principle.title,
      claims: principle.ships
        .filter((ship) => ship.project === project.slug)
        .map((ship) => ship.claim),
    }))
    .filter((principle) => principle.claims.length > 0);

  const i = projects.findIndex((p) => p.slug === project.slug);
  const prev = i > 0 ? projects[i - 1] : null;
  const next = i < projects.length - 1 ? projects[i + 1] : null;

  const sections = [
    { title: "How it works", body: project.body },
    { title: "The hard part", body: project.challenges },
    { title: "What I learned", body: project.lessons },
  ].filter((section): section is { title: string; body: string } => Boolean(section.body));

  return (
    <PageShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "@id": `${url}#case-study`,
          url,
          name: `${project.title} case study`,
          headline: project.title,
          description: project.description,
          inLanguage: "en-IN",
          keywords: project.stack.join(", "),
          author: { "@id": `${ORIGIN}/#person` },
          isPartOf: { "@id": `${ORIGIN}/#website` },
          about: {
            "@type": "SoftwareApplication",
            name: project.title,
            applicationCategory: project.category,
            ...(project.demo ? { url: project.demo } : {}),
            ...(project.github ? { sameAs: project.github } : {}),
          },
        }}
      />

      <div className="stack-page">
        {/* ----------------------------------------------------------- intro */}
        <Reveal as="section" className="flex flex-col gap-4 md:gap-5 pt-space-xs max-w-3xl" y={12}>
          <Link
            className="group -my-3 py-3 inline-flex w-fit items-center gap-1.5 font-body-sm text-body-sm text-text-muted hover:text-text-primary transition-colors"
            href="/projects"
          >
            <Icon
              className="rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5"
              name="arrow_forward"
              size={14}
            />
            All projects
          </Link>
          <p className="font-body-sm text-body-sm text-text-muted">
            {project.category}
            <span className="mx-1.5 text-border-dotted">/</span>
            {project.status}
          </p>
          <h1 className="font-headline-xl-mobile text-headline-xl-mobile text-text-primary tracking-tight">
            {project.title}
          </h1>
          <p className="font-body-lg text-body-lg text-text-secondary max-w-[60ch]">
            {project.description}
          </p>
          {(project.demo || project.github) && (
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {project.demo && (
                <a className={`${buttonStyles.primary} group`} href={project.demo} {...external}>
                  Live demo
                  <Icon
                    className="transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
                    name="arrow_outward"
                    size={15}
                  />
                </a>
              )}
              {project.github && (
                <a className={`${buttonStyles.secondary} group`} href={project.github} {...external}>
                  Source code
                  <Icon
                    className="transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
                    name="arrow_outward"
                    size={15}
                  />
                </a>
              )}
            </div>
          )}
        </Reveal>

        {project.video && <DemoVideo src={project.video} title={project.title} />}

        <StatStrip items={project.metrics} tone="plain" />

        {/* ------------------------------------------------------ narrative */}
        {sections.map((section) => (
          <PageSection key={section.title} title={section.title}>
            <p className="font-body-lg text-body-lg text-text-secondary max-w-[68ch]">
              {section.body}
            </p>
          </PageSection>
        ))}

        <PageSection meta={`${project.stack.length} components`} title="Stack">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </PageSection>

        {provenPrinciples.length > 0 && (
          <PageSection
            meta={<Link className={buttonStyles.link} href="/manifesto">Read the manifesto</Link>}
            title="Principles it proves"
          >
            <ul className="flex flex-col">
              {provenPrinciples.map((principle) => (
                <li className="flex flex-col gap-2 py-5 border-b border-border-hairline first:pt-0" key={principle.title}>
                  <span className="font-headline-md text-headline-md text-text-primary">
                    {principle.title}
                  </span>
                  {principle.claims.map((claim) => (
                    <span className="font-body-md text-body-md text-text-secondary" key={claim}>
                      {claim}
                    </span>
                  ))}
                </li>
              ))}
            </ul>
          </PageSection>
        )}

        {/* ------------------------------------------------- prev / next */}
        <nav aria-label="More case studies" className="w-full flex items-stretch gap-2 md:gap-4">
          {[prev, next].map((neighbour, n) =>
            neighbour ? (
              <Link
                className={`group lift flex-1 flex flex-col gap-1 p-space-md md:p-6 rounded-2xl bg-surface-card border border-border-hairline min-w-0 ${n === 1 ? "text-right" : "text-left"}`}
                href={`/projects/${neighbour.slug}`}
                key={neighbour.slug}
              >
                <span className="font-body-sm text-body-sm text-text-muted">
                  {n === 0 ? "Previous" : "Next"} case study
                </span>
                <span className="font-headline-md text-headline-md md:text-headline-lg text-text-primary truncate">
                  {neighbour.title}
                </span>
              </Link>
            ) : (
              <span className="flex-1" key={n} />
            ),
          )}
        </nav>

        <CtaBand
          body="Tell me what you're building, the constraints you're working with, and where it breaks. I reply within a day."
          title={`Need a system like ${project.title}?`}
        >
          <Link className={buttonStyles.primary} href="/contact">
            Discuss a project
          </Link>
          <CopyEmailRow className="w-full sm:w-auto" />
        </CtaBand>
      </div>
    </PageShell>
  );
}
