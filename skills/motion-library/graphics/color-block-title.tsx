import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Color block title: a blue panel wipes across the speaker, the title words rise in, then it wipes away.
// Loops every 5s. Shown in a 9:16 frame. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 5000;
const ease = [0.16, 1, 0.3, 1] as const;

export default function ColorBlockTitle() {
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
        <div
          className="relative h-[58cqw] w-[32.6cqw] overflow-hidden rounded-[2.4cqw] shadow-[0_2.4cqw_6cqw_rgba(0,0,0,0.25)]"
          style={{ background: "linear-gradient(180deg, #E7E5E4 0%, #A8A29E 100%)" }}
        >
      <svg viewBox="0 0 100 160" className="absolute inset-x-0 bottom-0 h-[78%] w-full" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
            <circle cx="50" cy="60" r="19" fill="#1C1917" />
            <path d="M10 160 C10 112 28 94 50 94 C72 94 90 112 90 160z" fill="#1C1917" />
          </svg>
      <motion.div
        key={cycle}
        className="absolute inset-0 flex flex-col items-start justify-center gap-[0.6cqw] bg-[#2563EB] px-[3.4cqw]"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)", "inset(0 0 0 100%)", "inset(0 0 0 100%)"] }}
        transition={{ duration: CYCLE_MS / 1000, times: [0, 0.12, 0.7, 0.82, 1], ease: "easeInOut" }}
      >
        <motion.span
          className="rounded-full border border-white/60 px-[1.4cqw] py-[0.4cqw] text-[2.2cqw] font-semibold text-white"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          02 / 05
        </motion.span>
        {["STEP", "TWO"].map((w, i) => (
          <span key={w} className="overflow-hidden pb-[0.6cqw]">
            <motion.span
              className="block text-[10.4cqw] font-extrabold leading-[0.9] tracking-tight text-white"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.6, delay: 0.55 + i * 0.12, ease }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </motion.div>
    </div>
      </div>
    </MotionConfig>
  );
}
