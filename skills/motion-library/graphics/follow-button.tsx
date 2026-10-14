import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Follow button: a cursor taps Follow on a profile card, the button flips to Following and hearts float up.
// Loops every 6s. Shown in a 9:16 frame. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 6000;
const TAP_AT = 1.9;

const Cursor = () => (
  <svg viewBox="0 0 24 24" className="h-[4.4cqw] w-[4.4cqw] drop-shadow-md" aria-hidden="true">
    <path d="M5 3l14 8-6.2 1.7L10 19z" fill="#111111" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

export default function FollowButton() {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    setFollowing(false);
    const t = setTimeout(() => setFollowing(true), TAP_AT * 1000);
    return () => clearTimeout(t);
  }, [cycle]);

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
      <motion.div key={cycle} initial={false} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }} className="absolute inset-0">
        <motion.div
          className="absolute inset-x-[2.4cqw] bottom-[6cqw] flex flex-col gap-[1.6cqw] rounded-[2.2cqw] bg-white p-[2cqw] shadow-[0_1.6cqw_4cqw_rgba(0,0,0,0.3)]"
          initial={{ y: "16cqw", opacity: 0 }}
          animate={{ y: "0cqw", opacity: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 22, delay: 0.3 }}
        >
          <div className="flex items-center gap-[1.6cqw]">
            <span className="h-[5.6cqw] w-[5.6cqw] shrink-0 rounded-full" style={{ background: "linear-gradient(135deg,#F59E0B,#EF4444)" }} />
            <div className="min-w-0">
              <div className="truncate text-[2.3cqw] font-bold text-[#111111]">Alex Morgan</div>
              <div className="truncate text-[2.1cqw] text-[#6b7280]">@alexmorgan</div>
            </div>
          </div>
          <motion.span
            className="relative flex h-[5.8cqw] w-full items-center justify-center overflow-hidden rounded-full text-[2.6cqw] font-bold"
            animate={{ backgroundColor: following ? "#E5E7EB" : "#2563EB", color: following ? "#111111" : "#FFFFFF", scale: following ? [0.94, 1.04, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={following ? "on" : "off"}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {following ? "Following" : "Follow"}
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </motion.div>
        {[-3, 0, 3].map((dx, i) => (
          <motion.span
            key={i}
            className="absolute left-[15cqw] top-[44cqw] text-[3.6cqw] text-[#EF4444]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0], y: ["0cqw", "-14cqw"], x: [`${dx}cqw`, `${dx * 2.4}cqw`] }}
            transition={{ duration: 1.3, delay: TAP_AT + 0.15 + i * 0.18, ease: "easeOut", times: [0, 0.2, 1] }}
          >
            ♥
          </motion.span>
        ))}
        <motion.div
          className="absolute left-0 top-0"
          initial={{ x: "28cqw", y: "58cqw", opacity: 0 }}
          animate={{ x: ["28cqw", "16cqw", "16cqw", "28cqw", "28cqw"], y: ["58cqw", "46cqw", "46cqw", "56cqw", "56cqw"], opacity: [0, 1, 1, 1, 0] }}
          transition={{ duration: 3.4, delay: 0.6, times: [0, 0.4, 0.55, 0.85, 1], ease: "easeInOut" }}
        >
          <Cursor />
        </motion.div>
      </motion.div>
    </div>
      </div>
    </MotionConfig>
  );
}
