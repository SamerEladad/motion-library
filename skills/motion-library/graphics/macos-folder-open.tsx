import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

// macOS folder open: a cursor glides to a folder, clicks it, a Finder-style window pops open and files list in.
// Loops every 7.5s. Needs: react, motion, tailwindcss v4.
const FILES = [
  { name: "Brand kit", meta: "12 items", color: "#3B82F6", folder: true },
  { name: "Launch video.mp4", meta: "248 MB", color: "#EF4444" },
  { name: "Pitch deck.key", meta: "18 MB", color: "#F59E0B" },
  { name: "Budget.xlsx", meta: "96 KB", color: "#16A34A" },
  { name: "Notes.txt", meta: "2 KB", color: "#6B7280" },
];
const CYCLE_MS = 7500;

const Cursor = () => (
  <svg viewBox="0 0 24 24" className="h-[4.4cqw] w-[4.4cqw] drop-shadow-md" aria-hidden="true">
    <path d="M5 3l14 8-6.2 1.7L10 19z" fill="#111111" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

export default function MacosFolderOpen() {
  const reduce = useReducedMotion();
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden [container-type:inline-size]"
      style={{ background: "linear-gradient(135deg, #C7D2FE 0%, #FBCFE8 55%, #FED7AA 100%)" }}
    >
      <motion.div
        key={cycle}
        initial={false}
        animate={{ opacity: [1, 1, 0] }}
        transition={{ duration: CYCLE_MS / 1000, times: [0, 0.94, 1], ease: "linear" }}
        className="absolute inset-0"
      >
        {/* menu bar */}
        <div className="absolute inset-x-0 top-0 flex h-[3.6cqw] items-center gap-[2.4cqw] bg-white/50 px-[2cqw] text-[1.9cqw] font-medium text-[#111111] backdrop-blur">
          <span className="font-bold">Finder</span>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
        </div>

        {/* folder icon */}
        <motion.div
          className="absolute left-[8cqw] top-[12cqw] flex w-[14cqw] flex-col items-center gap-[0.8cqw]"
          animate={{ scale: reduce ? 1 : [1, 1, 0.9, 1] }}
          transition={{ duration: 0.4, delay: 0, times: [0, 0.4, 0.5, 1] }}
        >
          <svg viewBox="0 0 64 52" className="w-[11cqw] drop-shadow-lg" aria-hidden="true">
            <path d="M4 10a5 5 0 0 1 5-5h16l6 6h24a5 5 0 0 1 5 5v28a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" fill="#2F7DF6" />
            <path d="M4 18a5 5 0 0 1 5-5h46a5 5 0 0 1 5 5v24a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" fill="#5BA4FF" />
          </svg>
          <motion.span
            className="rounded-[0.8cqw] px-[1cqw] py-[0.2cqw] text-[2cqw] font-medium"
            initial={{ backgroundColor: "rgba(37,99,235,0)", color: "#111111" }}
            animate={{ backgroundColor: "rgba(37,99,235,1)", color: "#ffffff" }}
            transition={{ duration: 0.15, delay: 1.5 }}
          >
            Projects
          </motion.span>
        </motion.div>

        {/* window */}
        <motion.div
          className="absolute left-[30cqw] top-[8cqw] w-[62cqw] overflow-hidden rounded-[1.8cqw] bg-white shadow-[0_3cqw_8cqw_rgba(0,0,0,0.28)]"
          style={{ transformOrigin: "0% 25%" }}
          initial={{ opacity: 0, scale: reduce ? 1 : 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 24, delay: 1.7 }}
        >
          <div className="flex h-[5cqw] items-center gap-[1.2cqw] border-b border-black/10 bg-[#F5F5F7] px-[2cqw]">
            <span className="h-[1.7cqw] w-[1.7cqw] rounded-full bg-[#FF5F57]" />
            <span className="h-[1.7cqw] w-[1.7cqw] rounded-full bg-[#FEBC2E]" />
            <span className="h-[1.7cqw] w-[1.7cqw] rounded-full bg-[#28C840]" />
            <span className="ml-[3cqw] text-[2.2cqw] font-semibold text-[#111111]">Projects</span>
          </div>
          <ul className="flex flex-col p-[1.2cqw]">
            {FILES.map((f, i) => (
              <motion.li
                key={f.name}
                className="flex items-center gap-[2cqw] rounded-[1cqw] px-[1.6cqw] py-[1.35cqw]"
                initial={{ opacity: 0, x: reduce ? 0 : -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.3 + i * 0.12, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className="flex h-[4.2cqw] w-[4.2cqw] items-center justify-center rounded-[1cqw] text-[1.8cqw] font-bold text-white"
                  style={{ background: f.color }}
                >
                  {f.folder ? "▤" : f.name.split(".").pop()?.slice(0, 3).toUpperCase()}
                </span>
                <span className="flex-1 text-[2.6cqw] font-medium text-[#111111]">{f.name}</span>
                <span className="text-[2.1cqw] text-[#6b7280]">{f.meta}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* cursor: glides in, clicks the folder, then moves aside */}
        <motion.div
          className="absolute left-0 top-0"
          initial={{ x: "70cqw", y: "52cqw", opacity: 0 }}
          animate={{
            x: ["70cqw", "15cqw", "15cqw", "52cqw", "52cqw"],
            y: ["52cqw", "20cqw", "20cqw", "46cqw", "46cqw"],
            opacity: [0, 1, 1, 1, 1],
          }}
          transition={{ duration: 4.2, delay: 0.2, times: [0, 0.3, 0.42, 0.75, 1], ease: "easeInOut" }}
        >
          <motion.div
            animate={{ scale: [1, 1, 0.82, 1] }}
            transition={{ duration: 0.3, delay: 1.45, times: [0, 0.2, 0.5, 1] }}
          >
            <Cursor />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
