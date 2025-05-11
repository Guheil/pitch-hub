"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import { Card } from "@/components/ui/Card";
import { Card3d } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/Button";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import {
  IconEdit,
  IconSettings,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandGithub,
  IconMail,
  IconMapPin,
  IconCalendar,
  IconBriefcase,
  IconSchool,
  IconTrophy,
  IconHeart,
  IconEye,
  IconMessage,
  IconBulb,
  IconRocket,
  IconArrowUpRight,
  IconPlus,
  IconRefresh,
} from "@tabler/icons-react";

// Mock user data
const USER = {
  id: "1",
  name: "Alex Johnson",
  title: "Entrepreneur & Product Strategist",
  bio: "Passionate about building innovative products that solve real-world problems. 3x founder with experience in SaaS, FinTech, and EdTech.",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3",
  coverImage: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=2070&auto=format&fit=crop",
  location: "San Francisco, CA",
  email: "alex@example.com",
  website: "https://alexjohnson.dev",
  joinedDate: "January 2022",
  socialLinks: {
    twitter: "https://twitter.com/alexjohnson",
    linkedin: "https://linkedin.com/in/alexjohnson",
    github: "https://github.com/alexjohnson",
  },
  stats: {
    pitches: 8,
    followers: 245,
    following: 128,
    likes: 876,
    views: 12540,
  },
  skills: ["Product Strategy", "UX Design", "Growth Marketing", "Fundraising", "Team Building"],
  achievements: [
    { id: 1, title: "Top Contributor", icon: "trophy", date: "2023" },
    { id: 2, title: "Featured Pitch", icon: "star", date: "March 2023" },
    { id: 3, title: "Community Favorite", icon: "heart", date: "June 2023" },
  ],
  experience: [
    {
      id: 1,
      role: "Founder & CEO",
      company: "InnovateTech",
      period: "2020 - Present",
      description: "Leading a team of 15 to build SaaS solutions for small businesses.",
    },
    {
      id: 2,
      role: "Product Manager",
      company: "GrowthCorp",
      period: "2018 - 2020",
      description: "Led product strategy for a B2B platform with 50K+ users.",
    },
    {
      id: 3,
      role: "UX Designer",
      company: "DesignStudio",
      period: "2016 - 2018",
      description: "Designed user experiences for Fortune 500 clients.",
    },
  ],
  education: [
    {
      id: 1,
      degree: "MBA, Entrepreneurship",
      institution: "Stanford University",
      period: "2014 - 2016",
    },
    {
      id: 2,
      degree: "BS, Computer Science",
      institution: "UC Berkeley",
      period: "2010 - 2014",
    },
  ],
};

// Mock pitches data
const USER_PITCHES = [
  {
    id: "1",
    title: "EcoDelivery",
    description: "Sustainable last-mile delivery service using electric vehicles and optimized routes to reduce carbon footprint.",
    category: "Sustainability",
    views: 1245,
    likes: 89,
    createdAt: new Date(2023, 10, 15),
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
    coverImage: "https://images.unsplash.com/photo-1581089781785-603411fa81e5?q=80&w=2070&auto=format&fit=crop",
  },
];

// Activity timeline data
const ACTIVITY_TIMELINE = [
  {
    id: 1,
    type: "pitch_created",
    title: "Created a new pitch",
    content: "EcoDelivery",
    date: "2 days ago",
  },
  {
    id: 2,
    type: "pitch_liked",
    title: "Liked a pitch",
    content: "VirtualFit by Emma Wilson",
    date: "3 days ago",
  },
  {
    id: 3,
    type: "comment_added",
    title: "Commented on a pitch",
    content: "Great idea! Have you considered partnering with local retailers?",
    date: "5 days ago",
  },
  {
    id: 4,
    type: "pitch_created",
    title: "Created a new pitch",
    content: "MindfulAI",
    date: "1 week ago",
  },
  {
    id: 5,
    type: "achievement_earned",
    title: "Earned an achievement",
    content: "Featured Pitch",
    date: "2 weeks ago",
  },
];



