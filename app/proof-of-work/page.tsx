import type { Metadata } from "next";
import { CommercialPageView } from "@/components/commercial/commercial-page";
import { commercialPageByPath } from "@/lib/commercial-pages";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site-data";

const page = commercialPageByPath("/proof-of-work");

export const metadata: Metadata = pageMeta({
  path: page.path,
  title: page.metaTitle,
  description: page.description,
  ogTitle: `${page.metaTitle} | ${site.name}`,
  keywords: page.keywords,
});

export default function ProofOfWorkPage() {
  return <CommercialPageView page={page} />;
}
