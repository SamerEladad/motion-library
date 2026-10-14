import { animate, motion, MotionConfig, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";

// Price tag swing: a tag swings in on its string like a pendulum while the price counts down to the deal.
// Loops every 6s. Shown in a 9:16 frame. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 6000;

function Price() {
  const v = useMotionValue(99);
  const text = useTransform(v, (n) => "$" + Math.round(n));
  useEffect(() => {
    const c = animate(v, 42, { duration: 1.4, delay: 1.1, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [v]);
  return <motion.span>{text}</motion.span>;
}

export default function PriceTagSwing() {
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
      <div className="absolute inset-0 bg-black/40" />
      <motion.div
        key={cycle}
        className="absolute inset-0"
        initial={false}
        animate={{ opacity: [1, 1, 0] }}
        transition={{ duration: CYCLE_MS / 1000, times: [0, 0.93, 1], ease: "linear" }}
      >
        <motion.div
          className="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center"
          style={{ transformOrigin: "50% 0%" }}
          initial={{ rotate: -22, y: "-30cqw" }}
          animate={{ rotate: [-22, 14, -9, 5, -2, 0], y: ["-30cqw", "0cqw", "0cqw", "0cqw", "0cqw", "0cqw"] }}
          transition={{ duration: 2.6, times: [0, 0.2, 0.42, 0.62, 0.8, 1], ease: "easeInOut" }}
        >
          <div className="h-[13cqw] w-[0.4cqw] bg-white" />
          <div className="relative w-[19cqw] rounded-[2cqw] bg-white px-[1.6cqw] pb-[2.4cqw] pt-[3.4cqw] text-center shadow-[0_1.4cqw_4cqw_rgba(0,0,0,0.35)]">
            <span className="absolute left-1/2 top-[1.2cqw] h-[1.6cqw] w-[1.6cqw] -translate-x-1/2 rounded-full bg-[#A8A29E]" />
            <div className="text-[2cqw] font-bold tracking-[0.2em] text-[#2563EB]">SALE</div>
            <div className="relative mx-auto mt-[0.6cqw] w-fit text-[2.6cqw] font-semibold text-[#9ca3af]">
              $99
              <motion.span
                className="absolute inset-x-0 top-1/2 h-[0.4cqw] origin-left bg-[#EF4444]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.1, duration: 0.25 }}
              />
            </div>
            <div className="mt-[0.4cqw] text-[9cqw] font-extrabold leading-none tracking-tight tabular-nums text-[#111111]">
              <Price />
            </div>
            <div className="mt-[0.6cqw] text-[2cqw] font-medium text-[#6b7280]">per month</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
      </div>
    </MotionConfig>
  );
}
