import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Audio waveform: a podcast player where the waveform bars bounce and a blue progress fill sweeps across.
// Loops forever, 8s per pass. Needs: react, motion, tailwindcss v4.
const BARS = Array.from({ length: 34 }, (_, i) => 28 + 70 * Math.abs(Math.sin(i * 1.3) * Math.cos(i * 0.45)));
const LENGTH = 8;

function Bars({ color }: { color: string }) {
  return (
    <div className="flex h-full items-center gap-[0.7cqw]">
      {BARS.map((h, i) => (
        <motion.span
          key={i}
          className="w-[1cqw] rounded-full"
          style={{ height: `${h}%`, background: color }}
          animate={{ scaleY: [1, 0.55 + (i % 4) * 0.1, 1] }}
          transition={{ duration: 0.9 + (i % 5) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.03 }}
        />
      ))}
    </div>
  );
}

export default function AudioWaveform() {
  const [sec, setSec] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSec((s) => (s + 1) % (LENGTH + 1)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
        style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
      >
      <div className="w-[68cqw] rounded-[3cqw] border border-black/10 bg-white p-[3cqw] shadow-[0_2cqw_6cqw_rgba(0,0,0,0.10)]">
        <div className="flex items-center gap-[2.4cqw]">
          <span className="h-[11cqw] w-[11cqw] shrink-0 rounded-[2cqw]" style={{ background: "linear-gradient(135deg,#7C3AED,#2563EB)" }} />
          <div className="flex-1">
            <div className="text-[3cqw] font-extrabold tracking-tight text-[#111111]">Episode 12</div>
            <div className="text-[2.2cqw] text-[#6b7280]">How I automate my week</div>
          </div>
          <motion.span
            className="flex h-[8cqw] w-[8cqw] items-center justify-center rounded-full bg-[#111111]"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="ml-[0.5cqw] h-0 w-0 border-y-[1.6cqw] border-l-[2.6cqw] border-y-transparent border-l-white" />
          </motion.span>
        </div>
        <div className="relative mt-[3cqw] h-[14cqw]">
          <div className="absolute inset-0">
            <Bars color="#D4D4D8" />
          </div>
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"] }}
            transition={{ duration: LENGTH, ease: "linear", repeat: Infinity }}
          >
            <Bars color="#2563EB" />
          </motion.div>
        </div>
        <div className="mt-[1.4cqw] flex justify-between font-mono text-[2cqw] text-[#6b7280]">
          <span>0:{String(sec).padStart(2, "0")}</span>
          <span>0:0{LENGTH}</span>
        </div>
      </div>
    </div>
    </MotionConfig>
  );
}
