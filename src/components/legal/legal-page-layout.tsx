"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { IconChevronRight } from "@tabler/icons-react";

interface LegalPageLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  lastUpdated?: string;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  children,
  title,
  description,
  lastUpdated,
}) => {
  return (
    <AnimatedGradientBackground
      colors={["#0ea5e9", "#6366f1", "#8b5cf6", "#d946ef"]}
      className="absolute inset-0"
      containerClassName="min-h-screen"
      blur={150}
      speed={30}
      opacity={0.05}
    >
      <div className="min-h-screen">
        <Navbar />

        <main className="pt-28 pb-12 px-4"> {/* Added more top padding to account for fixed navbar */}
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <div className="mb-8">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li className="inline-flex items-center">
                    <Link
                      href="/"
                      className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <IconChevronRight size={16} className="text-gray-400" />
                      <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                        {title}
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {description}
              </p>
              {lastUpdated && (
                <p className="text-sm text-gray-500 mt-2">
                  Last updated: {lastUpdated}
                </p>
              )}
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              {children}
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedGradientBackground>
  );
};

export default LegalPageLayout;
