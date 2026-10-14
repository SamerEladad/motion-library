import { motion, MotionConfig } from "motion/react";

// Rack focus: the speaker blurs out as a bold headline pulls into sharp focus, then focus swings back.
// Loops forever, 5.5s per loop. Shown in a 9:16 frame. Needs: react, motion, tailwindcss v4.
const times = [0, 0.15, 0.4, 0.75, 1];
const base = { duration: 5.5, times, ease: "easeInOut", repeat: Infinity } as const;

export default function RackFocus() {
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
      <motion.div
        className="absolute inset-0"
        animate={{ filter: ["blur(0px)", "blur(0px)", "blur(9px)", "blur(9px)", "blur(0px)"] }}
        transition={base}
      >
        <svg viewBox="0 0 100 160" className="absolute inset-x-0 bottom-0 h-[78%] w-full" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
            <circle cx="50" cy="60" r="19" fill="#1C1917" />
            <path d="M10 160 C10 112 28 94 50 94 C72 94 90 112 90 160z" fill="#1C1917" />
          </svg>
      </motion.div>
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-[3cqw] text-center"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0, 1, 1, 0],
          filter: ["blur(10px)", "blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"],
          scale: [1.15, 1.15, 1, 1, 0.95],
        }}
        transition={base}
      >
        <div className="text-[2.6cqw] font-bold tracking-[0.25em] text-[#2563EB]">REMEMBER</div>
        <div className="mt-[1cqw] text-[8.6cqw] font-extrabold leading-[0.95] tracking-tight text-[#111111]">
          The big
          <br />
          picture
        </div>
      </motion.div>
    </div>
      </div>
    </MotionConfig>
  );
}
