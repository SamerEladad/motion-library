import { animate, motion, MotionConfig, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";

// Donut chart: three segments sweep around the ring in order while the total counts up and the legend slides in.
// Loops every 5.5s. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 5500;
const TOTAL = 2480;
const SEGMENTS = [
  { label: "Direct", value: 45, color: "#2563EB" },
  { label: "Search", value: 30, color: "#F59E0B" },
  { label: "Social", value: 25, color: "#7C3AED" },
];

function Total() {
  const v = useMotionValue(0);
  const text = useTransform(v, (n) => Math.round(n).toLocaleString("en-US"));
  useEffect(() => {
    const c = animate(v, TOTAL, { duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [v]);
  return <motion.span>{text}</motion.span>;
}

export default function DonutChart() {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);
  let start = 0;

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
        style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
      >
      <motion.div key={cycle} initial={false} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }} className="flex items-center gap-[7cqw]">
        <div className="relative h-[34cqw] w-[34cqw]">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" fill="none" aria-hidden="true">
            <circle cx="50" cy="50" r="36" stroke="#E4E4DE" strokeWidth="14" />
            {SEGMENTS.map((s, i) => {
              const offset = -start;
              start += s.value;
              return (
                <motion.circle
                  key={s.label}
                  cx="50"
                  cy="50"
                  r="36"
                  stroke={s.color}
                  strokeWidth="14"
                  pathLength={100}
                  strokeDashoffset={offset}
                  initial={{ strokeDasharray: "0 100" }}
                  animate={{ strokeDasharray: `${s.value - 0.8} ${100 - s.value + 0.8}` }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-[6.4cqw] font-extrabold leading-none tracking-tight tabular-nums text-[#111111]">
              <Total />
            </div>
            <div className="mt-[0.8cqw] text-[2.3cqw] font-medium text-[#6b7280]">Total users</div>
          </div>
        </div>
        <div className="flex flex-col gap-[2.4cqw]">
          {SEGMENTS.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex items-center gap-[1.8cqw]"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="h-[3cqw] w-[3cqw] rounded-[0.8cqw]" style={{ background: s.color }} />
              <span className="text-[3cqw] font-bold text-[#111111]">{s.label}</span>
              <span className="text-[3cqw] text-[#6b7280]">{s.value}%</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
    </MotionConfig>
  );
}
