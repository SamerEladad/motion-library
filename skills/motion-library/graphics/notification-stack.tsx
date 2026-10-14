import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Notification stack: alerts drop in from the top one at a time and push the older ones down.
// Loops every 6.5s. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 6500;
const ITEMS = [
  { app: "Messages", title: "Maya", body: "Lunch at 1?", color: "#16A34A", at: 0.5 },
  { app: "Calendar", title: "Design review", body: "Starts in 10 minutes", color: "#EF4444", at: 1.6 },
  { app: "Mail", title: "Invoice paid", body: "$2,400 from Northwind", color: "#2563EB", at: 2.7 },
];

export default function NotificationStack() {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    const timers = ITEMS.map((item, n) => setTimeout(() => setCount(n + 1), item.at * 1000));
    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
        style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
      >
      <motion.div key={cycle} initial={{ opacity: 1 }} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }} className="relative h-[44cqw] w-[64cqw]">
        {ITEMS.map((n, i) => {
          const shown = i < count;
          const depth = count - 1 - i;
          return (
            <motion.div
              key={n.title}
              className="absolute inset-x-0 top-0 flex h-[11.5cqw] items-center gap-[2.4cqw] rounded-[2.6cqw] border border-black/10 bg-white px-[2.4cqw] shadow-[0_1.4cqw_4cqw_rgba(0,0,0,0.10)]"
              initial={{ y: "-16cqw", opacity: 0, scale: 0.96 }}
              animate={shown ? { y: `${depth * 13.5}cqw`, opacity: 1 - depth * 0.12, scale: 1 } : { y: "-16cqw", opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <span className="h-[7cqw] w-[7cqw] shrink-0 rounded-[1.8cqw]" style={{ background: n.color }} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-[2.9cqw] font-bold text-[#111111]">{n.title}</span>
                  <span className="text-[2cqw] text-[#6b7280]">now</span>
                </div>
                <div className="truncate text-[2.5cqw] text-[#6b7280]">{n.body}</div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
    </MotionConfig>
  );
}
