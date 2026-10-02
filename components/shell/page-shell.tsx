import type { ReactNode } from "react";

/**
 * Page body. Header, tab bar and footer are mounted once in the root layout
 * so they persist across navigations; this only sets the content column.
 * Phones keep the narrow reading column; desktop gets the full site width.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main
      className="shell-container flex-1 flex flex-col relative pt-24 md:pt-32 lg:pt-36 pb-28 md:pb-20 min-h-dvh short-screen:pt-20 short-screen:pb-24"
      id="main"
    >
      {children}
    </main>
  );
}
