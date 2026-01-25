"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { UsedByMarquee } from "@/components/ui/used-by-marquee";

export type LogoItem = {
  src: string;
  alt: string;
  href?: string;
};

export function MicroLogoMarquee({
  items,
  className,
}: {
  items: LogoItem[];
  className?: string;
}) {
  if (!items || items.length === 0) return null;

  // Adapt LogoItem → UsedByMarquee format
  const marqueeItems = items.map((item) => ({
    name: item.alt,
    handle: "",
    role: "",
    avatarSrc: item.src,
  }));

  return (
    <div
      className={cn(
        "relative mt-3 overflow-hidden rounded-xl border border-white/10 bg-white/5 h-10",
        className
      )}
    >
      {/* Edge fade */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-transparent to-black/80" />

      <UsedByMarquee
        items={marqueeItems}
        duration={26}
        direction="left"
      />
    </div>
  );
}

export default MicroLogoMarquee;
