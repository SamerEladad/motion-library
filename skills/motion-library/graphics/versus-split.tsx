import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Versus split: two panels slide in from opposite sides, meet in the middle and a VS badge pops between them.
// Loops every 5.5s. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 5500;
const ease = [0.16, 1, 0.3, 1] as const;
const LEFT = { title: "By hand", color: "#6B7280", rows: ["6 hours", "12 errors", "High cost"] };
const RIGHT = { title: "With AI", color: "#2563EB", rows: ["20 minutes", "0 errors", "Low cost"] };

export default function VersusSplit() {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
        style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
      >
      <motion.div key={cycle} initial={false} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }} className="relative flex w-[84cqw] gap-[2cqw]">
        {[LEFT, RIGHT].map((p, side) => (
          <motion.div
            key={p.title}
            className="flex-1 rounded-[2.6cqw] p-[3cqw] text-white shadow-[0_2cqw_5cqw_rgba(0,0,0,0.18)]"
            style={{ background: p.color }}
            initial={{ x: side === 0 ? "-50cqw" : "50cqw", opacity: 0 }}
            animate={{ x: "0cqw", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <div className="text-[4.4cqw] font-extrabold tracking-tight">{p.title}</div>
            <div className="mt-[2cqw] flex flex-col gap-[1.4cqw]">
              {p.rows.map((r, i) => (
                <motion.div
                  key={r}
                  className="rounded-[1.4cqw] bg-white/15 px-[1.8cqw] py-[1.4cqw] text-[3cqw] font-bold"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1 + i * 0.22 + side * 0.08 }}
                >
                  {r}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
        <motion.span
          className="absolute left-1/2 top-1/2 flex h-[10cqw] w-[10cqw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[0.8cqw] border-[#F2F2EE] bg-[#111111] text-[3.4cqw] font-extrabold text-white"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.8 }}
        >
          VS
        </motion.span>
      </motion.div>
    </div>
    </MotionConfig>
  );
}
