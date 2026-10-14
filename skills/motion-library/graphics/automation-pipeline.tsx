import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

// Workflow pipeline: four steps activate in order while a dot travels each connector and a check pops.
// Loops every 5s. Needs: react, motion, tailwindcss v4.
const NODES = [
  { label: "Trigger", sub: "New order", color: "#2563EB" },
  { label: "Filter", sub: "Paid only", color: "#F59E0B" },
  { label: "Process", sub: "Generate", color: "#7C3AED" },
  { label: "Done", sub: "Notify team", color: "#16A34A" },
];
const CYCLE_MS = 5000;
const STEP = 0.9;

export default function AutomationPipeline() {
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
      <motion.div key={cycle} initial={{ opacity: 1 }} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }} className="flex w-[90cqw] items-center">
        {NODES.map((n, i) => (
          <div key={n.label} className="flex flex-1 items-center last:flex-none">
            <motion.div
              className="relative flex h-[19cqw] w-[19cqw] shrink-0 flex-col items-center justify-center rounded-[2cqw] border-2 bg-white shadow-[0_1cqw_3cqw_rgba(0,0,0,0.08)]"
              initial={{ borderColor: "rgba(0,0,0,0.08)", scale: reduce ? 1 : 0.85, opacity: 0 }}
              animate={{ borderColor: ["rgba(0,0,0,0.08)", n.color, n.color], scale: 1, opacity: 1 }}
              transition={{
                scale: { type: "spring", stiffness: 260, damping: 18, delay: i * 0.1 },
                opacity: { duration: 0.3, delay: i * 0.1 },
                borderColor: { duration: 0.5, delay: 0.5 + i * STEP, times: [0, 0.5, 1] },
              }}
            >
              <motion.span
                className="absolute -right-[1.2cqw] -top-[1.2cqw] flex h-[4.6cqw] w-[4.6cqw] items-center justify-center rounded-full text-[2.6cqw] font-bold text-white"
                style={{ background: n.color }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 14, delay: 0.8 + i * STEP }}
              >
                ✓
              </motion.span>
              <span className="h-[3.4cqw] w-[3.4cqw] rounded-full" style={{ background: n.color }} />
              <span className="mt-[1.2cqw] text-[3cqw] font-bold text-[#111111]">{n.label}</span>
              <span className="mt-[0.3cqw] text-[2.1cqw] text-[#6b7280]">{n.sub}</span>
            </motion.div>
            {i < NODES.length - 1 && (
              <div className="relative mx-[0.8cqw] h-[0.6cqw] flex-1 rounded-full bg-black/10">
                <motion.span
                  className="absolute inset-y-0 left-0 w-full origin-left rounded-full"
                  style={{ background: NODES[i + 1].color }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: STEP - 0.1, delay: 0.5 + i * STEP + 0.4, ease: "easeInOut" }}
                />
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
