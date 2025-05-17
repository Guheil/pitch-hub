'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import DashboardNavbar from '@/components/dashboard/dashboard-navbar';
import UserProfileCard from '@/components/dashboard/UserProfileCard';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';

export default function ProfilePage() {
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
        <DashboardNavbar />

        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Your Profile</h1>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border border-white/20 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <span>Back to Dashboard</span>
                </Link>
              </motion.div>
            </div>
            <UserProfileCard />
          </motion.div>
        </main>
      </div>
    </AnimatedGradientBackground>
  );
}
