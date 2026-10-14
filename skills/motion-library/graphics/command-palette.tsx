import { motion, MotionConfig, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

// Command palette: a search overlay opens, a query types itself, and matching results cascade in with the first one selected.
// Loops every 7s. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 7000;
const QUERY = "invoice";
const RESULTS = ["Create invoice", "Invoice templates", "Open invoices", "Invoice settings"];

export default function CommandPalette() {
  const reduce = useReducedMotion();
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    setChars(reduce ? QUERY.length : 0);
    if (reduce) return;
    let n = 0;
    let typing: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      typing = setInterval(() => {
        n += 1;
        setChars(n);
        if (n >= QUERY.length) clearInterval(typing);
      }, 120);
    }, 900);
    return () => {
      clearTimeout(start);
      clearInterval(typing);
    };
  }, [cycle, reduce]);

  const show = chars >= 3;

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
        style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
      >
      <motion.div key={cycle} initial={{ opacity: 1 }} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }} className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 flex flex-col gap-[2cqw] p-[6cqw] opacity-60">
          <div className="h-[3cqw] w-[30cqw] rounded-full bg-black/10" />
          <div className="h-[2cqw] w-[60cqw] rounded-full bg-black/5" />
          <div className="h-[2cqw] w-[48cqw] rounded-full bg-black/5" />
        </div>
        <motion.div
          className="absolute inset-0 bg-[#111111]/25"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="relative w-[64cqw] overflow-hidden rounded-[2.6cqw] border border-black/10 bg-white shadow-[0_3cqw_8cqw_rgba(0,0,0,0.25)]"
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.2 }}
        >
          <div className="flex items-center gap-[1.8cqw] border-b border-black/10 px-[2.6cqw] py-[2.2cqw]">
            <svg viewBox="0 0 24 24" className="h-[3.4cqw] w-[3.4cqw]" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4 4" />
            </svg>
            <span className="flex-1 text-[3.2cqw] font-medium text-[#111111]">
              {QUERY.slice(0, chars)}
              <span className="ml-[0.3cqw] inline-block h-[3.2cqw] w-[0.4cqw] translate-y-[0.5cqw] bg-[#2563EB]" />
            </span>
            <span className="rounded-[0.8cqw] bg-black/5 px-[1.2cqw] py-[0.4cqw] text-[2cqw] font-semibold text-[#6b7280]">⌘K</span>
          </div>
          <div className="flex min-h-[27cqw] flex-col gap-[0.6cqw] p-[1.2cqw]">
            {RESULTS.map((r, i) => (
              <motion.div
                key={r}
                className={`flex items-center justify-between rounded-[1.4cqw] px-[1.8cqw] py-[1.5cqw] text-[2.9cqw] font-medium ${i === 0 ? "bg-[#2563EB] text-white" : "text-[#111111]"}`}
                initial={{ opacity: 0, x: -10 }}
                animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: show ? i * 0.09 : 0, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {r}
                {i === 0 && <span className="text-[2.4cqw] opacity-80">↵</span>}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
    </MotionConfig>
  );
}
