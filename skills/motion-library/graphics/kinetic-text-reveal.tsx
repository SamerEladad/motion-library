import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

// Kinetic text reveal: words rise out of masks, then a blue highlight wipes in behind the key word.
// Loops every 4.2s. Needs: react, motion, tailwindcss v4.
const LINE_ONE = ["Ideas", "that"];
const KEY_WORD = "move";
const LINE_TWO_TAIL = "people";
const CYCLE_MS = 4200;
const spring = { type: "spring", stiffness: 260, damping: 24 } as const;

export default function KineticTextReveal() {
  const reduce = useReducedMotion();
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const rise = (delay: number) => ({
    initial: { y: reduce ? 0 : "115%", opacity: 0 },
    animate: { y: "0%", opacity: 1 },
    transition: { ...spring, delay },
  });

  return (
    <div
      className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
      style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
    >
      <motion.div
        key={cycle}
        initial={false} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }}
        className="flex flex-col items-center gap-[1cqw] text-[12cqw] font-extrabold leading-[1.05] tracking-tight text-[#111111]"
      >
        <div className="flex gap-[2.6cqw]">
          {LINE_ONE.map((word, i) => (
            <span key={word} className="overflow-hidden pb-[1cqw]">
              <motion.span className="block" {...rise(0.15 + i * 0.12)}>
                {word}
              </motion.span>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-[2.6cqw]">
          <span className="relative overflow-hidden px-[2cqw] pb-[1cqw]">
            <motion.span
              className="absolute inset-y-[1cqw] inset-x-0 origin-left rounded-[1.6cqw] bg-[#2563EB]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="relative block text-white"
              {...rise(0.55)}
            >
              {KEY_WORD}
            </motion.span>
          </span>
          <span className="overflow-hidden pb-[1cqw]">
            <motion.span className="block" {...rise(0.7)}>
              {LINE_TWO_TAIL}
            </motion.span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
