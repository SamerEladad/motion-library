import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useState } from "react";

// Stat count-up: a card pops in, the number eases up, a delta badge springs in, a sparkline draws.
// Loops every 4.6s. Needs: react, motion, tailwindcss v4.
const TARGET = 12480;
const CYCLE_MS = 4600;
const SPARK = "M0 58 C 18 56, 26 46, 44 48 S 70 30, 88 32 S 118 12, 140 14 S 170 4, 200 2";

export default function StatCountUp() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  return <Stat key={cycle} />;
}

function Stat() {
  const reduce = !!useReducedMotion();
  const value = useMotionValue(reduce ? TARGET : 0);
  const text = useTransform(value, (v) => "$" + Math.round(v).toLocaleString("en-US"));

  useEffect(() => {
    if (reduce) return;
    const controls = animate(value, TARGET, { duration: 1.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [reduce, value]);

  return (
    <div
      className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
      style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
    >
      <motion.div
        initial={false} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }}
        className="w-[64cqw]"
      >
        <motion.div
          className="rounded-[2.4cqw] border border-black/10 bg-white p-[3.6cqw] shadow-[0_2cqw_5cqw_rgba(0,0,0,0.10)]"
          initial={{ opacity: 0, y: reduce ? 0 : 20, scale: reduce ? 1 : 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[2.8cqw] font-medium text-[#6b7280]">Total revenue</span>
            <motion.span
              className="rounded-full bg-[#DCFCE7] px-[1.8cqw] py-[0.7cqw] text-[2.5cqw] font-semibold text-[#15803D]"
              initial={{ opacity: 0, scale: reduce ? 1 : 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 16, delay: 1.6 }}
            >
              ↑ 24%
            </motion.span>
          </div>
          <motion.div className="mt-[0.8cqw] text-[11cqw] font-extrabold leading-none tracking-tight tabular-nums text-[#111111]">
            {text}
          </motion.div>
          <svg viewBox="0 0 200 62" className="mt-[2cqw] w-full overflow-visible" fill="none" aria-hidden="true">
            <motion.path
              d={SPARK}
              stroke="#2563EB"
              strokeWidth="2.4"
              strokeLinecap="round"
              initial={{ pathLength: reduce ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
