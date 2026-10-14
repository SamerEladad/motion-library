import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Picture in picture: the full-screen speaker shrinks into a rounded card, a title drops in above and chips pop in below.
// Loops every 6s. Shown in a 9:16 frame. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 6000;
const CHIPS = ["Record", "Edit", "Share"];

export default function PipCard() {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);
  const times = [0, 0.15, 0.3, 0.78, 0.92, 1];

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
      <motion.div key={cycle} className="absolute inset-0" initial={{ opacity: 1 }} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.96, 1], ease: "linear" }}>
        <div className="absolute inset-0 bg-[#F5F5F4]">
          <motion.div
            className="absolute inset-x-0 top-[4cqw] text-center text-[4.4cqw] font-extrabold tracking-tight text-[#111111]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: [0, 0, 1, 1, 0, 0], y: [-10, -10, 0, 0, -10, -10] }}
            transition={{ duration: CYCLE_MS / 1000, times }}
          >
            How it works
          </motion.div>
          <div className="absolute inset-x-[2cqw] bottom-[5cqw] flex justify-center gap-[1cqw]">
            {CHIPS.map((c, i) => (
              <motion.span
                key={c}
                className="rounded-full bg-[#2563EB] px-[1.8cqw] py-[1cqw] text-[2.6cqw] font-bold text-white"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0, 1, 1, 0, 0], scale: [0.5, 0.5, 1, 1, 0.5, 0.5] }}
                transition={{ duration: CYCLE_MS / 1000, times: times.map((t, k) => (k === 2 ? t + i * 0.04 : t)), ease: "backOut" }}
              >
                {c}
              </motion.span>
            ))}
          </div>
        </div>
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ transformOrigin: "50% 0%", background: "linear-gradient(180deg, #E7E5E4 0%, #A8A29E 100%)" }}
          animate={{
            scale: [1, 1, 0.58, 0.58, 1, 1],
            y: ["0cqw", "0cqw", "11cqw", "11cqw", "0cqw", "0cqw"],
            borderRadius: ["0cqw", "0cqw", "3cqw", "3cqw", "0cqw", "0cqw"],
          }}
          transition={{ duration: CYCLE_MS / 1000, times, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 160" className="absolute inset-x-0 bottom-0 h-[78%] w-full" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
            <circle cx="50" cy="60" r="19" fill="#1C1917" />
            <path d="M10 160 C10 112 28 94 50 94 C72 94 90 112 90 160z" fill="#1C1917" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
      </div>
    </MotionConfig>
  );
}
