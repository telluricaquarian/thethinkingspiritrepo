"use client";

import Image from "next/image";
import clsx from "clsx";

export type UsedByItem = {
  name: string;
  handle: string;
  role: string;
  avatarSrc: string;
  verified?: boolean;
};

type UsedByMarqueeProps = {
  items: UsedByItem[];
  duration?: number; // seconds for one full loop
  direction?: "left" | "right";
  className?: string;
};

export function UsedByMarquee({
  items,
  duration = 22,
  direction = "left",
  className,
}: UsedByMarqueeProps) {
  if (!items?.length) return null;

  // Duplicate items for seamless loop
  const loopItems = [...items, ...items];

  return (
    <div
      className={clsx(
        "relative flex items-center gap-3 rounded-md bg-white/5 ring-1 ring-white/10 px-3 py-2 md:px-4 md:py-2.5",
        className
      )}
    >
      {/* Label */}
      <span className="whitespace-nowrap text-xs font-semibold tracking-wide text-green-400/80 md:text-sm">
        Used by:
      </span>

      {/* Scrolling viewport */}
      <div className="relative flex-1 overflow-hidden">
        {/* Track */}
        <div
          className="flex w-max items-center gap-3 will-change-transform"
          style={{
            animation:
              direction === "right"
                ? `used-by-marquee-right ${duration}s linear infinite`
                : `used-by-marquee-left ${duration}s linear infinite`,
          }}
        >
          {loopItems.map((item, idx) => (
            <PersonChip key={`${item.handle}-${idx}`} {...item} />
          ))}
        </div>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black via-black/60 to-transparent" />
      </div>
    </div>
  );
}

function PersonChip({ name, handle, role, avatarSrc, verified }: UsedByItem) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-sm ring-1 ring-white/10">
      {/* Avatar wrapper (NOT clipped) */}
      <div className="relative h-8 w-8 shrink-0">
        {/* Inner circle (clipped) */}
        <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-white/20">
          <Image
            src={avatarSrc}
            alt={name}
            fill
            className="object-cover"
            sizes="32px"
          />
        </div>

        {/* Verified badge (outside the clipped circle) */}
        {verified && (
          <div className="absolute -top-1 -right-1 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-black ring-1 ring-green-400/60">
            {/* swap this to your /images/verified.png if you want */}
            <span className="text-[10px] leading-none text-green-400">✓</span>
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex items-center whitespace-nowrap">
        <span className="font-semibold text-white">{name}</span>
        <span className="px-1 text-white/40">·</span>
        <span className="text-green-400">{handle}</span>
        <span className="px-1 text-white/40">·</span>
        <span className="text-white/55">{role}</span>
      </div>
    </div>
  );
}
