"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  index?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  className,
  iconClassName,
  titleClassName,
  descriptionClassName,
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 group hover:bg-white/10 transition-all duration-300",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div
        className={cn(
          "relative z-10 flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-foreground/10 text-foreground",
          iconClassName
        )}
      >
        {icon}
      </div>

      <h3
        className={cn(
          "relative z-10 text-xl font-semibold mb-2",
          titleClassName
        )}
      >
        {title}
      </h3>

      <p
        className={cn(
          "relative z-10 text-gray-600 dark:text-gray-400",
          descriptionClassName
        )}
      >
        {description}
      </p>

      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default FeatureCard;
