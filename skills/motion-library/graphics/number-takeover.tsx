import { animate, motion, MotionConfig, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";

// Number takeover: a black panel slides up over the speaker, a big number counts up, then the panel exits.
// Loops every 6s. Shown in a 9:16 frame. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 6000;
const TARGET = 1000;

function Count() {
  const v = useMotionValue(0);
  const text = useTransform(v, (n) => Math.round(n).toLocaleString("en-US"));
  useEffect(() => {
    const c = animate(v, TARGET, { duration: 2.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [v]);
  return <motion.span>{text}</motion.span>;
}

export default function NumberTakeover() {
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
        className="absolute inset-0 flex flex-col items-center justify-center gap-[1.4cqw] bg-[#111111]"
        initial={{ y: "100%" }}
        animate={{ y: ["100%", "0%", "0%", "-100%", "-100%"] }}
        transition={{ duration: CYCLE_MS / 1000, times: [0, 0.1, 0.68, 0.8, 1], ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="text-[8.6cqw] font-extrabold leading-none tracking-tight tabular-nums text-white">
          <Count />
          <span className="text-[#3B82F6]">+</span>
        </div>
        <motion.div
          className="px-[3cqw] text-center text-[2.6cqw] font-medium text-white/70"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          new subscribers in one day
        </motion.div>
      </motion.div>
    </div>
      </div>
    </MotionConfig>
  );
}
