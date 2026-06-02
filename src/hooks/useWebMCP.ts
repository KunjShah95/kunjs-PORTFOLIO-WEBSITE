import { useEffect } from 'react';
import { IDENTITY, SOCIALS } from '../data/portfolio';

export function useWebMCP() {
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.modelContext?.provideContext) {
      navigator.modelContext.provideContext({
        site: "Kunj Shah Portfolio",
        description: "Portfolio of Kunj Shah, AI Engineer & Agent Builder",
        identity: IDENTITY,
        socials: SOCIALS,
        tools: {
          navigateTo: {
            description: "Navigate to a different page on the site",
            parameters: {
              type: "object",
              properties: {
                path: {
                  type: "string",
                  description: "Path to navigate to (e.g. '/', '/about', '/projects')"
                }
              },
              required: ["path"]
            },
            execute: async ({ path }: { path: string }) => {
              window.location.href = path;
              return { success: true, path };
            }
          }
        }
      });
    }
  }, []);
}
