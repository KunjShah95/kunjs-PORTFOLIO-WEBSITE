/// <reference types="vite/client" />

interface Navigator {
  modelContext?: {
    provideContext: (context: any) => void;
  };
}
