import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Checklist card: a card slides up over the speaker and each item gets ticked off, struck through and greyed out.
// Loops every 6.5s. Shown in a 9:16 frame. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 6500;
const ITEMS = ["Clear audio", "Hook in 3 sec", "Captions on", "Call to action"];
const at = (i: number) => 1.1 + i * 0.6;

export default function ChecklistCard() {
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
      <motion.div key={cycle} initial={false} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }} className="absolute inset-0">
        <motion.div
          className="absolute inset-x-[2.4cqw] bottom-[5cqw] rounded-[2.2cqw] bg-white p-[2.2cqw] shadow-[0_1.6cqw_4cqw_rgba(0,0,0,0.3)]"
          initial={{ y: "34cqw" }}
          animate={{ y: "0cqw" }}
          transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.3 }}
        >
          <div className="mb-[1.2cqw] flex items-center justify-between">
            <span className="whitespace-nowrap text-[2.5cqw] font-extrabold tracking-tight text-[#111111]">Before you post</span>
            <motion.span
              className="whitespace-nowrap rounded-full bg-[#DCFCE7] px-[1.2cqw] py-[0.3cqw] text-[2cqw] font-bold text-[#15803D]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 380, damping: 14, delay: at(ITEMS.length) }}
            >
              4 / 4
            </motion.span>
          </div>
          {ITEMS.map((t, i) => (
            <div key={t} className="flex items-center gap-[1.6cqw] py-[0.8cqw]">
              <span className="relative h-[3.6cqw] w-[3.6cqw] shrink-0 rounded-[0.9cqw] border-[0.3cqw] border-[#D1D5DB]">
                <motion.span
                  className="absolute -inset-[0.3cqw] flex items-center justify-center rounded-[0.9cqw] bg-[#2563EB]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 16, delay: at(i) }}
                >
                  <svg viewBox="0 0 24 24" className="h-[2.4cqw] w-[2.4cqw]" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.25, delay: at(i) + 0.1 }} />
                  </svg>
                </motion.span>
              </span>
              <motion.span
                className="relative whitespace-nowrap text-[2.3cqw] font-semibold"
                initial={{ color: "#111111" }}
                animate={{ color: "#9CA3AF" }}
                transition={{ duration: 0.3, delay: at(i) + 0.2 }}
              >
                {t}
                <motion.span
                  className="absolute inset-x-0 top-1/2 h-[0.3cqw] origin-left bg-[#9CA3AF]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, delay: at(i) + 0.2 }}
                />
              </motion.span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
      </div>
    </MotionConfig>
  );
}
