'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import LogoutButton from '@/components/auth/LogoutButton';
import {
  IconUser,
  IconMail,
  IconCalendar,
  IconEdit,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandGithub
} from '@tabler/icons-react';

export default function UserProfileCard() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Card with Cover Image */}
      <motion.div
        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-white/20 dark:border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Cover Image */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        {/* Profile Content */}
        <div className="relative px-6 pb-6">
          {/* Avatar */}
          <div className="relative -mt-16 mb-4 flex justify-between items-end">
            <div className="relative w-32 h-32 rounded-xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
              {currentUser.photoURL ? (
                <Image
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'User'}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                  <IconUser size={64} />
                </div>
              )}
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/dashboard/profile/edit"
                className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border border-white/20 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"
              >
                <IconEdit size={18} />
                <span>Edit Profile</span>
              </Link>
            </motion.div>
          </div>

          {/* User Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {currentUser.displayName || 'User'}
              </h2>
              <div className="flex items-center mt-1 text-gray-600 dark:text-gray-400">
                <IconMail size={16} className="mr-2" />
                <span>{currentUser.email}</span>
              </div>
              <div className="flex items-center mt-1 text-gray-600 dark:text-gray-400">
                <IconCalendar size={16} className="mr-2" />
                <span>Joined {currentUser.metadata.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Unknown'}</span>
              </div>
            </div>

            {/* Bio Section */}
            <div className="py-4 px-5 rounded-xl bg-white/50 dark:bg-gray-700/30 backdrop-blur-sm border border-white/20 dark:border-white/5">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">About</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {/* This would come from Firestore in a real implementation */}
                Share a bit about yourself, your interests, and what kind of startup ideas you're passionate about.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors duration-200"
              >
                <IconBrandTwitter size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors duration-200"
              >
                <IconBrandLinkedin size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors duration-200"
              >
                <IconBrandGithub size={20} />
              </motion.a>
            </div>

            {/* Account Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Need help? <Link href="/support" className="text-blue-600 dark:text-blue-400 hover:underline">Contact support</Link>
              </span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-5 border border-white/20 dark:border-white/10 shadow-md"
        >
          <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">Pitches</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">0</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Startup ideas shared</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-5 border border-white/20 dark:border-white/10 shadow-md"
        >
          <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">Saved</h3>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">0</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pitches bookmarked</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-5 border border-white/20 dark:border-white/10 shadow-md"
        >
          <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">Comments</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">0</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Feedback provided</p>
        </motion.div>
      </div>
    </div>
  );
}
