import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Code typing: a dark editor window types out a few lines of code with syntax colours, then a Run pill pops in.
// Loops every 9s. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 9000;
const CHAR_MS = 38;
const K = "#C4B5FD"; // keyword
const S = "#86EFAC"; // string
const F = "#93C5FD"; // function
const T = "#E2E8F0"; // text
const LINES: [string, string][][] = [
  [["const ", K], ["agent ", T], ["= ", K], ["createAgent", F], ["({", T]],
  [["  model: ", T], ['"claude"', S], [",", T]],
  [["  tools: [", T], ["search", F], [", ", T], ["email", F], ["],", T]],
  [["});", T]],
  [["", T]],
  [["await ", K], ["agent", T], [".run(", F], ['"Plan my week"', S], [");", T]],
];
const TOTAL = LINES.reduce((n, l) => n + l.reduce((m, t) => m + t[0].length, 0) + 1, 0);

export default function CodeTyping() {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    setChars(0);
    let n = 0;
    let typing: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      typing = setInterval(() => {
        n += 1;
        setChars(n);
        if (n >= TOTAL) clearInterval(typing);
      }, CHAR_MS);
    }, 700);
    return () => {
      clearTimeout(start);
      clearInterval(typing);
    };
  }, [cycle]);

  let left = chars;
  const done = chars >= TOTAL - 1;

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
        style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
      >
      <motion.div
        key={cycle}
        initial={false} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }}
        className="relative w-[64cqw] overflow-hidden rounded-[2.4cqw] bg-[#0F172A] shadow-[0_3cqw_8cqw_rgba(15,23,42,0.45)]"
      >
        <div className="flex items-center gap-[1.1cqw] border-b border-white/10 px-[2cqw] py-[1.6cqw]">
          <span className="h-[1.6cqw] w-[1.6cqw] rounded-full bg-[#FF5F57]" />
          <span className="h-[1.6cqw] w-[1.6cqw] rounded-full bg-[#FEBC2E]" />
          <span className="h-[1.6cqw] w-[1.6cqw] rounded-full bg-[#28C840]" />
          <span className="ml-[2cqw] font-mono text-[2cqw] text-white/50">agent.ts</span>
        </div>
        <div className="px-[2.4cqw] py-[2cqw] font-mono text-[2.7cqw] leading-[1.6]">
          {LINES.map((line, li) => {
            const lineLen = line.reduce((m, t) => m + t[0].length, 0);
            const here = Math.max(0, Math.min(left, lineLen + 1));
            const active = left >= 0 && left <= lineLen && !done;
            let rem = left;
            left -= lineLen + 1;
            return (
              <div key={li} className="flex min-h-[4.3cqw] whitespace-pre">
                <span className="mr-[2cqw] w-[2cqw] select-none text-right text-white/25">{li + 1}</span>
                <span>
                  {line.map(([text, color], ti) => {
                    const take = Math.max(0, Math.min(text.length, rem));
                    rem -= text.length;
                    return (
                      <span key={ti} style={{ color }}>
                        {text.slice(0, take)}
                      </span>
                    );
                  })}
                  {(active || (done && li === LINES.length - 1)) && here >= 0 && (
                    <motion.span
                      className="inline-block h-[3cqw] w-[0.5cqw] translate-y-[0.6cqw] bg-[#60A5FA]"
                      animate={{ opacity: [1, 1, 0, 0] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5, 1] }}
                    />
                  )}
                </span>
              </div>
            );
          })}
        </div>
        <motion.span
          className="absolute bottom-[2cqw] right-[2cqw] rounded-full bg-[#16A34A] px-[2cqw] py-[0.8cqw] text-[2.3cqw] font-bold text-white"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={done ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 340, damping: 16 }}
        >
          ▶ Run
        </motion.span>
      </motion.div>
    </div>
    </MotionConfig>
  );
}
