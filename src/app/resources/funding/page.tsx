"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import {
  IconRocket,
  IconArrowLeft,
  IconChevronRight,
  IconSearch,
  IconFilter,
  IconBuildingBank,
  IconCoin,
  IconUsers,
  IconWorld,
  IconArrowUpRight,
  IconExternalLink,
  IconStar,
  IconClock
} from "@tabler/icons-react";

// Funding types
const FUNDING_TYPES = [
  { id: "all", label: "All Sources" },
  { id: "vc", label: "Venture Capital", icon: <IconBuildingBank size={18} /> },
  { id: "angel", label: "Angel Investors", icon: <IconUsers size={18} /> },
  { id: "crowdfunding", label: "Crowdfunding", icon: <IconWorld size={18} /> },
  { id: "grants", label: "Grants & Programs", icon: <IconCoin size={18} /> },
];

// Mock funding resources data
const FUNDING_RESOURCES = [
  {
    id: "1",
    title: "Understanding Venture Capital",
    description: "A comprehensive guide to venture capital funding, from seed rounds to Series C and beyond.",
    type: "vc",
    featured: true,
    new: false,
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=2070&auto=format&fit=crop",
    link: "/resources/funding/venture-capital",
    duration: "60 min",
    author: "Michael Chen",
    authorRole: "Partner at Sequoia Capital",
  },
  {
    id: "2",
    title: "Angel Investment Guide",
    description: "Everything you need to know about securing angel investment for your early-stage startup.",
    type: "angel",
    featured: false,
    new: false,
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=2187&auto=format&fit=crop",
    link: "/resources/funding/angel-investment",
    duration: "40 min",
    author: "Alex Thompson",
    authorRole: "Angel Investor",
  },
  {
    id: "3",
    title: "Crowdfunding Strategies",
    description: "Learn how to run a successful crowdfunding campaign for your product or service.",
    type: "crowdfunding",
    featured: false,
    new: true,
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2070&auto=format&fit=crop",
    link: "/resources/funding/crowdfunding",
    duration: "35 min",
    author: "Jessica Lee",
    authorRole: "Crowdfunding Consultant",
  },
  {
    id: "4",
    title: "Government Grants for Startups",
    description: "A guide to finding and applying for government grants and funding programs for startups.",
    type: "grants",
    featured: false,
    new: false,
    image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=2074&auto=format&fit=crop",
    link: "/resources/funding/government-grants",
    duration: "45 min",
    author: "Robert Williams",
    authorRole: "Grant Specialist",
  },
  {
    id: "5",
    title: "Pitch Deck for Seed Funding",
    description: "How to create a compelling pitch deck specifically for seed-stage funding rounds.",
    type: "vc",
    featured: true,
    new: false,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    link: "/resources/funding/seed-pitch-deck",
    duration: "30 min",
    author: "Sarah Johnson",
    authorRole: "Pitch Coach & Former VC",
  },
  {
    id: "6",
    title: "Equity Crowdfunding Platforms",
    description: "A comparison of the top equity crowdfunding platforms and how to choose the right one for your startup.",
    type: "crowdfunding",
    featured: false,
    new: true,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    link: "/resources/funding/equity-crowdfunding",
    duration: "25 min",
    author: "David Rodriguez",
    authorRole: "Startup Advisor",
  },
];

// Top funding sources
const TOP_FUNDING_SOURCES = [
  {
    name: "Y Combinator",
    logo: "/logos/yc.png", // Placeholder
    description: "Seed accelerator providing funding, advice, and connections to early-stage startups.",
    website: "https://www.ycombinator.com/",
    category: "Accelerator",
    fundingRange: "$500K",
    industries: ["Tech", "AI", "SaaS", "Consumer"],
  },
  {
    name: "Sequoia Capital",
    logo: "/logos/sequoia.png", // Placeholder
    description: "Venture capital firm focusing on technology and healthcare sectors across all stages.",
    website: "https://www.sequoiacap.com/",
    category: "Venture Capital",
    fundingRange: "$1M - $100M+",
    industries: ["Enterprise", "Consumer", "Healthcare", "Fintech"],
  },
  {
    name: "Kickstarter",
    logo: "/logos/kickstarter.png", // Placeholder
    description: "Crowdfunding platform for creative projects, including tech products and innovations.",
    website: "https://www.kickstarter.com/",
    category: "Crowdfunding",
    fundingRange: "Varies",
    industries: ["Hardware", "Consumer Products", "Creative"],
  },
];

export default function FundingResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  // Filter resources based on search query and type
  const filteredResources = FUNDING_RESOURCES.filter(resource => {
    const matchesSearch = searchQuery === "" ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === "all" || resource.type === selectedType;

    return matchesSearch && matchesType;
  });

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
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <nav className="flex items-center text-sm">
              <Link href="/resources" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center">
                <IconArrowLeft size={16} className="mr-1" />
                Back to Resources
              </Link>
              <IconChevronRight size={14} className="mx-2 text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Funding Resources</span>
            </nav>
          </div>

          {/* Hero Section */}
          <div className="relative mb-12 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-90"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
            
            <div className="relative z-10 py-16 px-8 text-white">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Funding Resources
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl md:text-2xl max-w-2xl mb-8"
              >
                Discover funding opportunities and learn how to secure investment for your startup
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
                    placeholder="Search funding resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-3 px-5 pl-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" size={20} />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Top Funding Sources */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <IconRocket size={24} className="mr-2 text-purple-500" />
              Top Funding Sources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TOP_FUNDING_SOURCES.map((source, index) => (
                <motion.div
                  key={source.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-lg font-bold mr-3">
                      {source.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{source.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{source.category}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                    {source.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                      {source.fundingRange}
                    </span>
                    {source.industries.slice(0, 2).map((industry) => (
                      <span key={industry} className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                        {industry}
                      </span>
                    ))}
                    {source.industries.length > 2 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">
                        +{source.industries.length - 2} more
                      </span>
                    )}
                  </div>
                  
                  <a
                    href={source.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium"
                  >
                    Visit Website
                    <IconExternalLink size={16} className="ml-1" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Funding Type Filters */}
          <div className="mb-8 flex flex-wrap gap-3">
            {FUNDING_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
                  selectedType === type.id
                    ? "bg-purple-500 text-white"
                    : "bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5 hover:bg-white/70 dark:hover:bg-black/30"
                }`}
              >
                {type.icon && <span>{type.icon}</span>}
                <span>{type.label}</span>
              </button>
            ))}
          </div>

          {/* Funding Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredResources.map((resource) => (
              <FundingResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </main>
      </div>
    </AnimatedGradientBackground>
  );
}

// Funding Resource Card Component
function FundingResourceCard({ resource }: { resource: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-blue-500/10 rounded-2xl transform group-hover:scale-[1.03] transition-transform duration-300"></div>
      
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
            {FUNDING_TYPES.find(type => type.id === resource.type)?.label}
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
          <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {resource.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {resource.description}
          </p>
          
          {/* Resource Meta */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-500 mb-4">
            {resource.duration && (
              <div className="flex items-center gap-1">
                <IconClock size={16} />
                <span>{resource.duration}</span>
              </div>
            )}
          </div>
          
          {/* Author Info */}
          {resource.author && (
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-xs font-bold mr-3">
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
            className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium group-hover:underline"
          >
            View Resource
            <IconArrowUpRight size={18} className="ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
