import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Chat conversation: messages pop in, a typing indicator bounces, then the reply lands.
// Loops every 9s. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 9000;
const MESSAGES = [
  { from: "me", text: "Can you send the Q3 report?" },
  { from: "them", text: "Sure, sending it over now." },
  { from: "me", text: "You're the best, thanks!" },
  { from: "them", text: "Anytime. Good luck with the pitch!" },
];
// step 1..6 -> how many messages are shown, and whether the typing dots are visible
const STEPS = [
  { at: 0.5, count: 1, typing: false },
  { at: 1.5, count: 1, typing: true },
  { at: 2.8, count: 2, typing: false },
  { at: 4.2, count: 3, typing: false },
  { at: 5.1, count: 3, typing: true },
  { at: 6.4, count: 4, typing: false },
];

export default function ChatConversation() {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);
  const [step, setStep] = useState(-1);

  useEffect(() => {
    setStep(-1);
    const timers = STEPS.map((s, i) => setTimeout(() => setStep(i), s.at * 1000));
    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  const { count, typing } = step < 0 ? { count: 0, typing: false } : STEPS[step];

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
        style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
      >
      <motion.div
        key={cycle}
        initial={false} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }}
        className="flex h-[50cqw] w-[56cqw] flex-col justify-end gap-[1.6cqw] overflow-hidden rounded-[3cqw] border border-black/10 bg-white p-[2.6cqw] shadow-[0_2cqw_6cqw_rgba(0,0,0,0.10)]"
      >
        <AnimatePresence initial={false}>
          {MESSAGES.slice(0, count).map((m) => (
            <motion.div
              key={m.text}
              layout
              className={`max-w-[78%] rounded-[2.6cqw] px-[2.4cqw] py-[1.5cqw] text-[2.7cqw] font-medium ${
                m.from === "me" ? "self-end rounded-br-[0.8cqw] bg-[#2563EB] text-white" : "self-start rounded-bl-[0.8cqw] bg-[#EDEDEA] text-[#111111]"
              }`}
              initial={{ opacity: 0, y: 14, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 340, damping: 24 }}
            >
              {m.text}
            </motion.div>
          ))}
          {typing && (
            <motion.div
              key="typing"
              layout
              className="flex gap-[0.8cqw] self-start rounded-[2.6cqw] rounded-bl-[0.8cqw] bg-[#EDEDEA] px-[2.4cqw] py-[2cqw]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="block h-[1.4cqw] w-[1.4cqw] rounded-full bg-[#9ca3af]"
                  animate={{ y: ["0cqw", "-0.9cqw", "0cqw"] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
    </MotionConfig>
  );
}
