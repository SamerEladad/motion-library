import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Email send: the Send button presses, the message folds away, a paper plane flies off and a "sent" pill pops in.
// Loops every 6.5s. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 6500;

export default function EmailSend() {
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
      <motion.div key={cycle} initial={{ opacity: 1 }} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }} className="relative flex items-center justify-center">
        <motion.div
          className="w-[52cqw] rounded-[2.6cqw] border border-black/10 bg-white p-[2.8cqw] shadow-[0_2cqw_6cqw_rgba(0,0,0,0.12)]"
          animate={{ scale: [1, 1, 0.6, 0.6], opacity: [1, 1, 0, 0], y: ["0cqw", "0cqw", "3cqw", "3cqw"] }}
          transition={{ duration: 3.4, times: [0, 0.62, 0.78, 1], ease: "easeInOut" }}
        >
          <div className="text-[2.2cqw] font-bold text-[#6b7280]">New message</div>
          <div className="mt-[1.4cqw] flex items-center gap-[1cqw] border-b border-black/10 pb-[1cqw] text-[2.4cqw]">
            <span className="text-[#9ca3af]">To</span>
            <span className="font-semibold text-[#111111]">maya@northwind.com</span>
          </div>
          <div className="flex items-center gap-[1cqw] border-b border-black/10 py-[1cqw] text-[2.4cqw]">
            <span className="text-[#9ca3af]">Subject</span>
            <span className="font-semibold text-[#111111]">Q3 report</span>
          </div>
          <div className="mt-[1.6cqw] flex flex-col gap-[1cqw]">
            {["100%", "90%", "55%"].map((w, i) => (
              <motion.span
                key={i}
                className="h-[1.4cqw] origin-left rounded-full bg-black/10"
                style={{ width: w }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.2 }}
              />
            ))}
          </div>
          <div className="mt-[2.2cqw] flex justify-end">
            <motion.span
              className="rounded-full bg-[#2563EB] px-[3cqw] py-[1.2cqw] text-[2.5cqw] font-bold text-white"
              animate={{ scale: [1, 1, 0.9, 1] }}
              transition={{ duration: 0.35, delay: 1.9, times: [0, 0.2, 0.5, 1] }}
            >
              Send
            </motion.span>
          </div>
        </motion.div>
        <motion.svg
          viewBox="0 0 24 24"
          className="absolute h-[9cqw] w-[9cqw]"
          fill="#2563EB"
          initial={{ opacity: 0 }}
          animate={{ x: ["0cqw", "8cqw", "46cqw"], y: ["0cqw", "-4cqw", "-34cqw"], rotate: [0, -10, -25], opacity: [0, 1, 0], scale: [0.5, 1.1, 0.7] }}
          transition={{ duration: 1.3, delay: 2.15, times: [0, 0.35, 1], ease: "easeIn" }}
          aria-hidden="true"
        >
          <path d="M2.5 11.2 21 3l-4.2 17.5-5.3-4.6-3 3.2-.2-5.3z" />
        </motion.svg>
        <motion.span
          className="absolute rounded-full bg-[#111111] px-[3.4cqw] py-[1.6cqw] text-[3.2cqw] font-bold text-white"
          initial={{ opacity: 0, scale: 0.6, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 16, delay: 3.4 }}
        >
          ✓ Message sent
        </motion.span>
      </motion.div>
    </div>
    </MotionConfig>
  );
}
