import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Text scramble: random characters flicker and lock in left to right until the headline is revealed.
// Loops every 4.4s. Needs: react, motion, tailwindcss v4.
const TEXT = "FUTURE OF WORK";
const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&";
const FRAME_MS = 40;
const FRAMES = 110;
const hash = (a: number, b: number) => Math.abs(Math.sin(a * 12.9898 + b * 78.233) * 43758.5453) % 1;

export default function TextScramble() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % FRAMES), FRAME_MS);
    return () => clearInterval(id);
  }, []);

  const done = frame > 12 + TEXT.length * 3 + 8;

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
        style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
      >
      <div className="flex flex-col items-center gap-[2.6cqw]">
        <div className="flex font-mono text-[8.4cqw] font-extrabold leading-none tracking-tight">
          {TEXT.split("").map((ch, i) => {
            const locked = ch === " " || frame > 12 + i * 3;
            const shown = locked ? ch : POOL[Math.floor(hash(frame, i) * POOL.length)];
            return (
              <span key={i} className={`inline-block w-[5.4cqw] text-center ${locked ? "text-[#111111]" : "text-[#2563EB]"}`}>
                {ch === " " ? " " : shown}
              </span>
            );
          })}
        </div>
        <motion.div
          className="font-mono text-[2.6cqw] font-medium tracking-[0.2em] text-[#6b7280]"
          animate={{ opacity: done ? 1 : 0, y: done ? 0 : 6 }}
          transition={{ duration: 0.4 }}
        >
          DECODED ✓
        </motion.div>
      </div>
    </div>
    </MotionConfig>
  );
}
