"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import TextReveal from "../ui/text-reveal";
import { IconArrowRight } from "@tabler/icons-react";

interface CTASectionProps {
  className?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({ className }) => {
  return (
    <section className={cn("min-h-screen flex items-center py-20 px-4 relative overflow-hidden", className)}>
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="bg-white/10 dark:bg-black/20 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <TextReveal
              text="Ready to Share Your Startup Idea?"
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
              animationType="slide-up"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              Join PitchHub today and connect with investors, collaborators, and fellow entrepreneurs.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/signup"
              className="rounded-full border border-solid border-transparent transition-all flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-base h-12 px-6 w-full sm:w-auto group"
            >
              Create Your Account
              <IconArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/browse"
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-all flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-base h-12 px-6 w-full sm:w-auto"
            >
              Browse Ideas
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 text-center text-sm text-gray-500"
          >
            No credit card required. Free to get started.
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
