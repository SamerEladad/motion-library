import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Testimonial quote: the quote reveals word by word, five stars fill in one at a time, then the author slides in.
// Loops every 7s. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 7000;
const QUOTE = "This saved me ten hours a week. I can't go back.".split(" ");

export default function TestimonialQuote() {
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
      <motion.div
        key={cycle}
        initial={false} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }}
        className="relative w-[62cqw] rounded-[3cqw] border border-black/10 bg-white p-[4cqw] shadow-[0_2cqw_6cqw_rgba(0,0,0,0.10)]"
      >
        <span className="absolute -top-[3cqw] left-[3.4cqw] flex h-[7cqw] w-[7cqw] items-center justify-center rounded-full bg-[#2563EB] text-[6cqw] font-extrabold leading-none text-white">“</span>
        <div className="mt-[2cqw] flex gap-[0.6cqw]">
          {[0, 1, 2, 3, 4].map((s) => (
            <motion.svg
              key={s}
              viewBox="0 0 24 24"
              className="h-[3.6cqw] w-[3.6cqw]"
              initial={{ scale: 0.5, fill: "#E5E7EB" }}
              animate={{ scale: [0.5, 1.3, 1], fill: "#F59E0B" }}
              transition={{ duration: 0.4, delay: 0.3 + s * 0.14, times: [0, 0.6, 1] }}
              aria-hidden="true"
            >
              <path d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.4 6.1 20.7l1.3-6.6L2.5 9.5l6.6-.8z" />
            </motion.svg>
          ))}
        </div>
        <p className="mt-[2cqw] flex flex-wrap gap-x-[1cqw] text-[4.2cqw] font-extrabold leading-[1.2] tracking-tight text-[#111111]">
          {QUOTE.map((w, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 1.1 + i * 0.12 }}>
              {w}
            </motion.span>
          ))}
        </p>
        <motion.div
          className="mt-[3cqw] flex items-center gap-[1.8cqw]"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 2.9 }}
        >
          <span className="h-[6.4cqw] w-[6.4cqw] rounded-full" style={{ background: "linear-gradient(135deg,#F59E0B,#EF4444)" }} />
          <div>
            <div className="text-[2.6cqw] font-bold text-[#111111]">Sara Lindgren</div>
            <div className="text-[2.1cqw] text-[#6b7280]">Founder, Bloom Studio</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
    </MotionConfig>
  );
}
