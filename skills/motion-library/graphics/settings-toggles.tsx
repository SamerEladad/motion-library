import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Settings toggles: a cursor flips three switches one after another and each knob springs across.
// Loops every 6s. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 6000;
const ROWS = [
  { label: "Wi-Fi", sub: "Home network", on: 0.62 },
  { label: "Notifications", sub: "Banners and sounds", on: 1.32 },
  { label: "Dark mode", sub: "Easier on the eyes", on: 2.08 },
];

const Cursor = () => (
  <svg viewBox="0 0 24 24" className="h-[4.4cqw] w-[4.4cqw] drop-shadow-md" aria-hidden="true">
    <path d="M5 3l14 8-6.2 1.7L10 19z" fill="#111111" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

export default function SettingsToggles() {
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
      <motion.div key={cycle} initial={{ opacity: 1 }} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }} className="relative h-[40cqw] w-[60cqw]">
        <div className="h-full w-full rounded-[3cqw] border border-black/10 bg-white p-[1.5cqw] shadow-[0_2cqw_6cqw_rgba(0,0,0,0.10)]">
          {ROWS.map((r, i) => (
            <div key={r.label} className="flex h-[11cqw] items-center justify-between border-b border-black/5 px-[2cqw] last:border-b-0">
              <div>
                <div className="text-[3cqw] font-bold text-[#111111]">{r.label}</div>
                <div className="text-[2.2cqw] text-[#6b7280]">{r.sub}</div>
              </div>
              <motion.div
                className="flex h-[6cqw] w-[11cqw] items-center rounded-full p-[0.6cqw]"
                initial={{ backgroundColor: "#D4D4D8" }}
                animate={{ backgroundColor: "#2563EB" }}
                transition={{ duration: 0.25, delay: r.on }}
              >
                <motion.span
                  className="block h-[4.8cqw] w-[4.8cqw] rounded-full bg-white shadow-[0_0.4cqw_1cqw_rgba(0,0,0,0.3)]"
                  initial={{ x: "0cqw" }}
                  animate={{ x: "5cqw" }}
                  transition={{ type: "spring", stiffness: 420, damping: 22, delay: r.on }}
                />
              </motion.div>
            </div>
          ))}
        </div>
        <motion.div
          className="absolute left-0 top-0"
          initial={{ x: "58cqw", y: "44cqw", opacity: 0 }}
          animate={{
            x: ["58cqw", "49cqw", "49cqw", "49cqw", "49cqw", "49cqw", "49cqw", "62cqw", "62cqw"],
            y: ["44cqw", "11cqw", "11cqw", "22cqw", "22cqw", "33cqw", "33cqw", "46cqw", "46cqw"],
            opacity: [0, 1, 1, 1, 1, 1, 1, 0, 0],
          }}
          transition={{ duration: 4, delay: 0.1, times: [0, 0.14, 0.22, 0.32, 0.4, 0.5, 0.58, 0.8, 1], ease: "easeInOut" }}
        >
          <Cursor />
        </motion.div>
      </motion.div>
    </div>
    </MotionConfig>
  );
}
