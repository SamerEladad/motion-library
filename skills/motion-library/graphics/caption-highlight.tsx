import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Caption highlight: word-by-word captions pop in over a speaker and a yellow highlight follows the spoken word.
// Loops forever, one word every 0.48s. Shown in a 9:16 frame. Needs: react, motion, tailwindcss v4.
const WORDS = ["This", "changes", "everything", "you", "know"];
const STEP_MS = 480;

export default function CaptionHighlight() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), STEP_MS);
    return () => clearInterval(id);
  }, []);

  const step = tick % (WORDS.length + 4);
  const shown = Math.min(step, WORDS.length);
  const active = step >= 1 && step <= WORDS.length ? step - 1 : -1;

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
        style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
      >
        <div
          className="relative h-[58cqw] w-[32.6cqw] overflow-hidden rounded-[2.4cqw] shadow-[0_2.4cqw_6cqw_rgba(0,0,0,0.25)]"
          style={{ background: "linear-gradient(180deg, #E7E5E4 0%, #A8A29E 100%)" }}
        >
      <svg viewBox="0 0 100 160" className="absolute inset-x-0 bottom-0 h-[78%] w-full" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
            <circle cx="50" cy="60" r="19" fill="#1C1917" />
            <path d="M10 160 C10 112 28 94 50 94 C72 94 90 112 90 160z" fill="#1C1917" />
          </svg>
      <div className="absolute inset-x-[2.4cqw] bottom-[11cqw] flex flex-wrap justify-center gap-x-[0.8cqw] gap-y-[0.4cqw]">
        {WORDS.map(
          (w, i) =>
            i < shown && (
              <motion.span
                key={w}
                className={`rounded-[0.8cqw] px-[0.9cqw] py-[0.2cqw] text-[4.1cqw] font-extrabold uppercase leading-tight transition-colors duration-150 ${
                  i === active ? "bg-[#FACC15] text-[#111111]" : "text-white [text-shadow:0_0.3cqw_1cqw_rgba(0,0,0,0.6)]"
                }`}
                initial={{ scale: 0.5, opacity: 0, y: 8 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 20 }}
              >
                {w}
              </motion.span>
            ),
        )}
      </div>
    </div>
      </div>
    </MotionConfig>
  );
}
