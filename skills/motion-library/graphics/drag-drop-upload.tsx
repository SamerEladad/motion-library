import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Drag and drop upload: a cursor picks up a file, drags it onto a drop zone, then a progress bar fills and a check pops.
// Loops every 8s. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 8000;
const D = 6; // seconds for the cursor path

const Cursor = () => (
  <svg viewBox="0 0 24 24" className="h-[4.4cqw] w-[4.4cqw] drop-shadow-md" aria-hidden="true">
    <path d="M5 3l14 8-6.2 1.7L10 19z" fill="#111111" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

export default function DragDropUpload() {
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
      <motion.div key={cycle} initial={false} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }} className="relative h-[46cqw] w-[88cqw]">
        {/* drop zone */}
        <motion.div
          className="absolute right-0 top-[2cqw] flex h-[38cqw] w-[44cqw] flex-col items-center justify-center rounded-[3cqw] border-[0.5cqw] border-dashed"
          initial={{ borderColor: "#B8B8B0", backgroundColor: "#FFFFFF" }}
          animate={{
            borderColor: ["#B8B8B0", "#B8B8B0", "#2563EB", "#2563EB", "#B8B8B0", "#B8B8B0"],
            backgroundColor: ["#FFFFFF", "#FFFFFF", "#EFF6FF", "#EFF6FF", "#FFFFFF", "#FFFFFF"],
          }}
          transition={{ duration: D, times: [0, 0.22, 0.3, 0.46, 0.5, 1] }}
        >
          <motion.div
            className="flex flex-col items-center gap-[1cqw]"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: D, times: [0, 0.4, 0.45, 1] }}
          >
            <svg viewBox="0 0 24 24" className="h-[7cqw] w-[7cqw]" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />
            </svg>
            <span className="text-[2.6cqw] font-semibold text-[#111111]">Drop files here</span>
          </motion.div>
          <motion.div
            className="absolute inset-x-[3cqw] flex items-center gap-[2cqw]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 2.9 }}
          >
            <span className="flex h-[7cqw] w-[6cqw] shrink-0 items-center justify-center rounded-[1cqw] bg-[#EF4444] text-[1.8cqw] font-bold text-white">PDF</span>
            <div className="min-w-0 flex-1">
              <div className="text-[2.6cqw] font-semibold text-[#111111]">report.pdf</div>
              <div className="mt-[0.8cqw] h-[1cqw] overflow-hidden rounded-full bg-black/10">
                <motion.div
                  className="h-full origin-left rounded-full bg-[#2563EB]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.3, delay: 3.1, ease: "easeInOut" }}
                />
              </div>
            </div>
            <motion.span
              className="flex h-[4.6cqw] w-[4.6cqw] items-center justify-center rounded-full bg-[#16A34A] text-[2.6cqw] font-bold text-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 380, damping: 14, delay: 4.5 }}
            >
              ✓
            </motion.span>
          </motion.div>
        </motion.div>

        {/* file being dragged */}
        <motion.div
          className="absolute left-[4cqw] top-[10cqw] flex h-[18cqw] w-[14cqw] flex-col items-center justify-center gap-[1cqw] rounded-[2cqw] border border-black/10 bg-white shadow-[0_1.4cqw_4cqw_rgba(0,0,0,0.12)]"
          animate={{
            x: ["0cqw", "0cqw", "0cqw", "48cqw", "48cqw", "48cqw"],
            scale: [1, 1, 1.07, 1.07, 0.6, 0.6],
            opacity: [1, 1, 1, 1, 0, 0],
          }}
          transition={{ duration: D, times: [0, 0.14, 0.2, 0.4, 0.45, 1], ease: "easeInOut" }}
        >
          <span className="flex h-[8cqw] w-[6.4cqw] items-center justify-center rounded-[1cqw] bg-[#EF4444] text-[2cqw] font-bold text-white">PDF</span>
          <span className="text-[2cqw] font-semibold text-[#111111]">report.pdf</span>
        </motion.div>

        {/* cursor */}
        <motion.div
          className="absolute left-0 top-0"
          animate={{
            x: ["30cqw", "10cqw", "10cqw", "58cqw", "58cqw", "80cqw", "80cqw"],
            y: ["44cqw", "22cqw", "22cqw", "22cqw", "22cqw", "40cqw", "40cqw"],
          }}
          transition={{ duration: D, times: [0, 0.14, 0.2, 0.4, 0.5, 0.8, 1], ease: "easeInOut" }}
        >
          <Cursor />
        </motion.div>
      </motion.div>
    </div>
    </MotionConfig>
  );
}
