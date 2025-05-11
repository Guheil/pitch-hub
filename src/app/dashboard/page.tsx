"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import PitchCard from "@/components/dashboard/pitch-card";
import SectionHeading from "@/components/dashboard/section-heading";
import {
  IconTrendingUp,
  IconClock,
  IconUsers,
  IconBulb,
  IconRocket,
  IconArrowUpRight,
  IconVideo,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandInstagram
} from "@tabler/icons-react";
import { Card } from "@/components/ui/Card";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

// Mock data for startup pitches
const MOCK_PITCHES = [
  {
    id: "1",
    title: "EcoDelivery",
    description: "Sustainable last-mile delivery service using electric vehicles and optimized routes to reduce carbon footprint.",
    category: "Sustainability",
    views: 1245,
    likes: 89,
    createdAt: new Date(2023, 10, 15),
    author: "Alex Johnson",
    authorAvatar: "/avatars/alex.jpg",
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "MindfulAI",
    description: "AI-powered mental health companion that provides personalized support and resources for managing stress and anxiety.",
    category: "Health Tech",
    views: 982,
    likes: 76,
    createdAt: new Date(2023, 11, 2),
    author: "Samantha Lee",
    authorAvatar: "/avatars/samantha.jpg",
    coverImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "UrbanFarm",
    description: "Vertical farming solution for urban environments, enabling local food production with minimal space and water usage.",
    category: "AgTech",
    views: 1567,
    likes: 124,
    createdAt: new Date(2023, 11, 20),
    author: "Michael Chen",
    authorAvatar: "/avatars/michael.jpg",
    coverImage: "https://images.unsplash.com/photo-1581089781785-603411fa81e5?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "LearnLoop",
    description: "Adaptive learning platform that personalizes educational content based on individual learning styles and progress.",
    category: "EdTech",
    views: 876,
    likes: 67,
    createdAt: new Date(2023, 11, 25),
    author: "Priya Patel",
    authorAvatar: "/avatars/priya.jpg",
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "SecureShare",
    description: "Blockchain-based platform for secure document sharing and verification with tamper-proof audit trails.",
    category: "Cybersecurity",
    views: 1102,
    likes: 93,
    createdAt: new Date(2023, 11, 28),
    author: "David Rodriguez",
    authorAvatar: "/avatars/david.jpg",
    coverImage: "https://images.unsplash.com/photo-1496096265110-f83ad7f96608?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "VirtualFit",
    description: "AR-powered virtual fitting room that allows shoppers to try on clothes digitally before purchasing.",
    category: "Retail Tech",
    views: 1320,
    likes: 108,
    createdAt: new Date(2023, 12, 5),
    author: "Emma Wilson",
    authorAvatar: "/avatars/emma.jpg",
    coverImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function Dashboard() {
  // Get unique categories from pitches
  const categories = Array.from(new Set(MOCK_PITCHES.map(pitch => pitch.category)));

  // Sort pitches by views (most viewed)
  const mostViewedPitches = [...MOCK_PITCHES].sort((a, b) => b.views - a.views);

  // Sort pitches by creation date (latest)
  const latestPitches = [...MOCK_PITCHES].sort((a, b) =>
    b.createdAt.getTime() - a.createdAt.getTime()
  );

  // Get trending categories
  const categoryCount = categories.map(category => ({
    name: category,
    count: MOCK_PITCHES.filter(pitch => pitch.category === category).length
  })).sort((a, b) => b.count - a.count);

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
          {/* Welcome Section - Narrative Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Card className="bg-white/50 dark:bg-black/20 backdrop-blur-lg border border-white/20 dark:border-white/10 overflow-hidden">
              <div className="p-8 relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-500/10 to-yellow-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                      <IconBulb size={32} />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold">Welcome back!</h1>
                      <p className="text-gray-600 dark:text-gray-400">Your innovation journey continues here</p>
                    </div>
                  </div>

                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="lead text-xl">
                      PitchHub is where groundbreaking ideas meet opportunity. Explore the latest innovations, connect with fellow entrepreneurs, and discover what&apos;s trending in the startup ecosystem.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <IconRocket className="text-blue-500" size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">Discover Innovations</h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            Browse through a curated collection of the most viewed and latest startup pitches from entrepreneurs around the world.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                          <IconUsers className="text-purple-500" size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-2">Connect & Collaborate</h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            Engage with a community of like-minded innovators, potential investors, and industry experts to bring your ideas to life.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 p-6 rounded-xl border border-blue-500/10 dark:border-purple-500/10 my-6">
                      <p className="italic text-gray-700 dark:text-gray-300">
                        &quot;The best way to predict the future is to create it.&quot; <span className="font-medium">— Peter Drucker</span>
                      </p>
                    </div>

                    <p>
                      Ready to make an impact? Explore trending pitches below or create your own to share with our growing community of {Math.floor(Math.random() * 5000) + 10000}+ innovators and investors.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Trending Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <Card className="bg-white/50 dark:bg-black/20 backdrop-blur-lg border border-white/20 dark:border-white/10 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Trending Categories</h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <IconRocket size={16} />
                    <span>Based on pitch count</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {categoryCount.slice(0, 6).map((category, index) => (
                    <div
                      key={category.name}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/30 dark:bg-black/30 border border-white/10 dark:border-white/5"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-yellow-500/20 text-yellow-500' :
                        index === 1 ? 'bg-gray-500/20 text-gray-500' :
                        index === 2 ? 'bg-amber-500/20 text-amber-500' :
                        'bg-blue-500/20 text-blue-500'
                      }`}>
                        {index < 3 ? (index + 1) : <IconUsers size={18} />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{category.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {category.count} {category.count === 1 ? 'pitch' : 'pitches'}
                        </p>
                      </div>
                      <div className="flex items-center text-blue-500 hover:text-blue-600 transition-colors">
                        <IconArrowUpRight size={18} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Most Viewed Pitches Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <SectionHeading
              title="Most Viewed Pitches"
              icon={<IconTrendingUp size={24} />}
              actionLabel="View All"
              actionHref="/pitches/trending"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mostViewedPitches.slice(0, 3).map((pitch, index) => (
                <PitchCard
                  key={pitch.id}
                  pitch={pitch}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Latest Pitches Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <SectionHeading
              title="Latest Pitches"
              icon={<IconClock size={24} />}
              actionLabel="View All"
              actionHref="/pitches/latest"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPitches.slice(0, 3).map((pitch, index) => (
                <PitchCard
                  key={pitch.id}
                  pitch={pitch}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Entrepreneur's Toolkit Section - Unique Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <SectionHeading
              title="Entrepreneur's Toolkit"
              icon={<IconRocket size={24} />}
              actionLabel="Explore All Resources"
              actionHref="/resources"
            />

            {/* Unique Layout with Theme Support */}
            <div className="relative py-12 px-4 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 backdrop-blur-sm border border-black/5 dark:border-white/5">
              {/* Background decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-3xl"></div>

                {/* Animated dots */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-black/20 dark:bg-white/30 rounded-full"
                      initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        opacity: Math.random() * 0.5 + 0.3
                      }}
                      animate={{
                        x: [
                          Math.random() * 100 + "%",
                          Math.random() * 100 + "%",
                          Math.random() * 100 + "%"
                        ],
                        y: [
                          Math.random() * 100 + "%",
                          Math.random() * 100 + "%",
                          Math.random() * 100 + "%"
                        ],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{
                        duration: Math.random() * 20 + 10,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Main content */}
              <div className="relative z-10">
                <div className="max-w-5xl mx-auto">
                  <div className="flex flex-col md:flex-row gap-8 items-stretch">

                    {/* Left column - Video Masterclass */}
                    <motion.div
                      className="flex-1 group"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="relative h-full p-1 bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 dark:from-blue-600 dark:via-blue-500 dark:to-blue-700 rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 dark:from-blue-600 dark:via-blue-500 dark:to-blue-700 opacity-80 dark:opacity-90"></div>

                        <div className="relative h-full bg-white/20 dark:bg-black/20 backdrop-blur-md p-6 rounded-xl overflow-hidden flex flex-col">
                          {/* Decorative video frames */}
                          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-lg border-4 border-white/20 dark:border-white/10 rotate-12 opacity-30"></div>
                          <div className="absolute -right-2 -top-2 w-16 h-16 rounded-lg border-4 border-white/30 dark:border-white/20 rotate-6 opacity-40"></div>

                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 rounded-xl bg-white/20 dark:bg-white/10 flex items-center justify-center text-white shadow-lg">
                              <IconVideo size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Pitch Masterclass</h3>
                          </div>

                          <p className="text-white/90 mb-6 flex-grow">
                            Learn how to create compelling pitch videos that capture investor attention and effectively communicate your vision.
                          </p>

                          <Link
                            href="/resources/pitch-masterclass"
                            className="self-start py-2 px-4 bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 text-white rounded-xl flex items-center gap-2 transition-all duration-300 group-hover:pl-6"
                          >
                            Watch Now
                            <motion.div
                              initial={{ x: 0 }}
                              animate={{ x: 5 }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }}
                            >
                              <IconArrowUpRight size={18} />
                            </motion.div>
                          </Link>
                        </div>
                      </div>
                    </motion.div>

                    {/* Right column - Two stacked items */}
                    <div className="flex-1 flex flex-col gap-8">
                      {/* Funding Resources */}
                      <motion.div
                        className="flex-1 group"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="relative h-full p-1 bg-gradient-to-br from-purple-500 via-purple-400 to-purple-600 dark:from-purple-600 dark:via-purple-500 dark:to-purple-700 rounded-2xl overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-purple-400 to-purple-600 dark:from-purple-600 dark:via-purple-500 dark:to-purple-700 opacity-80 dark:opacity-90"></div>

                          <div className="relative h-full bg-white/20 dark:bg-black/20 backdrop-blur-md p-6 rounded-xl overflow-hidden flex flex-col">
                            {/* Decorative elements */}
                            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-white/20 dark:border-white/10 opacity-30"></div>
                            <div className="absolute right-8 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-white/30 dark:border-white/20 opacity-40"></div>

                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 rounded-xl bg-white/20 dark:bg-white/10 flex items-center justify-center text-white shadow-lg">
                                <IconRocket size={24} />
                              </div>
                              <h3 className="text-xl font-bold text-white">Funding Resources</h3>
                            </div>

                            <p className="text-white/90 mb-4 flex-grow">
                              Discover grants, angel investors, and crowdfunding platforms for your startup.
                            </p>

                            <Link
                              href="/resources/funding"
                              className="self-start py-2 px-4 bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 text-white rounded-xl flex items-center gap-2 transition-all duration-300 group-hover:pl-6"
                            >
                              Explore Funding
                              <motion.div
                                initial={{ x: 0 }}
                                animate={{ x: 5 }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  repeatType: "reverse"
                                }}
                              >
                                <IconArrowUpRight size={18} />
                              </motion.div>
                            </Link>
                          </div>
                        </div>
                      </motion.div>

                      {/* Mentor Connect */}
                      <motion.div
                        className="flex-1 group"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="relative h-full p-1 bg-gradient-to-br from-amber-500 via-amber-400 to-amber-600 dark:from-amber-600 dark:via-amber-500 dark:to-amber-700 rounded-2xl overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-amber-400 to-amber-600 dark:from-amber-600 dark:via-amber-500 dark:to-amber-700 opacity-80 dark:opacity-90"></div>

                          <div className="relative h-full bg-white/20 dark:bg-black/20 backdrop-blur-md p-6 rounded-xl overflow-hidden flex flex-col">
                            {/* Decorative elements */}
                            <div className="absolute -left-4 bottom-0 w-20 h-20 rounded-tl-3xl border-4 border-white/20 dark:border-white/10 opacity-30"></div>

                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 rounded-xl bg-white/20 dark:bg-white/10 flex items-center justify-center text-white shadow-lg">
                                <IconBulb size={24} />
                              </div>
                              <h3 className="text-xl font-bold text-white">Mentor Connect</h3>
                            </div>

                            <p className="text-white/90 mb-4 flex-grow">
                              Connect with experienced entrepreneurs who can provide guidance and valuable connections.
                            </p>

                            <Link
                              href="/community/mentors"
                              className="self-start py-2 px-4 bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 text-white rounded-xl flex items-center gap-2 transition-all duration-300 group-hover:pl-6"
                            >
                              Find a Mentor
                              <motion.div
                                initial={{ x: 0 }}
                                animate={{ x: 5 }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  repeatType: "reverse"
                                }}
                              >
                                <IconArrowUpRight size={18} />
                              </motion.div>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bento Grid Informative Section */}
          {/*
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <SectionHeading
              title="Startup Ecosystem Insights"
              icon={<IconBulb size={24} />}
              actionLabel="Learn More"
              actionHref="/resources"
            />

            <div className="grid grid-cols-12 gap-4">
              ... All cards in this grid ...
            </div>
          </motion.div>
          */}

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <footer className="py-8 px-4 border-t border-gray-200 dark:border-gray-800">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                      <IconBulb size={24} className="text-blue-500" />
                      <span className="text-xl font-bold">PitchHub</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                      Connecting innovative ideas with the resources they need to thrive. Join our community of entrepreneurs, investors, and industry experts.
                    </p>
                    <div className="flex gap-4">
                      <a
                        href="#"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
                      >
                        <IconBrandTwitter size={20} />
                      </a>
                      <a
                        href="#"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
                      >
                        <IconBrandLinkedin size={20} />
                      </a>
                      <a
                        href="#"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
                      >
                        <IconBrandInstagram size={20} />
                      </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Resources</h3>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href="/resources/pitch-guide"
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
                        >
                          Pitch Guide
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/resources/funding"
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
                        >
                          Funding Resources
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/community/mentors"
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
                        >
                          Find a Mentor
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Company</h3>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href="/about"
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
                        >
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/contact"
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
                        >
                          Contact
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/privacy"
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
                        >
                          Privacy Policy
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-sm text-gray-500 mb-4 md:mb-0">
                    &copy; {new Date().getFullYear()} PitchHub. All rights reserved.
                  </p>
                  <div className="flex gap-6">
                    <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                      Terms
                    </Link>
                    <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                      Privacy
                    </Link>
                    <Link href="/cookies" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                      Cookies
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </motion.div>
        </main>
      </div>
    </AnimatedGradientBackground>
  );
}


