import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { Card } from "./components/Card";
import { buildPrompt, categories, graphics } from "./registry";

const LINKS = {
  newsletter: "https://samerflows.com",
  instagram: "https://instagram.com/samerflows",
  repo: "https://github.com/SamerEladad/motion-library",
};

export default function App() {
  const reduce = useReducedMotion();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return graphics.filter(
      (g) =>
        (category === "All" || g.group === category) &&
        (!q || [g.title, g.description, g.category, g.group, ...g.tags].join(" ").toLowerCase().includes(q)),
    );
  }, [category, query]);

  return (
    <div className="min-h-screen">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(184,0,60,0.22), transparent 70%)",
        }}
      />
      <main className="relative mx-auto flex max-w-[1248px] flex-col gap-12 px-5 pb-28 pt-16 sm:px-8 sm:pt-24">
        <header className="flex flex-col gap-6">
          <span className="w-fit rounded-full border border-dashed border-dash px-3.5 py-1.5 font-mono text-xs tracking-[0.12em] text-muted">
            [ @SAMERFLOWS · MOTION LIBRARY ]
          </span>
          <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-[1.5px] sm:text-6xl">
            Motion graphics,
            <br />
            <span className="font-serif font-normal italic tracking-normal text-ruby-lit [text-shadow:var(--shadow-glow-ruby)]">
              ready to copy
            </span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted">
            Pick a motion graphic, hit copy, paste it into Claude. You get the exact animation, in your project, in one
            go.
          </p>
        </header>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categories">
            {categories.map((c) => {
              const active = c === category;
              return (
                <button
                  key={c}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(c)}
                  className={`h-10 cursor-pointer rounded-full border px-4 font-mono text-xs tracking-wide transition-colors duration-150 ${
                    active
                      ? "border-ruby bg-ruby text-white"
                      : "border-line bg-card text-muted hover:border-dash hover:text-white"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <label className="relative block sm:w-72">
            <span className="sr-only">Search motion graphics</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search… chart, hook, prompt"
              className="h-10 w-full rounded-full border border-line bg-card px-4 font-mono text-xs text-white placeholder:text-dim focus:border-ruby-lit focus:outline-none"
            />
          </label>
        </div>

        <section aria-label="Motion graphics" className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((g, i) => (
            <motion.div
              key={g.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card graphic={g} prompt={() => buildPrompt(g)} index={graphics.indexOf(g) + 1} />
            </motion.div>
          ))}
        </section>

        {visible.length === 0 && (
          <p className="py-16 text-center font-mono text-sm text-muted">[ NOTHING MATCHES “{query}” ]</p>
        )}

        <footer className="flex flex-col items-center gap-8 border-t border-line pt-10 text-center">
          <div className="flex flex-col items-center gap-3">
            <p className="font-display text-2xl font-bold uppercase tracking-[1.5px]">
              Want my{" "}
              <span className="font-serif font-normal italic tracking-normal text-ruby-lit [text-shadow:var(--shadow-glow-ruby)]">
                full setup?
              </span>
            </p>
            <p className="max-w-md text-[15px] leading-relaxed text-muted">
              I share the workflows, prompts and systems I use to save time and make money with AI.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={LINKS.newsletter}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-[10px] border border-ruby bg-ruby px-5 text-sm font-medium text-white transition-colors duration-150 hover:border-ruby-lit hover:bg-ruby-lit"
            >
              Get my setup
              <span aria-hidden="true">→</span>
            </a>
            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center rounded-[10px] border border-line bg-card px-5 text-sm font-medium text-white transition-colors duration-150 hover:border-dash hover:bg-white/5"
            >
              Follow on Instagram
            </a>
          </div>
          <span className="font-['Reenie_Beanie'] text-[38px] leading-none text-white/50">@samerflows</span>
          <div className="flex w-full flex-wrap items-center justify-between gap-3 border-t border-line pt-5 font-mono text-xs text-dim">
            <span>
              {visible.length} / {graphics.length} MOTION GRAPHICS
            </span>
            <a href={LINKS.repo} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
              GITHUB · MIT
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
