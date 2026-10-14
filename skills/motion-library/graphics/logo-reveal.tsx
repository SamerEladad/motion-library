import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Logo reveal: the mark spins and scales in, then the wordmark unrolls beside it with a tagline.
// Loops every 5s. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 5000;
const ease = [0.16, 1, 0.3, 1] as const;

export default function LogoReveal() {
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
      <motion.div key={cycle} initial={false} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }} className="flex flex-col items-center gap-[2.4cqw]">
        <div className="flex items-center">
          <motion.div
            className="relative flex h-[16cqw] w-[16cqw] shrink-0 items-center justify-center rounded-[4.4cqw] bg-[#111111]"
            initial={{ scale: 0, rotate: -140 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 15 }}
          >
            <motion.span
              className="absolute h-[9cqw] w-[9cqw] rounded-full border-[1.2cqw] border-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.35 }}
            />
            <motion.span
              className="absolute h-[3.2cqw] w-[3.2cqw] rounded-full bg-[#2563EB]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.7 }}
            />
          </motion.div>
          <motion.div
            className="overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "42cqw" }}
            transition={{ duration: 0.8, delay: 0.9, ease }}
          >
            <motion.div
              className="whitespace-nowrap pl-[3cqw] text-[9.5cqw] font-extrabold tracking-tight text-[#111111]"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.8, delay: 0.9, ease }}
            >
              Northwind
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="text-[2.8cqw] font-medium tracking-[0.3em] text-[#6b7280]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.7 }}
        >
          MOVE FASTER
        </motion.div>
      </motion.div>
    </div>
    </MotionConfig>
  );
}
