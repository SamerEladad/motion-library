import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Lower third: a broadcast-style name tag wipes in over video, holds, then slides out.
// Loops every 6s. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 6000;
const ease = [0.16, 1, 0.3, 1] as const;

export default function LowerThird() {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative aspect-[16/10] w-full overflow-hidden [container-type:inline-size]"
        style={{ background: "linear-gradient(135deg, #334155 0%, #0F172A 100%)" }}
      >
        <div className="absolute -left-[10cqw] top-[6cqw] h-[50cqw] w-[50cqw] rounded-full bg-[#2563EB]/30 blur-3xl" />
        <div className="absolute -right-[8cqw] bottom-[4cqw] h-[44cqw] w-[44cqw] rounded-full bg-[#F59E0B]/20 blur-3xl" />
        <span className="absolute right-[4cqw] top-[4cqw] flex items-center gap-[1cqw] rounded-[0.8cqw] bg-white/90 px-[1.4cqw] py-[0.7cqw] text-[2.2cqw] font-bold text-[#111111]">
          <span className="h-[1.6cqw] w-[1.6cqw] rounded-full bg-[#EF4444]" /> LIVE
        </span>
        <motion.div
          key={cycle}
          className="absolute bottom-[8cqw] left-[6cqw] flex items-stretch"
          initial={{ x: 0 }}
          animate={{ x: ["0cqw", "0cqw", "-70cqw", "-70cqw"] }}
          transition={{ duration: CYCLE_MS / 1000, times: [0, 0.82, 0.95, 1], ease: "easeIn" }}
        >
          <motion.div
            className="w-[1.4cqw] origin-top bg-[#2563EB]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, ease }}
          />
          <div className="flex flex-col">
            <motion.div
              className="bg-white px-[3cqw] py-[1.4cqw]"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.6, delay: 0.25, ease }}
            >
              <div className="text-[5cqw] font-extrabold leading-none tracking-tight text-[#111111]">Alex Morgan</div>
            </motion.div>
            <motion.div
              className="bg-[#2563EB] px-[3cqw] py-[1cqw]"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
            >
              <div className="text-[2.6cqw] font-medium text-white">Founder, Northwind Studio</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
