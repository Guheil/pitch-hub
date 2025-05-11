"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import {
  IconVideo,
  IconRocket,
  IconBulb,
  IconUsers,
  IconBook,
  IconFileText,
  IconChartBar,
  IconBrandYoutube,
  IconSearch,
  IconArrowUpRight,
  IconFilter,
  IconStar,
  IconClock,
  IconDownload
} from "@tabler/icons-react";

// Resource categories
const RESOURCE_CATEGORIES = [
  { id: "all", label: "All Resources" },
  { id: "videos", label: "Video Resources", icon: <IconVideo size={18} /> },
  { id: "funding", label: "Funding", icon: <IconRocket size={18} /> },
  { id: "mentorship", label: "Mentorship", icon: <IconUsers size={18} />, link: "/community/mentors" },
  { id: "guides", label: "Guides & Tutorials", icon: <IconBook size={18} /> },
  { id: "templates", label: "Templates", icon: <IconFileText size={18} /> },
  { id: "analytics", label: "Analytics", icon: <IconChartBar size={18} /> },
];

// Mock resources data
const RESOURCES = [
  {
    id: "1",
    title: "Pitch Masterclass",
    description: "Learn how to create compelling pitch videos that capture investor attention and effectively communicate your vision.",
    category: "videos",
    featured: true,
    new: false,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    link: "/resources/pitch-masterclass",
    duration: "45 min",
    author: "Sarah Johnson",
    authorRole: "Pitch Coach & Former VC",
  },
  {
    id: "2",
    title: "Funding 101: Understanding Venture Capital",
    description: "A comprehensive guide to venture capital funding, from seed rounds to Series C and beyond.",
    category: "funding",
    featured: true,
    new: false,
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=2070&auto=format&fit=crop",
    link: "/resources/funding/venture-capital",
    duration: "60 min",
    author: "Michael Chen",
    authorRole: "Partner at Sequoia Capital",
  },
  {
    id: "3",
    title: "Finding the Right Mentor",
    description: "Strategies for identifying, approaching, and building relationships with mentors who can help your startup succeed.",
    category: "mentorship",
    featured: false,
    new: true,
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop",
    link: "/community/mentors",
    duration: "30 min",
    author: "David Rodriguez",
    authorRole: "Startup Advisor",
  },
  {
    id: "4",
    title: "Pitch Deck Template",
    description: "A customizable pitch deck template with 15 essential slides for presenting your startup to investors.",
    category: "templates",
    featured: false,
    new: false,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
    link: "/resources/templates/pitch-deck",
    fileType: "PPTX, PDF",
    downloads: 3452,
  },
  {
    id: "5",
    title: "Financial Projections Spreadsheet",
    description: "A comprehensive Excel template for creating 3-5 year financial projections for your startup.",
    category: "templates",
    featured: false,
    new: false,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop",
    link: "/resources/templates/financial-projections",
    fileType: "XLSX",
    downloads: 2189,
  },
  {
    id: "6",
    title: "Startup Metrics That Matter",
    description: "Learn which metrics you should be tracking to demonstrate traction and growth to potential investors.",
    category: "analytics",
    featured: false,
    new: true,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    link: "/resources/analytics/key-metrics",
    duration: "25 min",
    author: "Emma Wilson",
    authorRole: "Growth Strategist",
  },
  {
    id: "7",
    title: "Angel Investment Guide",
    description: "Everything you need to know about securing angel investment for your early-stage startup.",
    category: "funding",
    featured: false,
    new: false,
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=2187&auto=format&fit=crop",
    link: "/resources/funding/angel-investment",
    duration: "40 min",
    author: "Alex Thompson",
    authorRole: "Angel Investor",
  },
  {
    id: "8",
    title: "Crafting Your Value Proposition",
    description: "A step-by-step guide to developing a compelling value proposition that resonates with customers and investors.",
    category: "guides",
    featured: true,
    new: false,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    link: "/resources/guides/value-proposition",
    duration: "35 min",
    author: "Priya Patel",
    authorRole: "Marketing Strategist",
  },
];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  // Filter resources based on search query and category
  const filteredResources = RESOURCES.filter(resource => {
    const matchesSearch = searchQuery === "" ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort resources
  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === "featured") {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    } else if (sortBy === "newest") {
      if (a.new && !b.new) return -1;
      if (!a.new && b.new) return 1;
      return 0;
    }
    return 0;
  });

  // Get featured resources
  const featuredResources = RESOURCES.filter(resource => resource.featured);

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
          {/* Hero Section */}
          <div className="relative mb-12 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>

            <div className="relative z-10 py-16 px-8 text-white">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Entrepreneur's Resource Hub
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl md:text-2xl max-w-2xl mb-8"
              >
                Access guides, templates, and expert advice to help you build and grow your startup
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-xl relative"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-3 px-5 pl-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={20} />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-8 flex flex-wrap gap-3">
            {RESOURCE_CATEGORIES.map((category) => (
              category.link ? (
                <Link
                  key={category.id}
                  href={category.link}
                  className="px-4 py-2 rounded-full flex items-center gap-2 transition-colors bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5 hover:bg-white/70 dark:hover:bg-black/30"
                >
                  {category.icon && <span>{category.icon}</span>}
                  <span>{category.label}</span>
                </Link>
              ) : (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-500 text-white"
                      : "bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5 hover:bg-white/70 dark:hover:bg-black/30"
                  }`}
                >
                  {category.icon && <span>{category.icon}</span>}
                  <span>{category.label}</span>
                </button>
              )
            ))}

            <div className="ml-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sortedResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </main>
      </div>
    </AnimatedGradientBackground>
  );
}

// Resource Card Component
function ResourceCard({ resource }: { resource: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 rounded-2xl transform group-hover:scale-[1.03] transition-transform duration-300"></div>

      <div className="relative h-full rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 dark:border-white/5 bg-white/50 dark:bg-black/20">
        {/* Resource Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={resource.image}
            alt={resource.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium">
            {RESOURCE_CATEGORIES.find(cat => cat.id === resource.category)?.label}
          </div>

          {/* Featured or New Badge */}
          {(resource.featured || resource.new) && (
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full backdrop-blur-md text-xs font-medium ${
              resource.featured ? "bg-yellow-500/80 text-white" : "bg-green-500/80 text-white"
            }`}>
              {resource.featured ? (
                <div className="flex items-center gap-1">
                  <IconStar size={14} />
                  <span>Featured</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <IconClock size={14} />
                  <span>New</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {resource.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {resource.description}
          </p>

          {/* Resource Meta */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-500 mb-4">
            {resource.duration && (
              <div className="flex items-center gap-1 mr-4">
                <IconClock size={16} />
                <span>{resource.duration}</span>
              </div>
            )}

            {resource.fileType && (
              <div className="flex items-center gap-1 mr-4">
                <IconFileText size={16} />
                <span>{resource.fileType}</span>
              </div>
            )}

            {resource.downloads && (
              <div className="flex items-center gap-1">
                <IconDownload size={16} />
                <span>{resource.downloads.toLocaleString()} downloads</span>
              </div>
            )}
          </div>

          {/* Author Info */}
          {resource.author && (
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold mr-3">
                {resource.author.split(' ').map(name => name[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-medium">{resource.author}</p>
                {resource.authorRole && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">{resource.authorRole}</p>
                )}
              </div>
            </div>
          )}

          {/* Action Button */}
          <Link
            href={resource.link}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium group-hover:underline"
          >
            {resource.category === 'templates' ? 'Download Template' : 'View Resource'}
            <IconArrowUpRight size={18} className="ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
