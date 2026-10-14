import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

// Icon list cascade: rows slide in one by one with their own icon, then a check pops on each.
// Loops every 6s. Needs: react, motion, tailwindcss v4.
const ROWS = [
  { title: "Inbox zero", sub: "Sort 214 emails", color: "#2563EB", path: "M3 7l9 6 9-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" },
  { title: "Plan the week", sub: "12 events synced", color: "#7C3AED", path: "M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" },
  { title: "Publish posts", sub: "5 scheduled", color: "#F59E0B", path: "M4 5h16v11H8l-4 4zM8 9h8M8 12h5" },
  { title: "Track revenue", sub: "Updated live", color: "#16A34A", path: "M4 19V5M4 19h16M8 15l3-4 3 2 5-6" },
];
const CYCLE_MS = 6000;

export default function IconListCascade() {
  const reduce = useReducedMotion();
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
      style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
    >
      <motion.div
        key={cycle}
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 0] }}
        transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }}
        className="flex w-[68cqw] flex-col gap-[1.3cqw]"
      >
        <motion.div
          className="text-[3.4cqw] font-extrabold tracking-tight text-[#111111]"
          initial={{ opacity: 0, y: reduce ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          What I automate
        </motion.div>
        {ROWS.map((r, i) => (
          <motion.div
            key={r.title}
            className="flex items-center gap-[2.4cqw] rounded-[2cqw] border border-black/10 bg-white px-[2.2cqw] py-[1.2cqw] shadow-[0_1cqw_3cqw_rgba(0,0,0,0.07)]"
            initial={{ opacity: 0, x: reduce ? 0 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 230, damping: 22, delay: 0.35 + i * 0.22 }}
          >
            <motion.span
              className="flex h-[5.8cqw] w-[5.8cqw] shrink-0 items-center justify-center rounded-[1.6cqw]"
              style={{ background: r.color }}
              initial={{ scale: reduce ? 1 : 0, rotate: reduce ? 0 : -25 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 15, delay: 0.5 + i * 0.22 }}
            >
              <svg viewBox="0 0 24 24" className="h-[3.2cqw] w-[3.2cqw]" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={r.path} />
              </svg>
            </motion.span>
            <div className="flex-1">
              <div className="text-[3cqw] font-bold text-[#111111]">{r.title}</div>
              <div className="text-[2.2cqw] text-[#6b7280]">{r.sub}</div>
            </div>
            <motion.span
              className="flex h-[4cqw] w-[4cqw] items-center justify-center rounded-full bg-[#DCFCE7] text-[2.4cqw] font-bold text-[#15803D]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 380, damping: 14, delay: 1.7 + i * 0.18 }}
            >
              ✓
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