export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [profilePicture, setProfilePicture] = useState(USER.avatar);

  // Update profile picture
  const handleProfilePictureChange = (url: string) => {
    setProfilePicture(url);
  };

  // Format date to readable string
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

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
          {/* Profile Header */}
          <div className="relative mb-8">
            {/* Cover Image */}
            <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden">
              <Image
                src={USER.coverImage}
                alt="Cover"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 backdrop-blur-md border-white/20 text-white hover:bg-white/30"
                >
                  <IconEdit size={16} className="mr-1" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 backdrop-blur-md border-white/20 text-white hover:bg-white/30"
                >
                  <IconSettings size={16} className="mr-1" />
                  Settings
                </Button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="relative -mt-24 mx-4 md:mx-8 p-6 rounded-3xl bg-white/70 dark:bg-black/50 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
                {/* Avatar */}
                <div className="relative">
                  <div className="relative -mt-20 md:-mt-24 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                    <Image
                      src={profilePicture}
                      alt={USER.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
                    <div className="group relative">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleProfilePictureChange(`https://source.unsplash.com/random/300x300/?portrait&${Math.random()}`)}
                        className="rounded-full w-8 h-8 p-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <IconRefresh size={14} />
                      </Button>
                      <div className="absolute bottom-full right-0 mb-2 w-32 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <div className="bg-black text-white text-xs rounded py-1 px-2 right-0 bottom-full">
                          Random profile pic
                          <svg className="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold">{USER.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400">{USER.title}</p>

                  <div className="flex flex-wrap gap-4 mt-3">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <IconMapPin size={16} className="mr-1" />
                      {USER.location}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <IconCalendar size={16} className="mr-1" />
                      Joined {USER.joinedDate}
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-2 mt-4 md:mt-0">
                  {USER.socialLinks.twitter && (
                    <a
                      href={USER.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 transition-colors"
                    >
                      <IconBrandTwitter size={20} />
                    </a>
                  )}
                  {USER.socialLinks.linkedin && (
                    <a
                      href={USER.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-blue-700/10 hover:bg-blue-700/20 text-blue-700 transition-colors"
                    >
                      <IconBrandLinkedin size={20} />
                    </a>
                  )}
                  {USER.socialLinks.github && (
                    <a
                      href={USER.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-800/10 hover:bg-gray-800/20 text-gray-800 dark:text-gray-200 transition-colors"
                    >
                      <IconBrandGithub size={20} />
                    </a>
                  )}
                  <a
                    href={`mailto:${USER.email}`}
                    className="p-2 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
                  >
                    <IconMail size={20} />
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6 p-4 bg-white/50 dark:bg-black/20 rounded-xl">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{USER.stats.pitches}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pitches</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{USER.stats.followers}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{USER.stats.following}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Following</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">{USER.stats.likes}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Likes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{USER.stats.views}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Views</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Tabs */}
          <div className="mb-8">
            <div className="flex overflow-x-auto scrollbar-hide space-x-2 border-b border-gray-200 dark:border-gray-700 pb-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                  activeTab === "overview"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("pitches")}
                className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                  activeTab === "pitches"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                Pitches
              </button>
              <button
                onClick={() => setActiveTab("activity")}
                className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                  activeTab === "activity"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                Activity
              </button>
              <button
                onClick={() => setActiveTab("about")}
                className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                  activeTab === "about"
                    ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                About
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-12">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                  {/* Bio Section */}
                  <div className="lg:col-span-2">
                    <Card className="p-6 bg-white/70 dark:bg-black/50 backdrop-blur-md border border-white/20 dark:border-white/10 h-full">
                      <h2 className="text-xl font-bold mb-4">About</h2>
                      <p className="text-gray-700 dark:text-gray-300 mb-6">{USER.bio}</p>

                      <h3 className="text-lg font-semibold mb-3">Skills</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {USER.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-lg font-semibold mb-3">Recent Pitches</h3>
                      <div className="space-y-4">
                        {USER_PITCHES.slice(0, 2).map((pitch) => (
                          <Link href={`/pitches/${pitch.id}`} key={pitch.id}>
                            <div className="flex gap-4 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                <div className="relative w-full h-full">
                                  <Image
                                    src={pitch.coverImage}
                                    alt={pitch.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium">{pitch.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                                  {pitch.description}
                                </p>
                                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 dark:text-gray-500">
                                  <span className="flex items-center">
                                    <IconEye size={14} className="mr-1" />
                                    {pitch.views}
                                  </span>
                                  <span className="flex items-center">
                                    <IconHeart size={14} className="mr-1" />
                                    {pitch.likes}
                                  </span>
                                  <span>{formatDate(pitch.createdAt)}</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                        <Link href="/profile?tab=pitches" className="text-blue-600 dark:text-blue-400 text-sm flex items-center hover:underline mt-2">
                          View all pitches
                          <IconArrowUpRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </Card>
                  </div>

                  {/* Achievements & Activity */}
                  <div className="space-y-8">
                    {/* Achievements */}
                    <Card className="p-6 bg-white/70 dark:bg-black/50 backdrop-blur-md border border-white/20 dark:border-white/10">
                      <h2 className="text-xl font-bold mb-4">Achievements</h2>
                      <div className="space-y-4">
                        {USER.achievements.map((achievement) => (
                          <div key={achievement.id} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                              <IconTrophy size={20} />
                            </div>
                            <div>
                              <p className="font-medium">{achievement.title}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Recent Activity */}
                    <Card className="p-6 bg-white/70 dark:bg-black/50 backdrop-blur-md border border-white/20 dark:border-white/10">
                      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                      <div className="space-y-4">
                        {ACTIVITY_TIMELINE.slice(0, 3).map((activity) => (
                          <div key={activity.id} className="flex gap-3">
                            <div className="relative">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                activity.type === 'pitch_created' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                                activity.type === 'pitch_liked' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                                activity.type === 'comment_added' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                                'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                              }`}>
                                {activity.type === 'pitch_created' && <IconRocket size={16} />}
                                {activity.type === 'pitch_liked' && <IconHeart size={16} />}
                                {activity.type === 'comment_added' && <IconMessage size={16} />}
                                {activity.type === 'achievement_earned' && <IconTrophy size={16} />}
                              </div>
                              {/* Vertical line connecting timeline items */}
                              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200 dark:bg-gray-700"></div>
                            </div>
                            <div className="pb-5">
                              <p className="font-medium">{activity.title}</p>
                              <p className="text-sm text-gray-700 dark:text-gray-300">{activity.content}</p>
                              <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                            </div>
                          </div>
                        ))}
                        <Link href="/profile?tab=activity" className="text-blue-600 dark:text-blue-400 text-sm flex items-center hover:underline mt-2">
                          View all activity
                          <IconArrowUpRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              )}

              {activeTab === "pitches" && (
                <motion.div
                  key="pitches"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">My Pitches</h2>
                    <Link href="/submit-pitch">
                      <Button leftIcon={<IconPlus size={16} />}>
                        Create New Pitch
                      </Button>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {USER_PITCHES.map((pitch) => (
                      <Card3d key={pitch.id} className="h-full">
                        <div className="relative h-full overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md">
                          {/* Pitch Image */}
                          <div className="relative h-48 w-full">
                            <Image
                              src={pitch.coverImage}
                              alt={pitch.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 text-white text-xs rounded-full">
                              {pitch.category}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold mb-2 line-clamp-1">{pitch.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                              {pitch.description}
                            </p>

                            <div className="mt-auto flex justify-between items-center">
                              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center">
                                  <IconEye size={16} className="mr-1" />
                                  {pitch.views}
                                </span>
                                <span className="flex items-center">
                                  <IconHeart size={16} className="mr-1" />
                                  {pitch.likes}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(pitch.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card3d>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "activity" && (
                <motion.div
                  key="activity"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Activity Timeline</h2>

                  <Card className="p-6 bg-white/70 dark:bg-black/50 backdrop-blur-md border border-white/20 dark:border-white/10">
                    <div className="space-y-6">
                      {ACTIVITY_TIMELINE.map((activity, index) => (
                        <div key={activity.id} className="flex gap-4">
                          <div className="relative">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              activity.type === 'pitch_created' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                              activity.type === 'pitch_liked' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                              activity.type === 'comment_added' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                              'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                            }`}>
                              {activity.type === 'pitch_created' && <IconRocket size={20} />}
                              {activity.type === 'pitch_liked' && <IconHeart size={20} />}
                              {activity.type === 'comment_added' && <IconMessage size={20} />}
                              {activity.type === 'achievement_earned' && <IconTrophy size={20} />}
                            </div>
                            {/* Vertical line connecting timeline items */}
                            {index < ACTIVITY_TIMELINE.length - 1 && (
                              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200 dark:bg-gray-700"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-lg">{activity.title}</p>
                                <p className="text-gray-700 dark:text-gray-300">{activity.content}</p>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                {activity.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {activeTab === "about" && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                  {/* Bio & Skills */}
                  <div className="lg:col-span-2 space-y-8">
                    <Card className="p-6 bg-white/70 dark:bg-black/50 backdrop-blur-md border border-white/20 dark:border-white/10">
                      <h2 className="text-xl font-bold mb-4">Bio</h2>
                      <p className="text-gray-700 dark:text-gray-300">{USER.bio}</p>
                    </Card>

                    <Card className="p-6 bg-white/70 dark:bg-black/50 backdrop-blur-md border border-white/20 dark:border-white/10">
                      <h2 className="text-xl font-bold mb-4">Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {USER.skills.map((skill, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg text-sm font-medium"
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card className="p-6 bg-white/70 dark:bg-black/50 backdrop-blur-md border border-white/20 dark:border-white/10">
                      <h2 className="text-xl font-bold mb-4">Experience</h2>
                      <div className="space-y-6">
                        {USER.experience.map((exp) => (
                          <div key={exp.id} className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                              <IconBriefcase size={24} />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">{exp.role}</h3>
                              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <span>{exp.company}</span>
                                <span className="text-xs">•</span>
                                <span className="text-sm">{exp.period}</span>
                              </div>
                              <p className="mt-1 text-gray-700 dark:text-gray-300">{exp.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card className="p-6 bg-white/70 dark:bg-black/50 backdrop-blur-md border border-white/20 dark:border-white/10">
                      <h2 className="text-xl font-bold mb-4">Education</h2>
                      <div className="space-y-6">
                        {USER.education.map((edu) => (
                          <div key={edu.id} className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 flex-shrink-0">
                              <IconSchool size={24} />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">{edu.degree}</h3>
                              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <span>{edu.institution}</span>
                                <span className="text-xs">•</span>
                                <span className="text-sm">{edu.period}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Achievements & Contact */}
                  <div className="space-y-8">
                    <Card className="p-6 bg-white/70 dark:bg-black/50 backdrop-blur-md border border-white/20 dark:border-white/10">
                      <h2 className="text-xl font-bold mb-4">Achievements</h2>
                      <div className="space-y-4">
                        {USER.achievements.map((achievement) => (
                          <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-white/5">
                            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                              <IconTrophy size={20} />
                            </div>
                            <div>
                              <p className="font-medium">{achievement.title}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card className="p-6 bg-white/70 dark:bg-black/50 backdrop-blur-md border border-white/20 dark:border-white/10">
                      <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <IconMail size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                            <p className="font-medium">{USER.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                            <IconMapPin size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                            <p className="font-medium">{USER.location}</p>
                          </div>
                        </div>
                        {USER.website && (
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                              <IconBulb size={20} />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Website</p>
                              <a
                                href={USER.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                {USER.website.replace(/(^\w+:|^)\/\//, '')}
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </AnimatedGradientBackground>
  );
}
