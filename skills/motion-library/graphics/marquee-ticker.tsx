import { motion, MotionConfig } from "motion/react";

// Marquee ticker: three tilted rows of tag pills scroll endlessly in alternating directions.
// Loops forever, seamlessly. Needs: react, motion, tailwindcss v4.
const ROWS = [
  { words: ["Automation", "AI agents", "Workflows", "Prompts", "Templates"], dir: -1, speed: 22 },
  { words: ["Save time", "Make money", "Digital products", "Side income", "Systems"], dir: 1, speed: 28 },
  { words: ["No code", "Claude", "Zapier", "n8n", "Notion"], dir: -1, speed: 20 },
];
const COLORS = ["#2563EB", "#F59E0B", "#7C3AED", "#16A34A", "#EF4444"];

function Row({ words, dir, speed, offset }: { words: string[]; dir: number; speed: number; offset: number }) {
  const set = (
    <div className="flex shrink-0 gap-[2cqw] pr-[2cqw]">
      {words.map((w, i) => (
        <span key={w} className="flex items-center gap-[1.4cqw] whitespace-nowrap rounded-full border border-black/10 bg-white px-[3cqw] py-[1.6cqw] text-[4cqw] font-bold text-[#111111] shadow-[0_0.8cqw_2.4cqw_rgba(0,0,0,0.07)]">
          <span className="h-[2cqw] w-[2cqw] rounded-full" style={{ background: COLORS[(i + offset) % COLORS.length] }} />
          {w}
        </span>
      ))}
    </div>
  );
  return (
    <motion.div
      className="flex w-max"
      initial={{ x: dir < 0 ? "0%" : "-50%" }}
      animate={{ x: dir < 0 ? "-50%" : "0%" }}
      transition={{ duration: speed, ease: "linear", repeat: Infinity }}
    >
      {set}
      {set}
    </motion.div>
  );
}

export default function MarqueeTicker() {
  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
        style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
      >
        <div
          className="flex w-full -rotate-6 scale-110 flex-col gap-[2.4cqw]"
          style={{ maskImage: "linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)" }}
        >
          {ROWS.map((r, i) => (
            <Row key={i} words={r.words} dir={r.dir} speed={r.speed} offset={i} />
          ))}
        </div>
      </div>
    </MotionConfig>
  );
}
