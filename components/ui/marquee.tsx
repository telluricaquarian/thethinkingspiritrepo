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
  repeat = 8,
  duration = 36,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div className={className} {...props}>
      <div
        className="marquee-motion flex w-max whitespace-nowrap"
        style={{ animation: `marquee ${duration}s linear infinite` }}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className="px-6">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
