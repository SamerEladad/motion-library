import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Word roll: one word in a pill rolls up and out as the next rolls in, like a slot machine.
// Loops forever, one word every 1.3s. Needs: react, motion, tailwindcss v4.
const WORDS = ["designers", "founders", "creators", "teams"];
const STEP_MS = 1300;

export default function WordRoll() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % WORDS.length), STEP_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
        style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
      >
      <div className="flex flex-col items-center gap-[2.4cqw]">
        <div className="text-[9cqw] font-extrabold leading-none tracking-tight text-[#111111]">Built for</div>
        <div className="relative h-[14cqw] w-[56cqw] overflow-hidden rounded-[3cqw] bg-[#2563EB] shadow-[0_2cqw_5cqw_rgba(37,99,235,0.35)]">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={WORDS[i]}
              className="absolute inset-0 flex items-center justify-center text-[9cqw] font-extrabold leading-none tracking-tight text-white"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              {WORDS[i]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
    </MotionConfig>
  );
}
