import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Phone tap: a finger taps "Pay now" on a phone, the button presses, and the screen swaps to a success state.
// Loops every 6s. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 6000;
const TAP_AT = 1.5;

export default function PhoneTap() {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    setPaid(false);
    const t = setTimeout(() => setPaid(true), (TAP_AT + 0.35) * 1000);
    return () => clearTimeout(t);
  }, [cycle]);

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
        style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
      >
      <motion.div
        key={cycle}
        initial={false} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }}
        className="relative h-[56cqw] w-[27cqw] rounded-[4.6cqw] bg-[#111111] p-[1cqw] shadow-[0_3cqw_7cqw_rgba(0,0,0,0.3)]"
      >
        <div className="relative h-full w-full overflow-hidden rounded-[3.7cqw] bg-white">
          <div className="absolute left-1/2 top-[1.2cqw] h-[1.8cqw] w-[8cqw] -translate-x-1/2 rounded-full bg-[#111111]" />
          <AnimatePresence initial={false} mode="wait">
            {!paid ? (
              <motion.div
                key="pay"
                className="flex h-full flex-col items-center justify-center px-[2.4cqw]"
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-[2.2cqw] font-medium text-[#6b7280]">Total</div>
                <div className="text-[6.4cqw] font-extrabold leading-tight tracking-tight text-[#111111]">$24.00</div>
                <motion.div
                  className="mt-[3cqw] w-full rounded-[2cqw] bg-[#2563EB] py-[1.8cqw] text-center text-[2.6cqw] font-bold text-white"
                  animate={{ scale: [1, 1, 0.93, 1] }}
                  transition={{ duration: 0.4, delay: TAP_AT, times: [0, 0.2, 0.5, 1] }}
                >
                  Pay now
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                className="flex h-full flex-col items-center justify-center gap-[2cqw]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <div className="flex h-[10cqw] w-[10cqw] items-center justify-center rounded-full bg-[#16A34A]">
                  <svg viewBox="0 0 24 24" className="h-[5.4cqw] w-[5.4cqw]" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.15 }} />
                  </svg>
                </div>
                <div className="text-[3cqw] font-bold text-[#111111]">Payment sent</div>
              </motion.div>
            )}
          </AnimatePresence>
          {!paid && (
            <motion.span
              className="absolute left-1/2 top-[64%] h-[6cqw] w-[6cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#111111]/25"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.4, 1, 0.8, 1.6] }}
              transition={{ duration: 0.7, delay: TAP_AT - 0.25, times: [0, 0.3, 0.6, 1] }}
            />
          )}
        </div>
      </motion.div>
    </div>
    </MotionConfig>
  );
}
