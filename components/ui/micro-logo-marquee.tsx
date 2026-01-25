"use client";

import * as React from "react";
import { UsedByMarquee, type UsedByItem } from "@/components/ui/used-by-marquee";

type LogoItem = {
  src: string;
  alt: string;
};

function toHandle(alt: string) {
  // "@openai" style handle from "OpenAI"
  const slug = alt
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "");
  return `@${slug || "partner"}`;
}

export function MicroLogoMarquee({
  items,
  duration = 26,
  direction = "left",
}: {
  items: LogoItem[];
  duration?: number;
  direction?: "left" | "right";
}) {
  const marqueeItems: UsedByItem[] = React.useMemo(() => {
    return items.map((item) => ({
      name: item.alt,
      handle: toHandle(item.alt),
      role: "Tool",
      avatarSrc: item.src,
    }));
  }, [items]);

  return (
    <UsedByMarquee items={marqueeItems} duration={duration} direction={direction} />
  );
}
