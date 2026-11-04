import type { Project } from "@/lib/site-data";

/* ==========================================================================
   "People also ask" questions derived from the case study's own content.

   Every answer is verbatim site copy — the project's description, evaluation,
   limitations and lessons — so the block can never drift from the study
   behind it, and nothing is invented for the sake of the schema. Sections a
   project does not have simply do not produce a question.
   ========================================================================== */

export type PaaItem = { question: string; answer: string };

export function projectPaa(project: Project): PaaItem[] {
  const items: (PaaItem | null)[] = [
    { question: `What is ${project.title}?`, answer: project.description },
    project.evaluation
      ? { question: `How is ${project.title} tested?`, answer: project.evaluation }
      : null,
    project.limitations
      ? { question: `What are the limitations of ${project.title}?`, answer: project.limitations }
      : null,
    project.lessons
      ? { question: `What did you learn building ${project.title}?`, answer: project.lessons }
      : null,
  ];
  return items.filter((item): item is PaaItem => item !== null);
}
