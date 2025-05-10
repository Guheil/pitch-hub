"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedGradientBackground from "../ui/animated-gradient-background";
import Spotlight from "../ui/spotlight";
import TextReveal from "../ui/text-reveal";
import { cn } from "@/lib/utils";
import { IconArrowRight } from "@tabler/icons-react";

interface HeroSectionProps {
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  return (
    <AnimatedGradientBackground
      colors={["#0ea5e9", "#6366f1", "#8b5cf6", "#d946ef"]}
      blur={150}
      speed={30}
      opacity={0.15}
      containerClassName={cn("min-h-screen", className)}
    >
      <Spotlight className="min-h-screen flex flex-col items-center justify-center p-4 pt-24">
        <div className="max-w-5xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center px-3 py-1 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm text-sm"
          >
            <span className="bg-foreground text-background text-xs px-2 py-0.5 rounded-full mr-2">
              New
            </span>
            <span>Introducing PitchHub - Share your startup ideas with the world</span>
          </motion.div>

          <TextReveal
            text="Transform Your Ideas into Reality"
            as="h1"
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6"
            animationType="slide-up"
            staggerChildren={0.03}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto"
          >
            PitchHub is a platform where entrepreneurs can submit their startup ideas with pitch videos, and connect with potential investors and collaborators.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-4 items-center justify-center flex-col sm:flex-row"
          >
            <Link
              href="/signup"
              className="rounded-full border border-solid border-transparent transition-all flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-base h-12 px-6 w-full sm:w-auto group"
            >
              Get Started
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
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/20 shadow-xl bg-black/20 backdrop-blur-sm">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl text-white/70">Platform Preview</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Spotlight>
    </AnimatedGradientBackground>
  );
};

export default HeroSection;
