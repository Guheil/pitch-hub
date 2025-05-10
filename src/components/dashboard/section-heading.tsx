"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconArrowRight } from "@tabler/icons-react";

interface SectionHeadingProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  description,
  icon,
  actionLabel,
  actionHref,
  className,
}) => {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center justify-between mb-6", className)}>
      <div className="flex items-center mb-4 sm:mb-0">
        {icon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mr-3 text-foreground"
          >
            {icon}
          </motion.div>
        )}
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-2xl font-bold"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-gray-600 dark:text-gray-400 text-sm"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>

      {actionLabel && actionHref && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Link
            href={actionHref}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center group"
          >
            {actionLabel}
            <IconArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default SectionHeading;
