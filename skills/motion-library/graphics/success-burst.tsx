import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Success burst: a check badge springs in, confetti bursts outward and falls, and the message fades up.
// Loops every 5s. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 5000;
const COLORS = ["#2563EB", "#F59E0B", "#7C3AED", "#EF4444", "#16A34A"];
const PIECES = Array.from({ length: 22 }, (_, i) => {
  const angle = (i / 22) * Math.PI * 2 + (i % 2) * 0.12;
  const dist = 17 + (i % 4) * 5;
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    rotate: (i % 2 ? 1 : -1) * (180 + i * 20),
    color: COLORS[i % COLORS.length],
    round: i % 3 === 0,
    w: 1.6 + (i % 3) * 0.5,
  };
});

export default function SuccessBurst() {
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
      <motion.div key={cycle} initial={{ opacity: 1 }} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }} className="relative flex flex-col items-center gap-[3cqw]">
        <div className="relative flex h-[18cqw] w-[18cqw] items-center justify-center">
          {PIECES.map((p, i) => (
            <motion.span
              key={i}
              className="absolute"
              style={{ width: `${p.w}cqw`, height: `${p.round ? p.w : p.w * 2}cqw`, background: p.color, borderRadius: p.round ? "50%" : "0.3cqw" }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: [0, `${p.x}cqw`, `${p.x * 1.1}cqw`],
                y: [0, `${p.y}cqw`, `${p.y + 12}cqw`],
                rotate: [0, p.rotate * 0.6, p.rotate],
                opacity: [0, 1, 0],
                scale: [0, 1, 1],
              }}
              transition={{ duration: 1.8, delay: 0.55, times: [0, 0.35, 1], ease: "easeOut" }}
            />
          ))}
          <motion.div
            className="relative flex h-full w-full items-center justify-center rounded-full bg-[#16A34A] shadow-[0_2cqw_6cqw_rgba(22,163,74,0.45)]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 13, delay: 0.15 }}
          >
            <svg viewBox="0 0 24 24" className="h-[9cqw] w-[9cqw]" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.5 }} />
            </svg>
          </motion.div>
        </div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <div className="text-[5cqw] font-extrabold tracking-tight text-[#111111]">You're all set!</div>
          <div className="mt-[0.6cqw] text-[2.8cqw] text-[#6b7280]">Your order is on its way.</div>
        </motion.div>
      </motion.div>
    </div>
    </MotionConfig>
  );
}
