import type { ComponentType } from "react";
import catalog from "../../skills/motion-library/catalog.json";

export type Graphic = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  duration: string;
  Component: ComponentType;
  source: string;
};

// Every graphic lives as ONE self-contained file in skills/motion-library/graphics.
// The preview renders that file and the copy button copies the very same file,
// so what you see is exactly what Claude gets.
const modules = import.meta.glob<{ default: ComponentType }>(
  "../../skills/motion-library/graphics/*.tsx",
  { eager: true },
);
const sources = import.meta.glob<string>(
  "../../skills/motion-library/graphics/*.tsx",
  { eager: true, query: "?raw", import: "default" },
);

const byId = (id: string) => `../../skills/motion-library/graphics/${id}.tsx`;

export const graphics: Graphic[] = catalog.map((entry) => ({
  ...entry,
  Component: modules[byId(entry.id)].default,
  source: sources[byId(entry.id)],
}));

export const categories = ["All", ...Array.from(new Set(graphics.map((g) => g.category)))];

export function buildPrompt(g: Graphic) {
  return `Recreate this motion graphic exactly in my project.

Motion graphic: ${g.title} (${g.duration})
What it does: ${g.description}

Stack: React + motion (npm i motion) + Tailwind CSS v4. The component is self-contained and sizes itself to its parent's width (16:10) using container-query units (cqw), so drop it into any container.

Rules:
- Keep every timing, spring, easing and colour value exactly as written. Do not simplify the animation.
- Keep every colour, font size, radius and spacing exactly as written in the code.
- Respect prefers-reduced-motion (already handled through useReducedMotion).
- If I give you my own copy (text, numbers, labels), swap those in and change nothing else.

Code (${g.id}.tsx):

\`\`\`tsx
${g.source.trim()}
\`\`\`
`;
}
