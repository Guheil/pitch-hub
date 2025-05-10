"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  duration?: number;
  as?: React.ElementType;
  staggerChildren?: number;
  animationType?: "slide-up" | "slide-down" | "fade" | "zoom";
  textClassName?: string;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className,
  once = true,
  delay = 0,
  duration = 0.5,
  as: Component = "div",
  staggerChildren = 0.05,
  animationType = "slide-up",
  textClassName,
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  // Split text into words
  const words = text.split(" ");

  // Animation variants based on type
  const getVariants = () => {
    switch (animationType) {
      case "slide-up":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case "slide-down":
        return {
          hidden: { y: -20, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case "zoom":
        return {
          hidden: { scale: 0.8, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
        };
      default:
        return {
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren, delayChildren: delay },
    },
  };

  const childVariants = getVariants();

  return (
    <Component className={cn("", className)} ref={ref}>
      <motion.span
        className="inline-block"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            className={cn("inline-block", textClassName)}
            variants={childVariants}
            transition={{
              duration,
              ease: [0.2, 0.65, 0.3, 0.9],
            }}
          >
            {word}
            {i !== words.length - 1 && <span className="inline-block" style={{ width: '0.3em' }}></span>}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
};

export default TextReveal;
