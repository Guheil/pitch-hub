"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  IconMenu2,
  IconX,
  IconBell,
  IconUser,
  IconLogout,
  IconSettings,
  IconPlus
} from "@tabler/icons-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";
import LogoutButton from "@/components/auth/LogoutButton";

interface DashboardNavbarProps {
  className?: string;
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ className }) => {
  const { currentUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/70 dark:bg-black/70 backdrop-blur-lg shadow-sm"
          : "bg-transparent",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 relative z-20">
            <div className="relative w-7 h-7">
              <Image src="/logo-founder.svg" alt="FoundersFrame Logo" width={28} height={28} />
            </div>
            <span className="text-xl font-bold">FoundersFrame</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/pitches"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              Explore
            </Link>
            <Link
              href="/saved"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              Saved
            </Link>
            <Link
              href="/community/mentors"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              Find a Mentor
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Create Pitch Button */}
            <Link href="/submit-pitch">
              <Button
                variant="primary"
                size="sm"
                className="hidden md:flex"
                leftIcon={<IconPlus size={16} />}
              >
                Create Pitch
              </Button>
            </Link>

            {/* Notifications */}
            <button
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Notifications"
            >
              <IconBell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                  <IconUser size={16} />
                </div>
              </button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-700"
                  >
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium">{currentUser?.displayName || 'User'}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{currentUser?.email || 'user@example.com'}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <IconUser size={16} />
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <IconSettings size={16} />
                        Settings
                      </Link>
                    </div>
                    <div className="py-1">
                      <div
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <IconLogout size={16} />
                        <LogoutButton variant="ghost" size="sm" className="p-0 h-auto text-red-600 dark:text-red-400 hover:bg-transparent" showIcon={false} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative z-20 p-2 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/10 dark:border-white/5 hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <IconX size={24} />
              ) : (
                <IconMenu2 size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="fixed top-[4.5rem] left-4 right-4 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-xl border border-white/20 dark:border-white/10 p-4 z-10 shadow-lg md:hidden"
            >
              <nav className="flex flex-col gap-2">
                <Link
                  href="/dashboard"
                  className="text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/pitches"
                  className="text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Explore
                </Link>
                <Link
                  href="/saved"
                  className="text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Saved
                </Link>
                <Link
                  href="/community/mentors"
                  className="text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Find a Mentor
                </Link>
                <Link
                  href="/dashboard/about"
                  className="text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <div className="border-t border-gray-200 dark:border-gray-800 my-2" />
                <Link href="/submit-pitch">
                  <Button
                    variant="primary"
                    fullWidth={true}
                    leftIcon={<IconPlus size={16} />}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-2 py-3"
                  >
                    Create Pitch
                  </Button>
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default DashboardNavbar;
