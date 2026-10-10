import type { Metadata } from "next";
import { PageShell } from "@/components/shell/page-shell";
import { LegalDoc } from "@/components/ui/legal-doc";
import { privacyPolicy, termsOfService } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: termsOfService.path,
  title: termsOfService.title,
  description: termsOfService.description,
  keywords: [...termsOfService.keywords],
});

export default function TermsPage() {
  return (
    <PageShell>
      <div className="stack-page">
        <LegalDoc counterpart={privacyPolicy} doc={termsOfService} />
      </div>
    </PageShell>
  );
}