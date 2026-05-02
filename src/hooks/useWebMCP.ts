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
          },
          changeTheme: {
            description: "Change the site theme to light or dark",
            parameters: {
              type: "object",
              properties: {
                theme: {
                  type: "string",
                  enum: ["light", "dark"]
                }
              },
              required: ["theme"]
            },
            execute: async ({ theme }: { theme: string }) => {
              // This relies on next-themes / local storage which this project seems to use
              localStorage.setItem('vite-ui-theme', theme);
              window.dispatchEvent(new Event('storage'));
              // Also add to classList directly for immediate effect
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
              return { success: true, theme };
            }
          }
        }
      });
    }
  }, []);
}
