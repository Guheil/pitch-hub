"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconCalendar, IconUser, IconTag, IconSearch, IconArrowRight } from "@tabler/icons-react";

// Mock blog post data
const BLOG_POSTS = [
  {
    id: "1",
    title: "How to Create a Compelling Startup Pitch",
    excerpt: "Learn the essential elements of a startup pitch that captures investor attention and communicates your vision effectively.",
    coverImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop",
    category: "Pitch Tips",
    author: "Xavier Gael",
    authorAvatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop",
    date: "January 15, 2024",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "2",
    title: "Funding Options for Early-Stage Startups",
    excerpt: "Explore various funding options available to early-stage startups, from bootstrapping to angel investors and venture capital.",
    coverImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2070&auto=format&fit=crop",
    category: "Funding",
    author: "Andriq Klyne",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    date: "January 10, 2024",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: "3",
    title: "Building a Minimum Viable Product (MVP)",
    excerpt: "A step-by-step guide to creating an MVP that validates your idea while minimizing development time and resources.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    category: "Product Development",
    author: "Maira Francine",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    date: "January 5, 2024",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: "4",
    title: "Market Research Strategies for Startups",
    excerpt: "Effective market research techniques to validate your business idea and understand your target audience.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    category: "Market Research",
    author: "Xavier Gael",
    authorAvatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop",
    date: "December 28, 2023",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: "5",
    title: "Legal Considerations for New Founders",
    excerpt: "Essential legal aspects every founder should know when starting a business, from entity formation to intellectual property.",
    coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop",
    category: "Legal",
    author: "Andriq Klyne",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    date: "December 20, 2023",
    readTime: "9 min read",
    featured: false,
  },
  {
    id: "6",
    title: "Creating an Effective Business Model Canvas",
    excerpt: "How to use the Business Model Canvas to visualize, structure, and test your business idea before launching.",
    coverImage: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=2070&auto=format&fit=crop",
    category: "Business Strategy",
    author: "Maira Francine",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    date: "December 15, 2023",
    readTime: "8 min read",
    featured: false,
  },
];

// All categories from blog posts
const ALL_CATEGORIES = Array.from(
  new Set(BLOG_POSTS.map(post => post.category))
).sort();

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filter posts based on search query and selected category
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get featured post
  const featuredPost = BLOG_POSTS.find(post => post.featured);

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
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                FoundersFrame Blog
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Insights, tips, and resources to help entrepreneurs navigate their startup journey.
              </p>
            </motion.div>

            {/* Search and Filter */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="relative w-full md:w-96">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 rounded-lg bg-white/50 dark:bg-black/20 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <IconSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === ""
                        ? "bg-blue-500 text-white"
                        : "bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30"
                    }`}
                  >
                    All
                  </button>
                  {ALL_CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? "bg-blue-500 text-white"
                          : "bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Post */}
            {featuredPost && !searchQuery && !selectedCategory && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-16"
              >
                <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
                <div className="group relative overflow-hidden rounded-2xl">
                  <div className="relative h-[400px] w-full">
                    <Image
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-500/80 text-white text-sm font-medium mb-4">
                      {featuredPost.category}
                    </span>
                    <h3 className="text-3xl font-bold text-white mb-4">{featuredPost.title}</h3>
                    <p className="text-white/90 mb-6 line-clamp-2">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-white/80 mb-6">
                      <div className="flex items-center gap-2">
                        <IconCalendar size={16} />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IconUser size={16} />
                        <span>{featuredPost.author}</span>
                      </div>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <Link href={`/blog/${featuredPost.id}`}>
                      <Button variant="primary" rightIcon={<IconArrowRight size={16} />}>
                        Read Article
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts
                .filter(post => !post.featured || searchQuery || selectedCategory)
                .map((post, index) => (
                  <BlogPostCard key={post.id} post={post} index={index} />
                ))}
            </div>

            {/* No Results */}
            {filteredPosts.length === 0 && (
              <Card className="p-12 text-center bg-white/50 dark:bg-black/20 backdrop-blur-lg">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200/50 dark:bg-gray-800/50 flex items-center justify-center">
                    <IconSearch size={24} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-xl font-medium">No articles found</h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md">
                    We couldn&apos;t find any articles matching your search criteria. Try adjusting your filters or search terms.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("");
                    }}
                    variant="outline"
                    className="mt-2"
                  >
                    Clear Filters
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedGradientBackground>
  );
}

// Blog Post Card Component
function BlogPostCard({ post, index }: { post: typeof BLOG_POSTS[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
      className="group"
    >
      <Link href={`/blog/${post.id}`} className="block h-full">
        <Card className="h-full overflow-hidden bg-white/50 dark:bg-black/20 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border border-white/20">
          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <IconTag size={16} className="text-blue-500" />
              <span className="text-sm font-medium text-blue-500">{post.category}</span>
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={post.authorAvatar}
                    alt={post.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm">{post.author}</span>
              </div>
              <div className="text-sm text-gray-500">
                {post.readTime}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
