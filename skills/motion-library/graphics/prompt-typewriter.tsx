import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

// Prompt typewriter: a prompt types into an input with a blinking cursor, then the reply card slides in.
// Loops every 7s. Needs: react, motion, tailwindcss v4.
const PROMPT = "Turn my meeting notes into 3 action items";
const REPLY = ["Send the pricing deck to Maya", "Book the Friday client call", "Draft the launch email"];
const CHAR_MS = 42;
const CYCLE_MS = 7000;

export default function PromptTypewriter() {
  const reduce = useReducedMotion();
  const [cycle, setCycle] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    setChars(reduce ? PROMPT.length : 0);
    if (reduce) return;
    let n = 0;
    let typing: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      typing = setInterval(() => {
        n += 1;
        setChars(n);
        if (n >= PROMPT.length) clearInterval(typing);
      }, CHAR_MS);
    }, 500);
    return () => {
      clearTimeout(start);
      clearInterval(typing);
    };
  }, [cycle, reduce]);

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const done = chars >= PROMPT.length;
  const hidden = { opacity: 0, y: reduce ? 0 : 16 };

  return (
    <div
      className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
      style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
    >
      <motion.div
        key={cycle}
        initial={false} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }}
        className="flex w-[80cqw] flex-col gap-[2.4cqw]"
      >
        <div className="rounded-[2cqw] border border-black/10 bg-white p-[2.6cqw] shadow-[0_2cqw_5cqw_rgba(0,0,0,0.08)]">
          <p className="min-h-[9cqw] text-[3.3cqw] font-medium leading-[1.4] text-[#111111]">
            {PROMPT.slice(0, chars)}
            <motion.span
              className="ml-[0.4cqw] inline-block h-[3.4cqw] w-[0.5cqw] translate-y-[0.6cqw] bg-[#2563EB]"
              animate={{ opacity: done ? [1, 1, 0, 0] : 1 }}
              transition={done ? { duration: 1, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5, 1] } : { duration: 0 }}
            />
          </p>
        </div>
        <motion.div
          className="rounded-[2cqw] bg-[#111111] p-[2.4cqw] shadow-[0_2cqw_5cqw_rgba(0,0,0,0.18)]"
          initial={hidden}
          animate={done ? { opacity: 1, y: 0 } : hidden}
          transition={{ type: "spring", stiffness: 240, damping: 22 }}
        >
          <ul className="flex flex-col gap-[1.3cqw]">
            {REPLY.map((line, i) => (
              <motion.li
                key={line}
                className="flex items-center gap-[1.5cqw] text-[2.9cqw] text-white"
                initial={{ opacity: 0, x: reduce ? 0 : -10 }}
                animate={done ? { opacity: 1, x: 0 } : { opacity: 0, x: reduce ? 0 : -10 }}
                transition={{ delay: 0.15 + i * 0.14, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="flex h-[3.8cqw] w-[3.8cqw] shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-[2cqw] font-bold">
                  {i + 1}
                </span>
                {line}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}
