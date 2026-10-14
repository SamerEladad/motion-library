import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Leaderboard race: scores update every 1.4s and the rows re-sort with a smooth layout animation while the bars resize.
// Loops forever. Needs: react, motion, tailwindcss v4.
const PEOPLE = [
  { name: "Ava", color: "#2563EB" },
  { name: "Ben", color: "#F59E0B" },
  { name: "Chloe", color: "#7C3AED" },
  { name: "Dan", color: "#16A34A" },
  { name: "Eli", color: "#EF4444" },
];
// one array of scores per frame, in the same order as PEOPLE
const FRAMES = [
  [40, 72, 55, 30, 63],
  [68, 74, 58, 45, 63],
  [82, 74, 90, 52, 70],
  [85, 80, 91, 88, 71],
];
const STEP_MS = 1400;

export default function LeaderboardRace() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), STEP_MS);
    return () => clearInterval(id);
  }, []);

  const rows = PEOPLE.map((p, i) => ({ ...p, score: FRAMES[frame][i] })).sort((a, b) => b.score - a.score);

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
        style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
      >
      <div className="w-[72cqw] rounded-[3cqw] border border-black/10 bg-white p-[3cqw] shadow-[0_2cqw_6cqw_rgba(0,0,0,0.10)]">
        <div className="mb-[2cqw] text-[3cqw] font-extrabold tracking-tight text-[#111111]">Top sellers</div>
        <div className="flex flex-col gap-[1.2cqw]">
          {rows.map((r, rank) => (
            <motion.div
              key={r.name}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex items-center gap-[2cqw]"
            >
              <span className="w-[2.4cqw] text-[2.4cqw] font-bold text-[#9ca3af]">{rank + 1}</span>
              <span className="w-[9cqw] text-[2.8cqw] font-bold text-[#111111]">{r.name}</span>
              <div className="h-[3.6cqw] flex-1 overflow-hidden rounded-full bg-black/5">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: r.color }}
                  animate={{ width: `${r.score}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              </div>
              <span className="w-[6cqw] text-right text-[2.6cqw] font-bold tabular-nums text-[#111111]">{r.score}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </MotionConfig>
  );
}
