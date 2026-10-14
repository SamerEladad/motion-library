import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Calendar schedule: events drop onto a weekly grid one by one with a little bounce, then the last one is confirmed.
// Loops every 6.5s. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 6500;
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const COL = 15.4; // cqw per day column
const ROW = 7.2; // cqw per hour row
const EVENTS = [
  { day: 0, row: 0, len: 1, title: "Standup", color: "#2563EB" },
  { day: 2, row: 0, len: 2, title: "Workshop", color: "#F59E0B" },
  { day: 1, row: 1, len: 2, title: "Design review", color: "#7C3AED" },
  { day: 3, row: 2, len: 1, title: "1:1", color: "#16A34A" },
  { day: 4, row: 1, len: 2, title: "Launch", color: "#EF4444" },
];

export default function CalendarSchedule() {
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
        initial={{ opacity: 1 }} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }}
        className="rounded-[3cqw] border border-black/10 bg-white p-[2.2cqw] shadow-[0_2cqw_6cqw_rgba(0,0,0,0.10)]"
      >
        <div className="flex" style={{ width: `${COL * 5}cqw` }}>
          {DAYS.map((d) => (
            <div key={d} className="text-center text-[2.4cqw] font-bold text-[#6b7280]" style={{ width: `${COL}cqw` }}>
              {d}
            </div>
          ))}
        </div>
        <div className="relative mt-[1.2cqw]" style={{ width: `${COL * 5}cqw`, height: `${ROW * 4}cqw` }}>
          {DAYS.map((d, i) => (
            <div key={d} className="absolute inset-y-0 border-l border-black/10" style={{ left: `${i * COL}cqw` }} />
          ))}
          {[1, 2, 3].map((r) => (
            <div key={r} className="absolute inset-x-0 border-t border-black/5" style={{ top: `${r * ROW}cqw` }} />
          ))}
          {EVENTS.map((e, i) => (
            <motion.div
              key={e.title}
              className="absolute rounded-[1.4cqw] px-[1.2cqw] py-[0.8cqw] text-[2.2cqw] font-bold text-white"
              style={{
                left: `${e.day * COL + 0.6}cqw`,
                top: `${e.row * ROW + 0.5}cqw`,
                width: `${COL - 1.2}cqw`,
                height: `${e.len * ROW - 1}cqw`,
                background: e.color,
              }}
              initial={{ y: "-10cqw", opacity: 0 }}
              animate={{ y: "0cqw", opacity: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 14, delay: 0.3 + i * 0.35 }}
            >
              {e.title}
              {i === EVENTS.length - 1 && (
                <motion.span
                  className="absolute -right-[1.4cqw] -top-[1.4cqw] flex h-[4.2cqw] w-[4.2cqw] items-center justify-center rounded-full border-[0.4cqw] border-white bg-[#16A34A] text-[2.2cqw]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 380, damping: 14, delay: 2.5 }}
                >
                  ✓
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
    </MotionConfig>
  );
}
