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
  theme?: "dark" | "light";
  className?: string;
};

export function UsedByMarquee({
  items,
  duration = 22,
  direction = "left",
  theme = "dark",
  className,
}: UsedByMarqueeProps) {
  if (!items?.length) return null;

  // Duplicate items for seamless loop
  const loopItems = [...items, ...items];

  const isLight = theme === "light";

  return (
    <div
      className={clsx(
        "relative flex min-w-0 items-center gap-3 rounded-md px-3 py-2 md:px-4 md:py-2.5",
        isLight
          ? "bg-neutral-50 ring-1 ring-neutral-200"
          : "bg-white/5 ring-1 ring-white/10",
        className
      )}
    >
      {/* Label */}
      <span className={clsx(
        "whitespace-nowrap text-xs font-semibold tracking-wide md:text-sm",
        isLight ? "text-blue-600" : "text-green-400/80"
      )}>
        Used by:
      </span>

      {/* Scrolling viewport */}
      <div className="relative min-w-0 flex-1 overflow-hidden">
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
            <PersonChip key={`${item.handle}-${idx}`} theme={theme} {...item} />
          ))}
        </div>

        {/* Edge fades */}
        {isLight ? (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-neutral-50 via-neutral-50/60 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-neutral-50 via-neutral-50/60 to-transparent" />
          </>
        ) : (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black via-black/60 to-transparent" />
          </>
        )}
      </div>
    </div>
  );
}

function PersonChip({ name, handle, role, avatarSrc, verified, theme = "dark" }: UsedByItem & { theme?: "dark" | "light" }) {
  const isLight = theme === "light";
  return (
    <div className={clsx(
      "flex items-center gap-2 rounded-full px-3 py-1.5 text-sm ring-1",
      isLight ? "bg-white ring-neutral-200" : "bg-black/30 ring-white/10"
    )}>
      {/* Avatar wrapper (NOT clipped) */}
      <div className="relative h-8 w-8 shrink-0">
        {/* Inner circle (clipped) */}
        <div className={clsx(
          "relative h-8 w-8 overflow-hidden rounded-full ring-1",
          isLight ? "ring-neutral-200 bg-neutral-100" : "ring-white/20 bg-white/10"
        )}>
          <Image
            src={avatarSrc}
            alt={name}
            fill
            className="object-cover"
            // Reduce pop-in on mobile:
            loading="eager"
            fetchPriority="high"
            // Better candidate selection on mobile DPR:
            sizes="(max-width: 640px) 40px, 32px"
          />
        </div>

        {/* Verified badge (outside the clipped circle) */}
        {verified && (
          <div className={clsx(
            "absolute -top-1 -right-1 z-10 flex h-4 w-4 items-center justify-center rounded-full ring-1",
            isLight ? "bg-white ring-neutral-300" : "bg-black ring-green-400/60"
          )}>
            <Image src="/images/verified.png" alt="Verified" width={10} height={10} className="object-contain" />
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex items-center whitespace-nowrap">
        <span className={clsx("font-semibold", isLight ? "text-neutral-800" : "text-white")}>{name}</span>
        <span className={clsx("px-1", isLight ? "text-neutral-400" : "text-white/40")}>·</span>
        <span className={clsx(isLight ? "text-blue-600" : "text-green-400")}>{handle}</span>
        <span className={clsx("px-1", isLight ? "text-neutral-400" : "text-white/40")}>·</span>
        <span className={clsx(isLight ? "text-neutral-500" : "text-white/55")}>{role}</span>
      </div>
    </div>
  );
}
