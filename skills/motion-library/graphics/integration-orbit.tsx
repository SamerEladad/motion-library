import { motion, MotionConfig } from "motion/react";

// Integration orbit: app icons pop in around a central hub, then slowly orbit it while staying upright.
// Loops forever. Needs: react, motion, tailwindcss v4.
const APPS = [
  { glyph: "✉", color: "#EF4444" },
  { glyph: "▦", color: "#16A34A" },
  { glyph: "☁", color: "#2563EB" },
  { glyph: "✓", color: "#F59E0B" },
  { glyph: "♪", color: "#7C3AED" },
  { glyph: "⚡", color: "#0EA5E9" },
];
const R = 21; // orbit radius in cqw
const ORBIT_S = 26;

export default function IntegrationOrbit() {
  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
        style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
      >
      <div className="absolute left-1/2 top-1/2 h-[42cqw] w-[42cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-black/20" />
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: ORBIT_S, ease: "linear", repeat: Infinity }}
      >
        {APPS.map((a, i) => {
          const angle = (i / APPS.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <motion.div
              key={i}
              className="absolute h-[10cqw] w-[10cqw] -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${50 + R * Math.cos(angle)}cqw`, top: `${31.25 + R * Math.sin(angle)}cqw` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.3 + i * 0.12 }}
            >
              <motion.div
                className="flex h-full w-full items-center justify-center rounded-[2.4cqw] text-[5cqw] font-bold text-white shadow-[0_1.2cqw_3cqw_rgba(0,0,0,0.2)]"
                style={{ background: a.color }}
                animate={{ rotate: -360 }}
                transition={{ duration: ORBIT_S, ease: "linear", repeat: Infinity }}
              >
                {a.glyph}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
      <motion.div
        className="relative flex h-[15cqw] w-[15cqw] items-center justify-center rounded-full bg-[#111111] text-[7cqw] text-white shadow-[0_2cqw_6cqw_rgba(0,0,0,0.3)]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 14 }}
      >
        <motion.span animate={{ scale: [1, 1.15, 1], rotate: [0, 12, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          ✦
        </motion.span>
        <motion.span
          className="absolute inset-0 rounded-full border-[0.5cqw] border-[#2563EB]"
          animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      </motion.div>
    </div>
    </MotionConfig>
  );
}
