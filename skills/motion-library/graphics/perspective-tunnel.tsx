import { motion, MotionConfig } from "motion/react";

// Perspective tunnel: nested frames rush outward from the centre to fake depth while a speaker card floats inside.
// Loops forever. Shown in a 9:16 frame. Needs: react, motion, tailwindcss v4.
const RINGS = [0, 1, 2, 3, 4];

export default function PerspectiveTunnel() {
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
      <svg viewBox="0 0 32.6 58" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <g stroke="#1C1917" strokeOpacity="0.18" strokeWidth="0.15">
          <path d="M0 0L16.3 29M32.6 0L16.3 29M0 58L16.3 29M32.6 58L16.3 29" />
        </g>
      </svg>
      {RINGS.map((r) => (
        <motion.div
          key={r}
          className="absolute left-1/2 top-1/2 h-[58cqw] w-[32.6cqw] -translate-x-1/2 -translate-y-1/2 rounded-[1.2cqw] border-[0.3cqw] border-[#1C1917]"
          initial={{ scale: 0.15, opacity: 0 }}
          animate={{ scale: [0.15, 1.5], opacity: [0, 0.7, 0] }}
          transition={{ duration: 3.5, delay: r * 0.7, ease: "easeIn", repeat: Infinity, times: [0, 1] }}
        />
      ))}
      <motion.div
        className="absolute left-1/2 top-[44%] h-[22cqw] w-[14cqw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.6cqw] border-[0.4cqw] border-white bg-[#D6D3D1] shadow-[0_2cqw_5cqw_rgba(0,0,0,0.3)]"
        initial={{ scale: 0, rotate: -8 }}
        animate={{ scale: [1, 1.05, 1], rotate: [-2, 2, -2], y: ["0cqw", "-0.8cqw", "0cqw"] }}
        transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
      >
        <svg viewBox="0 0 100 160" className="absolute inset-x-0 bottom-0 h-[85%] w-full" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
          <circle cx="50" cy="60" r="19" fill="#1C1917" />
          <path d="M10 160 C10 112 28 94 50 94 C72 94 90 112 90 160z" fill="#1C1917" />
        </svg>
      </motion.div>
      <div className="absolute inset-x-0 bottom-[5cqw] flex justify-center">
        <span className="rounded-full bg-[#111111] px-[2.2cqw] py-[1cqw] text-[2.8cqw] font-bold text-white">Every word lands.</span>
      </div>
    </div>
      </div>
    </MotionConfig>
  );
}
