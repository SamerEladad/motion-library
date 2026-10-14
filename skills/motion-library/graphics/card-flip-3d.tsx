import { motion, MotionConfig } from "motion/react";

// 3D card flip: a card tilts, flips around to show its back, holds, then flips home. Pure CSS 3D through motion.
// Loops forever, 6s per flip. Needs: react, motion, tailwindcss v4.

export default function CardFlip3D() {
  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
        style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px", perspective: "120cqw" }}
      >
        <motion.div
          className="relative h-[34cqw] w-[54cqw]"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: [0, 0, 180, 180, 360], rotateX: [8, 0, 0, 0, 8], y: ["0cqw", "-1cqw", "0cqw", "-1cqw", "0cqw"] }}
          transition={{ duration: 6, times: [0, 0.15, 0.4, 0.75, 1], ease: "easeInOut", repeat: Infinity }}
        >
          <div
            className="absolute inset-0 flex flex-col justify-between rounded-[3cqw] p-[3.6cqw] text-white shadow-[0_3cqw_8cqw_rgba(37,99,235,0.45)]"
            style={{ backfaceVisibility: "hidden", background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[3.4cqw] font-extrabold tracking-tight">Northwind</span>
              <span className="text-[2.2cqw] font-semibold opacity-80">PRO</span>
            </div>
            <div className="h-[6cqw] w-[8.4cqw] rounded-[1cqw] bg-[#FCD34D]/90" />
            <div>
              <div className="text-[3.2cqw] font-semibold tracking-[0.18em]">•••• •••• 4242</div>
              <div className="mt-[0.8cqw] text-[2.2cqw] opacity-80">ALEX MORGAN</div>
            </div>
          </div>
          <div
            className="absolute inset-0 overflow-hidden rounded-[3cqw] border border-black/10 bg-white shadow-[0_3cqw_8cqw_rgba(0,0,0,0.18)]"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="mt-[4cqw] h-[6cqw] w-full bg-[#111111]" />
            <div className="flex items-center gap-[3cqw] p-[3.6cqw]">
              <div className="grid h-[11cqw] w-[11cqw] grid-cols-5 gap-[0.4cqw]">
                {Array.from({ length: 25 }).map((_, i) => (
                  <span key={i} className={`rounded-[0.3cqw] ${[0, 1, 3, 4, 5, 9, 11, 12, 14, 15, 19, 20, 21, 23, 24, 7, 17].includes(i) ? "bg-[#111111]" : "bg-black/10"}`} />
                ))}
              </div>
              <div>
                <div className="text-[3cqw] font-extrabold text-[#111111]">Member since 2024</div>
                <div className="mt-[0.6cqw] text-[2.3cqw] text-[#6b7280]">Scan to check in</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
