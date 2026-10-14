import { motion, MotionConfig } from "motion/react";

// Punch zoom: hard punch-ins on the speaker at each beat, a white flash on every cut, and a zoom badge that ticks up.
// Loops forever, 6s per loop. Shown in a 9:16 frame. Needs: react, motion, tailwindcss v4.
const times = [0, 0.15, 0.17, 0.45, 0.47, 0.8, 1];
const base = { duration: 6, times, ease: "linear", repeat: Infinity } as const;

export default function PunchZoom() {
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
        style={{ transformOrigin: "50% 34%" }}
        animate={{ scale: [1, 1, 1.3, 1.3, 1.65, 1.65, 1] }}
        transition={base}
      >
        <svg viewBox="0 0 100 160" className="absolute inset-x-0 bottom-0 h-[78%] w-full" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
            <circle cx="50" cy="60" r="19" fill="#1C1917" />
            <path d="M10 160 C10 112 28 94 50 94 C72 94 90 112 90 160z" fill="#1C1917" />
          </svg>
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.55, 0, 0, 0.55, 0, 0] }}
        transition={{ duration: 6, times: [0, 0.15, 0.16, 0.24, 0.45, 0.46, 0.54, 1], ease: "linear", repeat: Infinity }}
      />
      <div className="absolute left-[2cqw] top-[2cqw] h-[4.6cqw] w-[11cqw] overflow-hidden rounded-full bg-[#111111]">
        {[
          { label: "1.0×", o: [1, 1, 0, 0, 0, 0, 1] },
          { label: "1.3×", o: [0, 0, 1, 1, 0, 0, 0] },
          { label: "1.65×", o: [0, 0, 0, 0, 1, 1, 0] },
        ].map((b) => (
          <motion.span
            key={b.label}
            className="absolute inset-0 flex items-center justify-center text-[2.4cqw] font-bold text-white"
            animate={{ opacity: b.o }}
            transition={base}
          >
            {b.label}
          </motion.span>
        ))}
      </div>
    </div>
      </div>
    </MotionConfig>
  );
}
