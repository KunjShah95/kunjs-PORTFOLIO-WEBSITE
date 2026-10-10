import type { Metadata } from "next";
import { PageShell } from "@/components/shell/page-shell";
import { LegalDoc } from "@/components/ui/legal-doc";
import { privacyPolicy, termsOfService } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  path: privacyPolicy.path,
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  keywords: [...privacyPolicy.keywords],
});

export default function PrivacyPage() {
  return (
    <PageShell>
      <div className="stack-page">
        <LegalDoc counterpart={termsOfService} doc={privacyPolicy} />
      </div>
    </PageShell>
  );
}