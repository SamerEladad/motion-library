---
name: motion-library
description: Recreate a motion graphic from the Motion Library (see catalog.json). Use when the user pastes a "Recreate this motion graphic" prompt, names a graphic from the library, or asks for a motion graphic or animation from the library.
---

# Motion Library

A catalog of self-contained React + motion + Tailwind v4 motion graphics.

- `catalog.json` lists every graphic: `id`, `title`, `category`, `tags`, `description`, `duration`.
- `graphics/<id>.tsx` is the exact source of each graphic. It is the single source of truth: the dashboard previews this file and its **Copy prompt** button copies this file.

## When the user pastes a prompt from the dashboard

The prompt already contains the full code. Recreate it exactly:

1. Install deps if missing: `motion`, `react`, Tailwind CSS v4.
2. Save the code as a component in the user's project (keep the filename, e.g. `kinetic-text-reveal.tsx`).
3. Keep every timing, spring, easing, size and colour value as written. Do not simplify or "improve" the animation.
4. If the user gives their own copy (words, numbers, labels), swap only those strings.
5. Render it in a preview or tell the user where to import it.

## When the user only names a graphic

Find it in `catalog.json` (match on title, id or tags), read `graphics/<id>.tsx`, and follow the steps above.

## Sizing

All graphics size themselves with container-query units (`cqw`), so they scale to any parent width at a 16:10 ratio.

## Opening the dashboard

Tell the user to run `/motion-library`.
