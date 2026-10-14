import { motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";

// Pricing cards: three plans rise in one after another, then the middle plan lifts and gets a "Popular" badge.
// Loops every 6.5s. Needs: react, motion, tailwindcss v4.
const CYCLE_MS = 6500;
const PLANS = [
  { name: "Basic", price: "$9", perks: ["1 project", "Email help"] },
  { name: "Pro", price: "$29", perks: ["Unlimited use", "Fast support", "Analytics"] },
  { name: "Team", price: "$79", perks: ["All of Pro", "10 seats", "SSO"] },
];

export default function PricingCards() {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    setFocus(false);
    const t = setTimeout(() => setFocus(true), 1700);
    return () => clearTimeout(t);
  }, [cycle]);

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F2F2EE] [container-type:inline-size]"
        style={{ backgroundImage: "radial-gradient(#d6d6cf 1.2px, transparent 1.2px)", backgroundSize: "20px 20px" }}
      >
      <motion.div key={cycle} initial={{ opacity: 1 }} animate={{ opacity: [1, 1, 0] }} transition={{ duration: CYCLE_MS / 1000, times: [0, 0.92, 1], ease: "linear" }} className="flex items-center gap-[1.6cqw]">
        {PLANS.map((p, i) => {
          const hero = i === 1;
          return (
            <motion.div
              key={p.name}
              className="relative w-[22cqw] rounded-[2.4cqw] border-[0.35cqw] bg-white p-[2.2cqw] shadow-[0_2cqw_5cqw_rgba(0,0,0,0.10)]"
              initial={{ opacity: 0, y: "14cqw", scale: 1, borderColor: "rgba(0,0,0,0.08)" }}
              animate={{
                opacity: focus && !hero ? 0.55 : 1,
                y: "0cqw",
                scale: focus && hero ? 1.1 : 1,
                borderColor: focus && hero ? "#2563EB" : "rgba(0,0,0,0.08)",
              }}
              transition={{ type: "spring", stiffness: 220, damping: 20, delay: focus ? 0 : i * 0.14 }}
            >
              {hero && (
                <motion.span
                  className="absolute -top-[2cqw] left-1/2 -translate-x-1/2 rounded-full bg-[#2563EB] px-[1.6cqw] py-[0.5cqw] text-[1.9cqw] font-bold text-white"
                  initial={{ opacity: 0, y: -8, scale: 0.6 }}
                  animate={focus ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -8, scale: 0.6 }}
                  transition={{ type: "spring", stiffness: 360, damping: 16, delay: 0.1 }}
                >
                  Popular
                </motion.span>
              )}
              <div className="text-[2.4cqw] font-bold text-[#6b7280]">{p.name}</div>
              <div className="mt-[0.4cqw] text-[6.4cqw] font-extrabold leading-none tracking-tight text-[#111111]">{p.price}</div>
              <div className="mt-[2cqw] flex flex-col gap-[1cqw]">
                {p.perks.map((perk) => (
                  <div key={perk} className="flex items-center gap-[1cqw] text-[2cqw] font-medium text-[#111111]">
                    <span className="flex h-[2.4cqw] w-[2.4cqw] shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[1.4cqw] font-bold text-[#15803D]">✓</span>
                    {perk}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
    </MotionConfig>
  );
}
