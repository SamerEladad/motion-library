import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

// Bar chart growth: bars spring up in a stagger, the last bar turns blue and a tooltip pops.
// Loops every 4.4s. Needs: react, motion, tailwindcss v4.
const DATA = [
  { label: "Mon", value: 28 },
  { label: "Tue", value: 41 },
  { label: "Wed", value: 36 },
  { label: "Thu", value: 58 },
  { label: "Fri", value: 74 },
  { label: "Sat", value: 66 },
  { label: "Sun", value: 100 },
];
const CYCLE_MS = 4400;

export default function BarChartGrowth() {
  const reduce = useReducedMotion();
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
      style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
    >
      <motion.div
        key={cycle}
        initial={false} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }}
        className="w-[72cqw] rounded-[2.4cqw] border border-black/10 bg-white px-[3.4cqw] pb-[2.6cqw] pt-[3cqw] shadow-[0_2cqw_5cqw_rgba(0,0,0,0.10)]"
      >
        <div className="text-[2.8cqw] font-semibold text-[#111111]">Weekly sales</div>
        <div className="relative mt-[2cqw] flex h-[26cqw] items-end gap-[1.8cqw]">
          {[25, 50, 75].map((p) => (
            <div key={p} className="absolute inset-x-0 border-t border-dashed border-black/10" style={{ bottom: `${p}%` }} />
          ))}
          {DATA.map((d, i) => {
            const last = i === DATA.length - 1;
            return (
              <div key={d.label} className="relative flex h-full flex-1 flex-col items-center justify-end">
                {last && (
                  <motion.span
                    className="absolute -top-[1cqw] z-10 rounded-[0.8cqw] bg-[#111111] px-[1.2cqw] py-[0.5cqw] text-[2.2cqw] font-semibold text-white"
                    initial={{ opacity: 0, y: reduce ? 0 : 6, scale: reduce ? 1 : 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18, delay: 1.5 }}
                  >
                    +257%
                  </motion.span>
                )}
                <motion.div
                  className="w-full rounded-t-[0.8cqw]"
                  style={{ height: `${d.value * 0.86}%`, transformOrigin: "bottom" }}
                  initial={{ scaleY: reduce ? 1 : 0, backgroundColor: "#C7D2FE" }}
                  animate={{ scaleY: 1, backgroundColor: last ? "#2563EB" : "#C7D2FE" }}
                  transition={{
                    scaleY: { type: "spring", stiffness: 140, damping: 17, delay: 0.15 + i * 0.09 },
                    backgroundColor: { duration: 0.4, delay: 1.1 },
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="mt-[1.2cqw] flex gap-[1.8cqw]">
          {DATA.map((d) => (
            <span key={d.label} className="flex-1 text-center text-[2.2cqw] font-medium text-[#6b7280]">
              {d.label}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
