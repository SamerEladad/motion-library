import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Map route: a route draws along the roads from a start dot to a destination pin that drops in, with an ETA chip.
// Loops every 6s. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 6000;
const ROUTE = "M16 48 L16 38 Q16 32 22 32 L44 32 Q50 32 50 26 L50 20 Q50 14 56 14 L82 14";

export default function MapRoute() {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E9EEE5] [container-type:inline-size]">
        <svg viewBox="0 0 100 62.5" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
          <rect x="60" y="34" width="22" height="16" rx="2" fill="#D3E7CB" />
          <rect x="4" y="6" width="26" height="14" rx="2" fill="#D3E7CB" />
          <path d="M-4 24 Q20 18 36 40 T70 60 L104 58" stroke="#BFDBFE" strokeWidth="7" strokeLinecap="round" />
          <g stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round">
            <path d="M0 32 H100 M0 14 H100 M0 48 H100 M16 0 V62.5 M50 0 V62.5 M82 0 V62.5" />
          </g>
          <g stroke="#DAE0D4" strokeWidth="0.5">
            <path d="M0 23 H100 M0 40 H100 M33 0 V62.5 M66 0 V62.5" />
          </g>
        </svg>
        <motion.svg
          key={cycle}
          viewBox="0 0 100 62.5"
          className="absolute inset-0 h-full w-full"
          fill="none"
          initial={false}
          animate={{ opacity: [1, 1, 0] }}
          transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }}
          aria-hidden="true"
        >
          <path d={ROUTE} stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          <motion.path
            d={ROUTE}
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, delay: 0.5, ease: "easeInOut" }}
          />
          <motion.circle
            cx="16"
            cy="48"
            r="2.2"
            fill="#FFFFFF"
            stroke="#2563EB"
            strokeWidth="1.2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{ transformOrigin: "16px 48px" }}
            transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.2 }}
          />
          <motion.g
            initial={{ y: -14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 11, delay: 2.5 }}
          >
            <path d="M82 14 c-4.6 -5.4 -6.4 -8 -6.4 -11 a6.4 6.4 0 0 1 12.8 0 c0 3 -1.8 5.6 -6.4 11z" fill="#EF4444" />
            <circle cx="82" cy="3" r="2.4" fill="#FFFFFF" />
          </motion.g>
        </motion.svg>
        <motion.div
          key={`eta-${cycle}`}
          className="absolute left-[10cqw] top-[10cqw] rounded-[2cqw] bg-[#111111] px-[2.6cqw] py-[1.6cqw] text-white shadow-[0_1.6cqw_4cqw_rgba(0,0,0,0.25)]"
          initial={{ opacity: 0, scale: 0.7, y: 8 }}
          animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.7, 0.7, 1, 1, 1], y: [8, 8, 0, 0, 0] }}
          transition={{ duration: CYCLE_MS / 1000, times: [0, 0.42, 0.5, 0.92, 1], ease: "easeOut" }}
        >
          <div className="text-[4.4cqw] font-extrabold leading-none">12 min</div>
          <div className="mt-[0.4cqw] text-[2.2cqw] text-white/70">2.4 km · fastest</div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
