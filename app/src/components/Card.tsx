import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Graphic } from "../registry";
import { DynamicButton } from "./DynamicButton";

const CopyIcon = (
  <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5.5" y="5.5" width="8" height="8" rx="1.8" />
    <path d="M10.5 5.5V4a1.8 1.8 0 0 0-1.8-1.8H4A1.8 1.8 0 0 0 2.2 4v4.7A1.8 1.8 0 0 0 4 10.5h1.5" />
  </svg>
);
const CheckIcon = (
  <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 8.5 6.5 12 13 4.5" />
  </svg>
);

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // file:// pages can lack the async clipboard API — fall back to execCommand
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
}

export function Card({ graphic, prompt, index }: { graphic: Graphic; prompt: () => string; index: number }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { Component } = graphic;
  // Only run a preview while it is on screen: keeps 25+ looping animations light.
  const stage = useRef<HTMLDivElement>(null);
  const visible = useInView(stage, { margin: "150px 0px 150px 0px" });

  useEffect(() => () => clearTimeout(timer.current), []);

  const onCopy = async () => {
    await copyText(prompt());
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-card transition-[border-color,box-shadow] duration-200 ease-out hover:border-dash hover:shadow-lift">
      <div ref={stage} className="relative aspect-[16/10] border-b border-line bg-[#F2F2EE]">
        {visible && <Component />}
        <span className="absolute left-3 top-3 rounded-full border border-dashed border-white/30 bg-canvas/85 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur">
          {graphic.category.toUpperCase()}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-display text-lg font-bold uppercase tracking-[1.5px]">{graphic.title}</h2>
            <span className="font-mono text-xs text-dim">{String(index).padStart(2, "0")}</span>
          </div>
          <p className="text-[15px] leading-relaxed text-muted">{graphic.description}</p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="font-mono text-xs text-dim">{graphic.duration}</span>
          <DynamicButton
            className="!h-9 !rounded-[10px] !px-3.5"
            icon={copied ? CheckIcon : CopyIcon}
            stateKey={copied ? "copied" : "idle"}
            onClick={onCopy}
            aria-label={`Copy prompt for ${graphic.title}`}
          >
            {copied ? "Copied" : "Copy prompt"}
          </DynamicButton>
        </div>
      </div>
    </article>
  );
}
