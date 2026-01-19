"use client";

import * as React from "react";

type MarqueeProps = React.HTMLAttributes<HTMLDivElement> & {
  text: string;
  repeat?: number;
  duration?: number; // seconds
  className?: string;
};

export function Marquee({
  text,
  repeat = 14,
  duration = 18,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div className={className} {...props}>
      <div
        className="marquee-motion flex w-max whitespace-nowrap will-change-transform"
        style={{ animation: `marquee ${duration}s linear infinite` }}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <span
            key={i}
            className="px-8 font-semibold tracking-tight leading-none text-transparent text-[72px] [WebkitTextStroke:1px_rgba(140,140,140,0.55)]"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
