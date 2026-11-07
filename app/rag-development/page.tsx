import type { Metadata } from "next";
import { ServiceLanding } from "@/components/services/service-landing";
import { resolveServicePage, servicePageByPath } from "@/lib/service-pages";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site-data";

const page = resolveServicePage(servicePageByPath("/rag-development"));

export const metadata: Metadata = pageMeta({
  path: page.path,
  title: page.metaTitle,
  description: page.description,
  ogTitle: `${page.metaTitle} | ${site.name}`,
  keywords: page.keywords,
});

export default function RagDevelopmentPage() {
  return <ServiceLanding page={page} />;
}
