"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  avatarSrc?: string;
  className?: string;
  quoteClassName?: string;
  authorClassName?: string;
  roleClassName?: string;
  index?: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  avatarSrc,
  className,
  quoteClassName,
  authorClassName,
  roleClassName,
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6",
        "hover:bg-white/10 transition-all duration-300",
        className
      )}
    >
      {/* Quote mark decoration */}
      <div className="absolute top-4 right-4 text-4xl text-foreground/10 font-serif">
        "
      </div>

      <div className="relative z-10">
        <p
          className={cn(
            "text-lg mb-6 text-gray-700 dark:text-gray-300",
            quoteClassName
          )}
        >
          "{quote}"
        </p>

        <div className="flex items-center">
          {avatarSrc && (
            <div className="mr-4 w-12 h-12 rounded-full overflow-hidden">
              <img
                src={avatarSrc}
                alt={author}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div>
            <h4
              className={cn(
                "font-semibold",
                authorClassName
              )}
            >
              {author}
            </h4>

            {role && (
              <p
                className={cn(
                  "text-sm text-gray-600 dark:text-gray-400",
                  roleClassName
                )}
              >
                {role}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl opacity-30" />
    </motion.div>
  );
};

export default TestimonialCard;
