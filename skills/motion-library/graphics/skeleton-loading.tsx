import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Skeleton loading: grey placeholder blocks shimmer, then the real content fades and slides in.
// Loops every 6s. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 6000;
const LOAD_AT = 2200;

function Block({ className }: { className: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#E5E7EB] ${className}`}>
      <motion.div
        className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/80 to-transparent"
        animate={{ x: ["-100%", "300%"] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default function SkeletonLoading() {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    const t = setTimeout(() => setLoaded(true), LOAD_AT);
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
        className="w-[46cqw] rounded-[2.6cqw] border border-black/10 bg-white p-[2.6cqw] shadow-[0_2cqw_6cqw_rgba(0,0,0,0.10)]"
      >
        <AnimatePresence initial={false} mode="wait">
          {!loaded ? (
            <motion.div key="skeleton" exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="flex flex-col gap-[1.8cqw]">
              <div className="flex items-center gap-[1.6cqw]">
                <Block className="h-[6cqw] w-[6cqw] rounded-full" />
                <div className="flex flex-1 flex-col gap-[0.8cqw]">
                  <Block className="h-[1.8cqw] w-[16cqw] rounded-full" />
                  <Block className="h-[1.4cqw] w-[10cqw] rounded-full" />
                </div>
              </div>
              <Block className="h-[16cqw] w-full rounded-[1.6cqw]" />
              <Block className="h-[1.8cqw] w-full rounded-full" />
              <Block className="h-[1.8cqw] w-[70%] rounded-full" />
            </motion.div>
          ) : (
            <motion.div key="content" className="flex flex-col gap-[1.8cqw]" initial="hidden" animate="show" transition={{ staggerChildren: 0.09 }}>
              {[
                <div key="h" className="flex items-center gap-[1.6cqw]">
                  <span className="h-[6cqw] w-[6cqw] rounded-full" style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }} />
                  <div>
                    <div className="text-[2.5cqw] font-bold text-[#111111]">Maya Chen</div>
                    <div className="text-[2cqw] text-[#6b7280]">2 minutes ago</div>
                  </div>
                </div>,
                <div key="i" className="h-[16cqw] w-full rounded-[1.6cqw]" style={{ background: "linear-gradient(135deg,#FDBA74,#F472B6 60%,#818CF8)" }} />,
                <div key="t" className="text-[2.6cqw] font-bold text-[#111111]">Launch day is here</div>,
                <div key="b" className="text-[2.1cqw] text-[#6b7280]">Everything shipped on time and the team is celebrating.</div>,
              ].map((el) => (
                <motion.div key={el.key} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.35 }}>
                  {el}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
    </MotionConfig>
  );
}
