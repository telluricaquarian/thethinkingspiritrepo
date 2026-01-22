"use client";

import * as React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { UsedByMarquee, type UsedByItem } from "@/components/ui/used-by-marquee";

type MotionDivProps = React.ComponentPropsWithoutRef<typeof motion.div>;

type ProductCardProps = Omit<MotionDivProps, "children"> & {
  /** Backwards-compatible single image (used as fallback for both mobile + desktop) */
  imageUrl: string;

  /** Optional: mobile-specific image (16:10) */
  imageUrlMobile?: string;

  /** Optional: desktop-specific image (square-safe) */
  imageUrlDesktop?: string;

  title: string;
  specifications: string[];
  price?: number;
  priceLabel?: string;
  currencyLabel?: string;
  isAssured?: boolean;
  bankOffer?: string;
  ctaLabel?: string;
  toolingLine?: string;
  accent?: "green" | "orange" | (string & {});
  usedByItems?: UsedByItem[]; // ✅ NEW

  /** ✅ NEW: secondary CTA (used for the orange service card "Join" button) */
  secondaryCtaLabel?: string;
  onSecondaryCtaClick?: () => void;
};

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      imageUrl,
      imageUrlMobile,
      imageUrlDesktop,
      title,
      specifications,
      price,
      priceLabel,
      currencyLabel,
      isAssured,
      bankOffer,
      ctaLabel,
      toolingLine,
      accent = "green",
      usedByItems, // ✅ pull out so it doesn't get forwarded to DOM
      secondaryCtaLabel,
      onSecondaryCtaClick,
      ...props
    },
    ref
  ) => {
    const formatNumber = (num: number) =>
      new Intl.NumberFormat("en-AU").format(num);

    const accentClasses =
      accent === "orange"
        ? {
            bg: "bg-[#FF751F]",
            text: "text-[#FF751F]",
            pill: "bg-[#FF751F]/15 text-[#FF751F]",
          }
        : {
            bg: "bg-green-600",
            text: "text-green-600",
            pill: "bg-green-500/10 text-green-500",
          };

    const cardVariants: Variants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      },
    };

    const formattedPrice =
      priceLabel ??
      (typeof price === "number" ? `$${formatNumber(price)}` : "");

    // Fallbacks so you don't have to update all call-sites immediately
    const mobileSrc = imageUrlMobile ?? imageUrl;
    const desktopSrc = imageUrlDesktop ?? imageUrl;

    return (
      <motion.div
        ref={ref}
        className={cn(
          "bg-background text-foreground border rounded-lg overflow-hidden w-full p-4 md:p-6",
          className
        )}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        {...props}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1.5fr] gap-6 items-start md:items-stretch">
          {/* Image */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full max-w-[520px] mx-auto overflow-hidden rounded-lg bg-black/30 ring-1 ring-white/10 aspect-[16/10] md:aspect-square md:max-w-[200px]">
              {/* Mobile image — 16:10 */}
              <Image
                src={mobileSrc}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 200px"
                className="object-cover block md:hidden"
                priority
              />

              {/* Desktop image — square-safe */}
              <Image
                src={desktopSrc}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 200px"
                className="object-cover hidden md:block"
                priority
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">{title}</h2>

            <div
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium w-fit text-white",
                accentClasses.bg
              )}
            >
              <ShieldCheck className="h-4 w-4" strokeWidth={2} />
              {ctaLabel ?? "Contact for Procurement"}
            </div>

            {toolingLine && (
              <p className="text-sm text-muted-foreground">{toolingLine}</p>
            )}

            <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground pt-2">
              {specifications.map((spec, index) => (
                <li key={`${spec}-${index}`}>{spec}</li>
              ))}
            </ul>
          </div>

          {/* Pricing */}
          <div className="flex flex-col gap-2 h-full">
            {formattedPrice && (
              <div className="flex items-center gap-2">
                <h3 className="text-3xl font-bold">{formattedPrice}</h3>
                {currencyLabel && (
                  <span
                    className={cn(
                      "text-xs font-semibold px-2 py-0.5 rounded-full",
                      accentClasses.pill
                    )}
                  >
                    {currencyLabel}
                  </span>
                )}
              </div>
            )}

            {isAssured && (
              <>
                <p className="text-xs text-white/40 tracking-wide">
                  Certified Manufacturing Standards
                </p>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  ISO 9001 · ISO 13485 · ISO 14001
                </p>
              </>
            )}

            {bankOffer && (
              <p className={cn("text-sm font-medium mt-2", accentClasses.text)}>
                {bankOffer}
              </p>
            )}

            {/* ✅ NEW: Stroke-only "Join" button (orange card only) */}
            {accent === "orange" ? (
              <div className="mt-auto flex justify-end pt-4">
                <button
                  type="button"
                  onClick={onSecondaryCtaClick}
                  className="rounded-xl border border-[#FF751F] bg-transparent px-7 py-2 text-[18px] font-medium leading-none text-[#FF751F] transition-colors hover:bg-[#FF751F]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF751F]/60"
                >
                  {secondaryCtaLabel ?? "Join"}
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {/* ✅ Used-by row */}
        {usedByItems?.length ? (
          <div className="mt-4">
            <UsedByMarquee items={usedByItems} duration={22} direction="left" />
          </div>
        ) : null}
      </motion.div>
    );
  }
);

ProductCard.displayName = "ProductCard";

export { ProductCard };
