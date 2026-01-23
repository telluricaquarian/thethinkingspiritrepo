"use client";

import * as React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { UsedByMarquee, type UsedByItem } from "@/components/ui/used-by-marquee";

type MotionDivProps = React.ComponentPropsWithoutRef<typeof motion.div>;

type ProductCardProps = Omit<MotionDivProps, "children"> & {
  imageUrl: string;
  imageUrlMobile?: string;
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
  usedByItems?: UsedByItem[];

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
      usedByItems,
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

    const mobileSrc = imageUrlMobile ?? imageUrl;
    const desktopSrc = imageUrlDesktop ?? imageUrl;

    const enagicPatents = [
      {
        id: "JP2005152847A",
        href: "https://patents.google.com/patent/JP2005152847A/en?oq=JP2005152847A",
      },
      {
        id: "JP2005144418A",
        href: "https://patents.google.com/patent/JP2005144418A/en?oq=JP2005144418A",
      },
      {
        id: "JP2005074388A",
        href: "https://patents.google.com/patent/JP2005074388A/en?oq=JP2005074388A",
      },
      {
        id: "JP2006087987A",
        href: "https://patents.google.com/patent/JP2006087987A/en?oq=JP2006087987A",
      },
    ];

    const researchGateHref =
      "https://www.researchgate.net/publication/307111070_Mathematical_Model_of_Kangen_WaterR_Biophysical_and_Biochemical_Effects_of_Catholyte";

    const showSecondaryCta = accent === "orange" || accent === "green";

    const secondaryCtaClassName =
      accent === "orange"
        ? "rounded-xl border border-[#FF751F] bg-transparent px-7 py-2 text-[18px] font-medium leading-none text-[#FF751F] transition-colors hover:bg-[#FF751F]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF751F]/60"
        : "rounded-xl border border-green-600 bg-transparent px-7 py-2 text-[18px] font-medium leading-none text-green-600 transition-colors hover:bg-green-600/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60";

    const secondaryCtaText =
      secondaryCtaLabel ?? (accent === "orange" ? "Join" : "Inquire");

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
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1.5fr] gap-6">
          {/* Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[520px] rounded-lg bg-black/30 ring-1 ring-white/10 aspect-[16/10] md:aspect-square md:max-w-[200px] overflow-hidden">
              <Image
                src={mobileSrc}
                alt={title}
                fill
                className="object-cover block md:hidden"
                priority
              />
              <Image
                src={desktopSrc}
                alt={title}
                fill
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
                "inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium text-white w-fit",
                accentClasses.bg
              )}
            >
              <ShieldCheck className="h-4 w-4" />
              {ctaLabel ?? "Contact for Procurement"}
            </div>

            {toolingLine && (
              <p className="text-sm text-muted-foreground">{toolingLine}</p>
            )}

            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              {specifications.map((spec, i) => (
                <li key={i}>{spec}</li>
              ))}
            </ul>
          </div>

          {/* Pricing */}
          <div className="flex flex-col gap-2">
            {formattedPrice && (
              <div className="flex items-center gap-2">
                <h3 className="text-3xl font-bold">{formattedPrice}</h3>
                {currencyLabel && (
                  <span className={cn("text-xs px-2 py-0.5 rounded-full", accentClasses.pill)}>
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

                {accent === "green" && (
                  <>
                    <p className="text-xs text-white/40 tracking-wide mt-2">
                      Protected by multiple Enagic patents
                    </p>

                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {enagicPatents.map((p, i) => (
                        <React.Fragment key={p.id}>
                          <a
                            href={p.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-4 decoration-white/15 hover:decoration-white/40"
                          >
                            {p.id}
                          </a>
                          {i < enagicPatents.length - 1 && " · "}
                        </React.Fragment>
                      ))}
                    </p>

                    {/* ✅ MOBILE-ONLY ACADEMIC REFERENCE */}
                    <div className="mt-3 md:hidden">
                      <p className="text-xs text-white/40 tracking-wide">
                        Medical biophysics & mathematical modelling
                      </p>
                      <a
                        href={researchGateHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-xs uppercase tracking-wide text-muted-foreground underline underline-offset-4 decoration-white/15 hover:decoration-white/40"
                      >
                        Medical Biophysics · Mathematical Model of Kangen Water®
                        <br />
                        ISSN 2225-0638 · Vol. 51 (2016)
                      </a>
                    </div>
                  </>
                )}
              </>
            )}

            {bankOffer && (
              <p className={cn("text-sm font-medium mt-2", accentClasses.text)}>
                {bankOffer}
              </p>
            )}
          </div>
        </div>

        {usedByItems?.length && (
          <div className="mt-4">
            <UsedByMarquee items={usedByItems} duration={22} direction="left" />
          </div>
        )}

        {showSecondaryCta && (
          <div className="mt-4 flex justify-start md:justify-end">
            <button
              type="button"
              onClick={onSecondaryCtaClick}
              className={secondaryCtaClassName}
            >
              {secondaryCtaText}
            </button>
          </div>
        )}
      </motion.div>
    );
  }
);

ProductCard.displayName = "ProductCard";
export { ProductCard };
