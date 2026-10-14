import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Countdown: 3, 2, 1, Go! — each number punches in while a ring drains, then the ring flashes green.
// Loops forever, one beat per second. Needs: react, motion, tailwindcss v4.
const BEATS = ["3", "2", "1", "Go!"];

export default function CountdownTimer() {
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setBeat((b) => (b + 1) % BEATS.length), 1000);
    return () => clearInterval(id);
  }, []);

  const go = beat === BEATS.length - 1;

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
        style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
      >
      <div className="relative flex h-[38cqw] w-[38cqw] items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90" fill="none" aria-hidden="true">
          <circle cx="50" cy="50" r="44" stroke="#E4E4DE" strokeWidth="6" />
          <motion.circle
            key={beat}
            cx="50"
            cy="50"
            r="44"
            stroke={go ? "#16A34A" : "#2563EB"}
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: go ? 0 : 1 }}
            animate={{ pathLength: go ? 1 : 0 }}
            transition={{ duration: go ? 0.4 : 0.95, ease: go ? "easeOut" : "linear" }}
          />
        </svg>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={beat}
            className={`absolute font-extrabold leading-none tracking-tight ${go ? "text-[13cqw] text-[#16A34A]" : "text-[18cqw] text-[#111111]"}`}
            initial={{ scale: 1.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
          >
            {BEATS[beat]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
    </MotionConfig>
  );
}
