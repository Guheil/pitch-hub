"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  className?: string;
  stepClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  isActive?: boolean;
}

export const StepCard: React.FC<StepCardProps> = ({
  step,
  title,
  description,
  className,
  stepClassName,
  titleClassName,
  descriptionClassName,
  isActive = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: step * 0.1 }}
      viewport={{ once: true }}
      className={cn(
        "relative p-6 rounded-xl border",
        isActive
          ? "border-foreground/20 bg-foreground/5"
          : "border-foreground/10 hover:border-foreground/20 bg-transparent hover:bg-foreground/5",
        "transition-all duration-300 group",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full mb-4 text-lg font-bold",
          isActive
            ? "bg-foreground text-background"
            : "bg-foreground/10 text-foreground group-hover:bg-foreground group-hover:text-background",
          "transition-colors duration-300",
          stepClassName
        )}
      >
        {step}
      </div>

      <h3
        className={cn(
          "text-xl font-semibold mb-2",
          titleClassName
        )}
      >
        {title}
      </h3>

      <p
        className={cn(
          "text-gray-600 dark:text-gray-400",
          descriptionClassName
        )}
      >
        {description}
      </p>

      {isActive && (
        <motion.div
          layoutId="activeStep"
          className="absolute inset-0 border border-foreground/20 rounded-xl"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.div>
  );
};

export default StepCard;
