"use client";

import * as React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Heart, ShieldCheck } from "lucide-react";

import { cn } from "../../lib/utils";
import { Checkbox } from "./checkbox";
import { Button } from "./button";

type MotionDivProps = React.ComponentPropsWithoutRef<typeof motion.div>;

type ProductCardProps = Omit<MotionDivProps, "children"> & {
  imageUrl: string;
  title: string;
  specifications: string[];
  price: number;
  originalPrice: number;
  isAssured: boolean;
  exchangeOffer: string;
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
      originalPrice,
      isAssured,
      exchangeOffer,
      bankOffer,
      ...props
    },
    ref
  ) => {
    const [isWishlisted, setIsWishlisted] = React.useState(false);

    const formatNumber = (num: number) =>
      new Intl.NumberFormat("en-IN").format(num);

    const safeOriginal = originalPrice > 0 ? originalPrice : price;
    const discount =
      safeOriginal > 0
        ? Math.round(((safeOriginal - price) / safeOriginal) * 100)
        : 0;

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
        whileHover={{
          boxShadow: "0px 10px 30px -5px hsl(var(--foreground) / 0.1)",
          y: -5,
        }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1.5fr] gap-6 items-start">
          {/* Column 1: Image */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group w-full aspect-square max-w-[200px] mx-auto overflow-hidden rounded-lg">
              <Image
                src={imageUrl}
                alt={title}
                width={200}
                height={200}
                className="object-cover w-full h-full rounded-lg"
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 rounded-full bg-black/40 backdrop-blur"
                onClick={() => setIsWishlisted((v) => !v)}
                aria-label="Toggle Wishlist"
              >
                <Heart
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isWishlisted
                      ? "fill-red-500 text-red-500"
                      : "text-white"
                  )}
                />
              </Button>
            </div>

            <div className="flex items-center space-x-2 self-start md:self-center pt-4">
              <Checkbox id={`compare-${title}`} />
              <label
                htmlFor={`compare-${title}`}
                className="text-sm font-medium leading-none"
              >
                Add to Compare
              </label>
            </div>
          </div>

          {/* Column 2: Product Details */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">{title}</h2>

            {/* ✅ TRUST BADGE (replaces ratings entirely) */}
            <div className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium w-fit">
              <ShieldCheck className="h-4 w-4" strokeWidth={2} />
              Secure checkout (Stripe soon)
            </div>

            <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground pt-2">
              {specifications.map((spec, index) => (
                <li key={`${spec}-${index}`}>{spec}</li>
              ))}
            </ul>
          </div>

          {/* Column 3: Pricing */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className="text-3xl font-bold">${formatNumber(price)}</h3>
              {isAssured && (
                <ShieldCheck
                  className="h-6 w-6 text-primary"
                  strokeWidth={1.5}
                />
              )}
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground line-through">
                ${formatNumber(safeOriginal)}
              </span>
              <span className="text-green-600 font-semibold">
                {discount}% off
              </span>
            </div>

            <p className="text-sm font-medium mt-2">
              Upto ${exchangeOffer} Off on Exchange
            </p>
            <p className="text-sm font-medium text-green-600">
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
