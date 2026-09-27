import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shell/page-shell";
import { Icon } from "@/components/icon";
import { PageIntro, PageSection } from "@/components/ui/page-intro";
import { SubPageFooter } from "@/components/ui/sub-page-footer";
import { Tag } from "@/components/ui/primitives";
import { CtaBand, buttonStyles } from "@/components/ui/blocks";
import { skillGroups } from "@/lib/site-data";
import { pageMeta } from "@/lib/seo";
import { JsonLd, pageBreadcrumb } from "@/components/seo/json-ld";

export const metadata: Metadata = pageMeta({
  path: "/skills",
  title: "Technical Skills & Stack",
  description: "The tools Kunj Shah ships with, Python, FastAPI, LangGraph, CrewAI, PyTorch, CUDA, YOLOv8, React, Next.js, Docker, and the infrastructure underneath.",
  keywords: ["AI engineer skills", "LangGraph", "CrewAI", "PyTorch", "FastAPI", "MLOps stack", "Python AI developer"],
});

export default function SkillsPage() {
  return (
    <PageShell>
      <div className="stack-page">
        <JsonLd data={pageBreadcrumb("Skills", "/skills")} />
        <PageIntro
          title="Skills"
          lead="Grouped by discipline rather than by logo, the stack I actually reach for on each kind of problem."
        />

        {/* --------------------------------------------------------- discipline */}
        <PageSection meta={`${skillGroups.length} disciplines`} title="By discipline">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
            {skillGroups.map((group) => (
              <div
                className="p-space-md md:p-6 rounded-2xl bg-surface-card border border-border-hairline flex flex-col gap-space-sm"
                key={group.key}
              >
                <div className="flex items-center gap-space-sm">
                  <h3 className="font-headline-md text-headline-md text-text-primary">
                    {group.title}
                  </h3>
                </div>
                <p className="font-body-sm text-body-sm text-text-secondary">
                  {group.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <Tag
                      key={skill}
                      tone="subtle"
                    >
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PageSection>

        {/* -------------------------------------------------------- full stack */}
        <PageSection title="Full inventory">
          <div className="flex flex-col border-t border-border-hairline">
            {[
              {
                title: "Languages",
                icon: "code_blocks",
                items: ["Python", "TypeScript", "JavaScript", "C++"],
              },
              {
                title: "Frontend",
                icon: "devices",
                items: ["React", "Next.js 15", "Vite", "Tailwind"],
              },
              {
                title: "Backend",
                icon: "terminal",
                items: ["FastAPI", "Node.js", "Flask", "Streamlit"],
              },
              {
                title: "AI &amp; ML",
                icon: "hub",
                items: [
                  "GPT-4",
                  "Claude",
                  "Gemini",
                  "Llama",
                  "Groq",
                  "Ollama",
                  "LangGraph",
                  "CrewAI",
                  "PyTorch",
                  "XGBoost",
                ],
              },
              {
                title: "Data",
                icon: "content_copy",
                items: [
                  "PostgreSQL",
                  "pgvector",
                  "ChromaDB",
                  "Firebase",
                  "Supabase",
                  "Redis",
                ],
              },
              {
                title: "Infrastructure",
                icon: "cloud_sync",
                items: [
                  "Docker",
                  "Kubernetes",
                  "GitHub Actions",
                  "Vercel",
                  "Cloudflare",
                  "Render",
                ],
              },
              {
                title: "Computer Vision",
                icon: "memory",
                items: ["YOLOv8", "CUDA", "TensorRT", "GStreamer", "OpenCV"],
              },
            ].map((group) => (
              <div
                className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 py-4 border-b border-border-hairline"
                key={group.title}
              >
                <span className="flex items-center gap-2 md:w-48 shrink-0">
                  <Icon className="text-text-muted" name={group.icon as "code_blocks"} size={16} />
                  <span className="font-headline-md text-headline-md text-text-primary text-[15px]">
                    {group.title.replace("&amp;", "&")}
                  </span>
                </span>
                <div className="flex flex-col min-w-0 gap-1.5">
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <Tag key={item} tone="subtle">
                        {item}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PageSection>

        <CtaBand
          body="Send the brief. A 15-minute intro call is free, and I'll tell you honestly whether I'm the right fit, including when I'm not."
          title="Not sure which of these applies to your problem?"
        >
          <Link className={buttonStyles.primary} href="/contact">
            Get in touch
          </Link>
        </CtaBand>

        <SubPageFooter current="/skills" />
      </div>
    </PageShell>
  );
}
