import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Time saved clock: the hands spin fast around an analog clock face, then a "hours saved" badge pops in.
// Loops every 5.5s. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 5500;
const ease = [0.65, 0, 0.35, 1] as const;

export default function TimeSavedClock() {
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
      <motion.div key={cycle} initial={{ opacity: 1 }} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }} className="flex flex-col items-center gap-[3cqw]">
        <div className="relative h-[36cqw] w-[36cqw] rounded-full border-[0.9cqw] border-[#111111] bg-white shadow-[0_2cqw_6cqw_rgba(0,0,0,0.12)]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="absolute inset-0" style={{ transform: `rotate(${i * 30}deg)` }}>
              <div className={`mx-auto mt-[1.2cqw] w-[0.6cqw] rounded-full bg-[#111111] ${i % 3 === 0 ? "h-[3cqw]" : "h-[1.6cqw] opacity-50"}`} />
            </div>
          ))}
          <motion.div
            className="absolute bottom-1/2 left-1/2 h-[12cqw] w-[1.1cqw] -translate-x-1/2 origin-bottom rounded-full bg-[#111111]"
            initial={{ rotate: 0 }}
            animate={{ rotate: 1080 }}
            transition={{ duration: 2.6, delay: 0.5, ease }}
          />
          <motion.div
            className="absolute bottom-1/2 left-1/2 h-[8cqw] w-[1.5cqw] -translate-x-1/2 origin-bottom rounded-full bg-[#2563EB]"
            initial={{ rotate: 0 }}
            animate={{ rotate: 90 }}
            transition={{ duration: 2.6, delay: 0.5, ease }}
          />
          <span className="absolute left-1/2 top-1/2 h-[2.4cqw] w-[2.4cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#111111]" />
        </div>
        <motion.div
          className="rounded-full bg-[#111111] px-[3cqw] py-[1.2cqw] text-[3.4cqw] font-extrabold text-white"
          initial={{ opacity: 0, y: 12, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 16, delay: 3.2 }}
        >
          3 hours saved
        </motion.div>
      </motion.div>
    </div>
    </MotionConfig>
  );
}
