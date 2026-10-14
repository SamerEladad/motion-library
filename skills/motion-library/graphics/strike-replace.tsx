import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Strike and replace: a word gets struck through and lifts away, and the better word springs in with an underline.
// Loops every 5.5s. Shown in a 9:16 frame. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 5500;
const ease = [0.16, 1, 0.3, 1] as const;

export default function StrikeReplace() {
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
        <div className="relative h-[58cqw] w-[32.6cqw] overflow-hidden rounded-[2.4cqw] bg-[#FAFAF9] shadow-[0_2.4cqw_6cqw_rgba(0,0,0,0.2)]">
          <motion.div key={cycle} initial={{ opacity: 1 }} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }} className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="absolute top-[7cqw] text-[2.4cqw] font-bold tracking-[0.25em] text-[#9ca3af]">MINDSET</span>
            <div className="relative h-[10cqw] w-full">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 1, 1, 0, 0], y: ["10px", "0px", "0px", "-6cqw", "-6cqw"] }}
                transition={{ duration: 2.2, times: [0, 0.12, 0.62, 0.85, 1], ease: "easeInOut" }}
              >
                <span className="relative text-[8.4cqw] font-extrabold tracking-tight text-[#111111]">
                  Hurry
                  <motion.span
                    className="absolute inset-x-[-1cqw] top-1/2 h-[0.9cqw] origin-left rounded-full bg-[#EF4444]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.35, delay: 0.9, ease }}
                  />
                </span>
              </motion.div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, y: "6cqw" }}
                animate={{ opacity: 1, y: "0cqw" }}
                transition={{ type: "spring", stiffness: 220, damping: 16, delay: 2 }}
              >
                <span className="relative text-[7.4cqw] font-extrabold tracking-tight text-[#2563EB]">
                  Patience
                  <motion.span
                    className="absolute inset-x-0 -bottom-[0.8cqw] h-[0.8cqw] origin-left rounded-full bg-[#2563EB]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 2.5, ease }}
                  />
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
