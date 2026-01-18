"use client";

import * as React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ShieldCheck } from "lucide-react";

import { cn } from "../../lib/utils";

type MotionDivProps = React.ComponentPropsWithoutRef<typeof motion.div>;

type ProductCardProps = Omit<MotionDivProps, "children"> & {
  imageUrl: string;
  title: string;
  specifications: string[];
  price: number;
  isAssured: boolean;
  bankOffer: string;
};

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      imageUrl,
      title,
      specifications,
      price,
      isAssured,
      bankOffer,
      ...props
    },
    ref
  ) => {
    const formatNumber = (num: number) =>
      new Intl.NumberFormat("en-AU").format(num);

    const cardVariants: Variants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      },
    };

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
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1.5fr] gap-6 items-start">
          {/* Column 1: Image */}
          <div className="flex flex-col items-center gap-4">
            {/* Mobile image */}
            <div className="relative w-full md:hidden aspect-[16/9] rounded-xl bg-black/40 overflow-hidden">
              <Image
                src="/images/productk8.png"
                alt={`${title} schematic`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Desktop image */}
            <div className="relative hidden md:block w-full aspect-square max-w-[200px] mx-auto overflow-hidden rounded-lg">
              <Image
                src={imageUrl}
                alt={title}
                width={200}
                height={200}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </div>

          {/* Column 2: Product Details */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">{title}</h2>

            <div className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium w-fit">
              <ShieldCheck className="h-4 w-4" strokeWidth={2} />
              Contact for Procurement
            </div>

            <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground pt-2">
              {specifications.map((spec, index) => (
                <li key={`${spec}-${index}`}>{spec}</li>
              ))}
            </ul>
          </div>

          {/* Column 3: Pricing */}
          <div className="flex flex-col gap-2">
            {/* Price + currency */}
            <div className="flex items-center gap-2">
              <h3 className="text-3xl font-bold">
                ${formatNumber(price)}
              </h3>
              <span className="text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                AUD
              </span>
            </div>

            {isAssured && (
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                ISO 9001 · ISO 13485 · ISO 14001
              </p>
            )}

            <p className="text-sm font-medium text-green-600 mt-2">
              {bankOffer}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }
);

ProductCard.displayName = "ProductCard";

export { ProductCard };
