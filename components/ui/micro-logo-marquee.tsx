"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";

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

  return (
    <div
      className={cn(
        "relative mt-3 overflow-hidden rounded-xl border border-white/10 bg-white/5",
        "h-10",
        className
      )}
    >
      {/* Edge fade so it feels tiny + premium */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-transparent to-black/80" />

      <Marquee pauseOnHover className="h-full [--duration:26s]">
        <div className="flex items-center gap-4 px-3">
          {items.map((item, idx) => {
            const content = (
              <div className="flex items-center justify-center">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={18}
                  height={18}
                  loading="lazy"
                  draggable={false}
                  className="opacity-70"
                />
              </div>
            );

            return item.href ? (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.alt}
                className="rounded-md px-2 py-1 transition hover:bg-white/5"
              >
                {content}
              </a>
            ) : (
              <div key={idx} className="px-2 py-1">
                {content}
              </div>
            );
          })}
        </div>
      </Marquee>
    </div>
  );
}
