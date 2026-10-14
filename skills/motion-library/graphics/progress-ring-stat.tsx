import { animate, motion, MotionConfig, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";

// Progress ring stat: a ring sweeps to 82% while the number counts up, then a trend badge pops in.
// Loops every 5s. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 5000;
const TARGET = 82;

function Count() {
  const v = useMotionValue(0);
  const text = useTransform(v, (n) => Math.round(n).toString());
  useEffect(() => {
    const c = animate(v, TARGET, { duration: 2, delay: 0.4, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [v]);
  return <motion.span>{text}</motion.span>;
}

export default function ProgressRingStat() {
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
      <motion.div key={cycle} initial={{ opacity: 1 }} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }} className="flex flex-col items-center gap-[2.4cqw]">
        <div className="relative h-[38cqw] w-[38cqw]">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" fill="none" aria-hidden="true">
            <circle cx="50" cy="50" r="42" stroke="#E4E4DE" strokeWidth="9" />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              stroke="#2563EB"
              strokeWidth="9"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: TARGET / 100 }}
              transition={{ duration: 2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-[11cqw] font-extrabold leading-none tracking-tight tabular-nums text-[#111111]">
              <Count />
              <span className="text-[6cqw] text-[#6b7280]">%</span>
            </div>
            <div className="mt-[0.8cqw] text-[2.4cqw] font-medium text-[#6b7280]">Task completion</div>
          </div>
        </div>
        <motion.span
          className="rounded-full bg-[#DCFCE7] px-[2cqw] py-[0.8cqw] text-[2.6cqw] font-bold text-[#15803D]"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 16, delay: 2.2 }}
        >
          ↑ 12% vs last week
        </motion.span>
      </motion.div>
    </div>
    </MotionConfig>
  );
}
