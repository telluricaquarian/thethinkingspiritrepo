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
        whileHover={{
          boxShadow: "0px 10px 30px -5px hsl(var(--foreground) / 0.1)",
          y: -5,
        }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1.5fr] gap-6 items-start">
          {/* Image */}
          <div className="flex justify-center">
            <div className="relative w-full aspect-square max-w-[200px] overflow-hidden rounded-lg">
              <Image
                src={imageUrl}
                alt={title}
                width={200}
                height={200}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">{title}</h2>

            {/* Trust badge */}
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

          {/* Pricing */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h3 className="text-3xl font-bold">${formatNumber(price)}</h3>
              {isAssured && (
                <ShieldCheck
                  className="h-6 w-6 text-primary"
                  strokeWidth={1.5}
                />
              )}
            </div>

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
