import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Line chart draw: a smooth line draws through a dip and a recovery, the area fills in and a callout pops at the end.
// Loops every 6s. Shown in a 9:16 frame. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 6000;
const VALUES = [34, 30, 36, 24, 14, 26, 42, 56, 66, 82];
const W = 100;
const H = 62;
const pts = VALUES.map((v, i) => [4 + (i * 92) / (VALUES.length - 1), H - 4 - v * 0.62] as const);
const mid = (a: readonly [number, number], b: readonly [number, number]) => `${(a[0] + b[0]) / 2} ${(a[1] + b[1]) / 2}`;
const LINE =
  `M${pts[0][0]} ${pts[0][1]} ` +
  pts.slice(1, -1).map((p, i) => `Q${p[0]} ${p[1]} ${mid(p, pts[i + 2])}`).join(" ") +
  ` T${pts[pts.length - 1][0]} ${pts[pts.length - 1][1]}`;
const AREA = `${LINE} L${pts[pts.length - 1][0]} ${H} L${pts[0][0]} ${H}z`;
const DIP = pts[4];
const END = pts[pts.length - 1];

export default function LineChartDraw() {
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
        <div className="relative h-[58cqw] w-[32.6cqw] overflow-hidden rounded-[2.4cqw] bg-white shadow-[0_2.4cqw_6cqw_rgba(0,0,0,0.2)]">
          <motion.div key={cycle} initial={{ opacity: 1 }} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }} className="absolute inset-0 px-[2.2cqw] pt-[4cqw]">
            <div className="text-[2.4cqw] font-semibold text-[#6b7280]">Weekly views</div>
            <motion.div
              className="text-[8cqw] font-extrabold leading-none tracking-tight text-[#111111]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.1, duration: 0.5 }}
            >
              +312%
            </motion.div>
            <div className="relative mt-[4cqw] w-full">
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="lcd-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#2563EB" stopOpacity="0.28" />
                    <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0.25, 0.5, 0.75].map((g) => (
                  <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="#000" strokeOpacity="0.08" strokeDasharray="1.5 1.5" strokeWidth="0.4" />
                ))}
                <motion.path d={AREA} fill="url(#lcd-fill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 0.8 }} />
                <motion.path
                  d={LINE}
                  stroke="#2563EB"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.4, delay: 0.4, ease: "easeInOut" }}
                />
                <motion.circle
                  cx={DIP[0]}
                  cy={DIP[1]}
                  r="2"
                  fill="#fff"
                  stroke="#EF4444"
                  strokeWidth="1.2"
                  style={{ transformOrigin: `${DIP[0]}px ${DIP[1]}px` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 14, delay: 1.4 }}
                />
                <motion.circle
                  cx={END[0]}
                  cy={END[1]}
                  r="2.4"
                  fill="#2563EB"
                  style={{ transformOrigin: `${END[0]}px ${END[1]}px` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 14, delay: 2.8 }}
                />
              </svg>
              <motion.span
                className="absolute rounded-full bg-[#111111] px-[1.4cqw] py-[0.5cqw] text-[2cqw] font-bold text-white"
                style={{ left: `${(DIP[0] / W) * 100}%`, top: `${(DIP[1] / H) * 100 + 14}%`, translateX: "-50%" }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.55, duration: 0.3 }}
              >
                The dip
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
