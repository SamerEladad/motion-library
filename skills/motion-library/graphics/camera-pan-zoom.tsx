import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

// Camera pan and zoom: a virtual camera pushes in on one card, pans to the next, then pulls back out.
// Loops every 8s. Needs: react, motion, tailwindcss v4.
// Camera maths: translate = centre - focus * scale, all in cqw so it scales with the container.
const CYCLE_MS = 8000;
const W = 100;
const H = 62.5;
const SHOTS = [
  { fx: 50, fy: 31, s: 1 }, // wide
  { fx: 24, fy: 19, s: 2.5 }, // card A
  { fx: 74, fy: 22, s: 2.5 }, // card B (pan right)
  { fx: 50, fy: 47, s: 2.2 }, // card C (pan down)
  { fx: 50, fy: 31, s: 1 }, // wide again
];
const CARDS = [
  { cx: 24, cy: 19, title: "Design", value: "128", sub: "files", color: "#2563EB" },
  { cx: 74, cy: 22, title: "Revenue", value: "$9.4k", sub: "this week", color: "#16A34A" },
  { cx: 50, cy: 47, title: "Messages", value: "37", sub: "unread", color: "#F59E0B" },
];

export default function CameraPanZoom() {
  const reduce = useReducedMotion();
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const x = SHOTS.map((p) => `${W / 2 - p.fx * p.s}cqw`);
  const y = SHOTS.map((p) => `${H / 2 - p.fy * p.s}cqw`);
  const scale = SHOTS.map((p) => p.s);

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F2F2EE] [container-type:inline-size]">
      <motion.div
        key={cycle}
        className="absolute left-0 top-0 h-[62.5cqw] w-[100cqw] origin-top-left"
        style={{
          backgroundImage: "radial-gradient(#cfcfc7 0.6cqw, transparent 0.6cqw)",
          backgroundSize: "5cqw 5cqw",
        }}
        initial={{ x: x[0], y: y[0], scale: scale[0], opacity: 0 }}
        animate={
          reduce
            ? { opacity: 1 }
            : { x, y, scale, opacity: [0, 1, 1, 1, 1, 1, 0] }
        }
        transition={{
          x: { duration: 7.2, times: [0, 0.22, 0.5, 0.75, 1], ease: "easeInOut" },
          y: { duration: 7.2, times: [0, 0.22, 0.5, 0.75, 1], ease: "easeInOut" },
          scale: { duration: 7.2, times: [0, 0.22, 0.5, 0.75, 1], ease: "easeInOut" },
          opacity: { duration: 8, times: [0, 0.05, 0.1, 0.5, 0.85, 0.94, 1], ease: "linear" },
        }}
      >
        {CARDS.map((c) => (
          <div
            key={c.title}
            className="absolute flex h-[17cqw] w-[30cqw] -translate-x-1/2 -translate-y-1/2 flex-col justify-between rounded-[2cqw] border border-black/10 bg-white p-[2.4cqw] shadow-[0_1.5cqw_4cqw_rgba(0,0,0,0.10)]"
            style={{ left: `${c.cx}cqw`, top: `${c.cy}cqw` }}
          >
            <div className="flex items-center gap-[1.2cqw]">
              <span className="h-[2.4cqw] w-[2.4cqw] rounded-[0.7cqw]" style={{ background: c.color }} />
              <span className="text-[2.2cqw] font-semibold text-[#111111]">{c.title}</span>
            </div>
            <div>
              <div className="text-[6cqw] font-extrabold leading-none tracking-tight text-[#111111]">{c.value}</div>
              <div className="mt-[0.6cqw] text-[2cqw] text-[#6b7280]">{c.sub}</div>
            </div>
          </div>
        ))}
        {/* connecting lines between cards */}
        <svg viewBox="0 0 100 62.5" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
          <path d="M39 19 H59 M74 31 V36 M50 38 V30 H74" stroke="#cfcfc7" strokeWidth="0.5" strokeDasharray="1.2 1.2" />
        </svg>
      </motion.div>
    </div>
  );
}
