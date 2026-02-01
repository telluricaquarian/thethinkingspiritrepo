"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type TemplatePromoCardProps = {
  title: string;
  description?: string;
  ctaLabel: string;
  href?: string;
  imageSrc: string;
  className?: string;
  variant?: "compact" | "bentoHero";
};

export function TemplatePromoCard({
  title,
  description,
  ctaLabel,
  href = "#",
  imageSrc,
  className,
  variant = "compact",
}: TemplatePromoCardProps) {
  const isHero = variant === "bentoHero";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md h-full",
        "transition-transform duration-300 hover:scale-[1.01]",
        className
      )}
    >
      {isHero ? (
        <>
          {/* Full-bleed background image */}
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover object-right"
            priority
          />

          {/* Gradient overlay - left fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

          {/* Content overlay */}
          <div className="relative z-10 flex h-full flex-col p-6">
            <div className="max-w-[60%]">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              {description && (
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{description}</p>
              )}
            </div>

            {/* CTA button - bottom right */}
            <a
              href={href}
              className="absolute bottom-4 right-4 rounded-xl border border-white/30 bg-white/15 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/25"
            >
              {ctaLabel}
            </a>
          </div>
        </>
      ) : (
        <>
          {/* Background image */}
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            priority
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Content overlay */}
          <div className="relative z-10 flex h-full flex-col p-4">
            <div className="mt-auto mb-6">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              {description && (
                <p className="mt-1 text-sm text-white/60">{description}</p>
              )}
            </div>

            {/* CTA button - bottom right */}
            <a
              href={href}
              className="absolute bottom-4 right-4 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {ctaLabel}
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default TemplatePromoCard;
