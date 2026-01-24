"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  repeat?: number;
  duration?: number; // seconds
  fontSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  strokeWidth?: string;
  /** Enable a soft fade at the left/right edges */
  fadeEdges?: boolean;
  /** Stroke color for the outlined text */
  strokeColor?: string;
}

const fontSizeClasses: Record<NonNullable<MarqueeProps["fontSize"]>, string> = {
  sm: "text-4xl sm:text-5xl md:text-6xl",
  md: "text-5xl sm:text-6xl md:text-7xl",
  lg: "text-6xl sm:text-7xl md:text-8xl",
  xl: "text-7xl sm:text-8xl md:text-9xl",
  "2xl": "text-8xl sm:text-9xl md:text-[10rem]",
  "3xl": "text-9xl sm:text-[10rem] md:text-[11rem]",
};

export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      className,
      text,
      repeat = 6,
      duration = 32,
      fontSize = "lg",
      strokeWidth = "1px",
      fadeEdges = true,
      strokeColor = "rgb(80 80 80 / 1)", // subtle gray outline for dark UI
      ...props
    },
    ref
  ) => {
    const reduceMotion = useReducedMotion();

    return (
      <div
        ref={ref}
        className={cn("relative w-full overflow-hidden", className)}
        {...props}
        style={{
          ...(fadeEdges
            ? {
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
              }
            : {}),
          ...props.style,
        }}
      >
        <motion.div
          className="flex whitespace-nowrap marquee-motion"
          animate={reduceMotion ? { x: 0 } : { x: ["0%", "-50%"] }}
          transition={
            reduceMotion
              ? undefined
              : {
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  duration,
                }
          }
        >
          {Array.from({ length: repeat }).map((_, index) => (
            <div key={index} className="flex items-center">
              <span
                className={cn(
                  fontSizeClasses[fontSize],
                  "font-semibold text-transparent px-6"
                )}
                style={{
                  WebkitTextStroke: `${strokeWidth} ${strokeColor}`,
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    );
  }
);

Marquee.displayName = "Marquee";
