import { motion, MotionConfig } from "motion/react";

// Before / after slider: a divider sweeps back and forth, revealing the colourful "after" over a faded "before".
// Loops forever, 6s per sweep. Needs: react, motion, tailwindcss v4.
const times = [0, 0.3, 0.7, 1];
const percent = [50, 88, 12, 50]; // how much of the "after" layer is visible from the left

function Scene() {
  return (
    <svg viewBox="0 0 160 100" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="ba-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDBA74" />
          <stop offset="1" stopColor="#FEF3C7" />
        </linearGradient>
      </defs>
      <rect width="160" height="100" fill="url(#ba-sky)" />
      <circle cx="116" cy="34" r="14" fill="#F97316" />
      <path d="M0 70 Q30 40 60 62 T120 58 T160 64 V100 H0z" fill="#7C3AED" opacity="0.85" />
      <path d="M0 82 Q40 56 80 78 T160 74 V100 H0z" fill="#2563EB" />
      <rect x="38" y="64" width="3" height="14" fill="#7C2D12" />
      <circle cx="39.5" cy="60" r="8" fill="#16A34A" />
    </svg>
  );
}

export default function BeforeAfterSlider() {
  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
        style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
      >
        <div className="relative h-[40cqw] w-[64cqw] overflow-hidden rounded-[3cqw] border border-black/10 bg-white shadow-[0_2cqw_6cqw_rgba(0,0,0,0.15)]">
          <div className="absolute inset-0" style={{ filter: "grayscale(1) brightness(0.8) contrast(0.8)" }}>
            <Scene />
          </div>
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: `inset(0 ${100 - percent[0]}% 0 0)` }}
            animate={{ clipPath: percent.map((p) => `inset(0 ${100 - p}% 0 0)`) }}
            transition={{ duration: 6, times, ease: "easeInOut", repeat: Infinity }}
          >
            <Scene />
          </motion.div>
          <motion.div
            className="absolute inset-y-0 w-[0.6cqw] -translate-x-1/2 bg-white shadow-[0_0_1cqw_rgba(0,0,0,0.4)]"
            initial={{ left: `${percent[0]}%` }}
            animate={{ left: percent.map((p) => `${p}%`) }}
            transition={{ duration: 6, times, ease: "easeInOut", repeat: Infinity }}
          >
            <span className="absolute left-1/2 top-1/2 flex h-[6cqw] w-[6cqw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[2.6cqw] font-bold text-[#111111] shadow-[0_0.6cqw_2cqw_rgba(0,0,0,0.3)]">
              ⇄
            </span>
          </motion.div>
          <span className="absolute left-[2cqw] top-[2cqw] rounded-full bg-black/60 px-[1.6cqw] py-[0.6cqw] text-[2cqw] font-bold text-white">After</span>
          <span className="absolute right-[2cqw] top-[2cqw] rounded-full bg-black/60 px-[1.6cqw] py-[0.6cqw] text-[2cqw] font-bold text-white">Before</span>
        </div>
      </div>
    </MotionConfig>
  );
}
