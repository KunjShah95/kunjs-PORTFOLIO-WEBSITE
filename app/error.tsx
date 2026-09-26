"use client";

import Link from "next/link";
import { useEffect } from "react";
import { PageShell } from "@/components/shell/page-shell";
import { buttonStyles } from "@/components/ui/blocks";
import { EmptyState } from "@/components/ui/empty-state";

/** Route error boundary: plain explanation, a retry, and a way home. */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageShell>
      <EmptyState
        action={
          <div className="flex flex-wrap gap-3">
            <button className={buttonStyles.primary} onClick={reset} type="button">
              Try again
            </button>
            <Link className={buttonStyles.secondary} href="/">
              Back to home
            </Link>
          </div>
        }
        body="Something failed while loading this page. It is usually temporary; trying again normally fixes it."
        icon="refresh"
        title="This page didn't load."
      />
    </PageShell>
  );
}
