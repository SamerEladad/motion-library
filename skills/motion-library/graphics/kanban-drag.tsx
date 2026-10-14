import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Kanban drag: a cursor lifts a card out of "To do" and drops it into "Done"; the Done counter ticks up.
// Loops every 7s. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 7000;
const D = 5;

const Cursor = () => (
  <svg viewBox="0 0 24 24" className="h-[4.4cqw] w-[4.4cqw] drop-shadow-md" aria-hidden="true">
    <path d="M5 3l14 8-6.2 1.7L10 19z" fill="#111111" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const Card = ({ children, color }: { children: string; color: string }) => (
  <div className="flex h-[8cqw] w-[20cqw] items-center gap-[1.2cqw] rounded-[1.4cqw] border border-black/10 bg-white px-[1.6cqw] shadow-[0_0.6cqw_2cqw_rgba(0,0,0,0.08)]">
    <span className="h-[2.4cqw] w-[0.7cqw] rounded-full" style={{ background: color }} />
    <span className="text-[2.2cqw] font-semibold text-[#111111]">{children}</span>
  </div>
);

export default function KanbanDrag() {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);
  const cols = ["To do", "Doing", "Done"];

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
        style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
      >
      <motion.div key={cycle} initial={false} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }} className="relative h-[34cqw] w-[66cqw]">
        {cols.map((c, i) => (
          <div key={c} className="absolute top-0 h-full w-[20cqw] rounded-[1.8cqw] bg-black/5" style={{ left: `${i * 23}cqw` }}>
            <div className="flex items-center justify-between px-[1.8cqw] pt-[1.6cqw] text-[2.2cqw] font-bold text-[#6b7280]">
              {c}
              <span className="relative h-[3cqw] w-[3cqw] overflow-hidden rounded-full bg-white text-center text-[2cqw] leading-[3cqw]">
                {i === 2 ? (
                  <>
                    <motion.span className="absolute inset-0" animate={{ opacity: [1, 1, 0, 0], y: ["0cqw", "0cqw", "-3cqw", "-3cqw"] }} transition={{ duration: D, times: [0, 0.6, 0.64, 1] }}>
                      1
                    </motion.span>
                    <motion.span className="absolute inset-0" animate={{ opacity: [0, 0, 1, 1], y: ["3cqw", "3cqw", "0cqw", "0cqw"] }} transition={{ duration: D, times: [0, 0.6, 0.64, 1] }}>
                      2
                    </motion.span>
                  </>
                ) : (
                  i === 0 ? 2 : 1
                )}
              </span>
            </div>
          </div>
        ))}
        <div className="absolute left-[0cqw] top-[7cqw] flex flex-col gap-[1.6cqw]">
          <div className="ml-0"><Card color="#7C3AED">Plan launch</Card></div>
          <div className="h-[8cqw] w-[20cqw] rounded-[1.4cqw] border-[0.3cqw] border-dashed border-black/15" />
        </div>
        <div className="absolute left-[23cqw] top-[7cqw]"><Card color="#F59E0B">Design page</Card></div>
        <div className="absolute left-[46cqw] top-[7cqw]"><Card color="#16A34A">Write copy</Card></div>
        <motion.div
          className="absolute left-0 top-[16.6cqw]"
          animate={{
            x: ["0cqw", "0cqw", "0cqw", "46cqw", "46cqw", "46cqw"],
            y: ["0cqw", "0cqw", "-2cqw", "-2cqw", "0cqw", "0cqw"],
            rotate: [0, 0, -3, -3, 0, 0],
            scale: [1, 1, 1.06, 1.06, 1, 1],
          }}
          transition={{ duration: D, times: [0, 0.16, 0.24, 0.6, 0.68, 1], ease: "easeInOut" }}
        >
          <Card color="#2563EB">Record video</Card>
        </motion.div>
        <motion.div
          className="absolute left-0 top-0"
          animate={{
            x: ["14cqw", "9cqw", "9cqw", "55cqw", "55cqw", "62cqw"],
            y: ["34cqw", "21cqw", "19cqw", "19cqw", "21cqw", "34cqw"],
            opacity: [0, 1, 1, 1, 1, 0],
          }}
          transition={{ duration: D, times: [0, 0.16, 0.24, 0.6, 0.68, 1], ease: "easeInOut" }}
        >
          <Cursor />
        </motion.div>
      </motion.div>
    </div>
    </MotionConfig>
  );
}
