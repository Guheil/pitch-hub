"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import PitchCard from "@/components/dashboard/pitch-card";
import { Button } from "@/components/ui/Button";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { Card } from "@/components/ui/Card";
import { Card3d } from "@/components/ui/3d-card";
import {
  IconSearch,
  IconX,
  IconArrowRight,
  IconArrowLeft,
  IconEye,
  IconClock,
  IconHeart,
  IconCategory,
  IconCalendar,
  IconStar,
  IconAdjustmentsHorizontal,
  IconBookmark,
  IconTrash
} from "@tabler/icons-react";

// Mock data for saved pitches
const SAVED_PITCHES = [
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
    savedAt: new Date(2023, 11, 5)
  },
  {
    id: "3",
    title: "MindfulMe",
    description: "AI-powered mental wellness app that provides personalized meditation, stress management, and sleep improvement techniques.",
    category: "Health & Wellness",
    views: 876,
    likes: 124,
    createdAt: new Date(2023, 9, 28),
    author: "Sophia Chen",
    authorAvatar: "/avatars/sophia.jpg",
    coverImage: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop",
    savedAt: new Date(2023, 11, 10)
  },
  {
    id: "5",
    title: "SecureShare",
    description: "Blockchain-based document verification and secure sharing platform for legal and financial industries.",
    category: "Blockchain",
    views: 1032,
    likes: 67,
    createdAt: new Date(2023, 10, 5),
    author: "Michael Rodriguez",
    authorAvatar: "/avatars/michael.jpg",
    coverImage: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2032&auto=format&fit=crop",
    savedAt: new Date(2023, 11, 15)
  },
  {
    id: "7",
    title: "UrbanFarm",
    description: "Vertical farming solution for urban environments, using IoT sensors and automation to grow fresh produce with minimal resources.",
    category: "AgTech",
    views: 743,
    likes: 92,
    createdAt: new Date(2023, 10, 20),
    author: "Emma Wilson",
    authorAvatar: "/avatars/emma.jpg",
    coverImage: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2070&auto=format&fit=crop",
    savedAt: new Date(2023, 11, 18)
  }
];

// All categories from saved pitches
const ALL_CATEGORIES = Array.from(
  new Set(SAVED_PITCHES.map(pitch => pitch.category))
).sort();

export default function SavedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for filters and sorting
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("savedAt");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Load filters from URL on initial load
  useEffect(() => {
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category") || "";
    const sort = searchParams.get("sort") || "savedAt";
    const page = parseInt(searchParams.get("page") || "1", 10);

    setSearchQuery(query);
    setSelectedCategory(category);
    setSortBy(sort);
    setCurrentPage(page);

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchParams]);

  // Update URL when filters change
  const updateUrlWithFilters = () => {
    const params = new URLSearchParams();

    if (searchQuery) params.set("query", searchQuery);
    if (selectedCategory) params.set("category", selectedCategory);
    if (sortBy !== "savedAt") params.set("sort", sortBy);
    if (currentPage > 1) params.set("page", currentPage.toString());

    router.push(`/saved?${params.toString()}`);
  };

  // Apply filters when they change
  useEffect(() => {
    // Skip the initial render to prevent infinite loops
    const timer = setTimeout(() => {
      updateUrlWithFilters();
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory, sortBy, currentPage]);

  // Format date to readable string
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Filter pitches based on selected filters
  const filteredPitches = SAVED_PITCHES.filter(pitch => {
    const matchesSearch = searchQuery === "" ||
      pitch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pitch.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pitch.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "" || pitch.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort pitches based on selected option
  const sortedPitches = [...filteredPitches].sort((a, b) => {
    switch (sortBy) {
      case "views":
        return b.views - a.views;
      case "date":
        return b.createdAt.getTime() - a.createdAt.getTime();
      case "likes":
        return b.likes - a.likes;
      case "savedAt":
      default:
        return b.savedAt.getTime() - a.savedAt.getTime();
    }
  });

  // Paginate results
  const totalPages = Math.ceil(sortedPitches.length / itemsPerPage);
  const paginatedPitches = sortedPitches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSortBy("savedAt");
    setCurrentPage(1);
  };

  // Remove saved pitch (mock function)
  const removeSavedPitch = (id: string) => {
    // In a real app, this would call an API to remove the pitch from saved items
    console.log(`Removing pitch with ID: ${id}`);
    // For demo purposes, we'll just show an alert
    alert(`Pitch removed from saved items (ID: ${id})`);
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
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                  <IconBookmark size={24} className="text-blue-500" />
                  Saved Pitches
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Your collection of inspiring startup ideas and pitches
                </p>
              </div>
            </div>
          </motion.div>

          {/* Filters Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <Card className="bg-white/50 dark:bg-black/20 backdrop-blur-lg border border-white/20 dark:border-white/10 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col gap-4">
                  {/* Search and Sort Row */}
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Search Input */}
                    <div className="relative flex-grow">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        <IconSearch size={18} />
                      </div>
                      <input
                        type="text"
                        placeholder="Search your saved pitches..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(1); // Reset to first page on search
                        }}
                        className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setCurrentPage(1);
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        >
                          <IconX size={16} />
                        </button>
                      )}
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative min-w-[180px]">
                      <div className="flex items-center gap-2 p-2.5 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10">
                        <div className="flex items-center gap-2 px-2">
                          {sortBy === "views" && <IconEye size={16} />}
                          {sortBy === "date" && <IconClock size={16} />}
                          {sortBy === "likes" && <IconHeart size={16} />}
                          {sortBy === "savedAt" && <IconBookmark size={16} />}
                          <span className="text-sm font-medium">
                            {sortBy === "views" && "Most Viewed"}
                            {sortBy === "date" && "Recently Created"}
                            {sortBy === "likes" && "Most Liked"}
                            {sortBy === "savedAt" && "Recently Saved"}
                          </span>
                        </div>
                        <div className="flex-grow"></div>
                        <div className="relative">
                          <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="p-1.5 rounded-full hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
                          >
                            <IconAdjustmentsHorizontal size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Filters */}
                  <AnimatePresence>
                    {showFilters && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                          {/* Sort Options */}
                          <div className="mb-6">
                            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                              <IconAdjustmentsHorizontal size={16} />
                              Sort By
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => setSortBy("savedAt")}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                                  sortBy === "savedAt"
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                <div className="flex items-center gap-1">
                                  <IconBookmark size={14} />
                                  <span>Recently Saved</span>
                                </div>
                              </button>
                              <button
                                onClick={() => setSortBy("date")}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                                  sortBy === "date"
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                <div className="flex items-center gap-1">
                                  <IconClock size={14} />
                                  <span>Recently Created</span>
                                </div>
                              </button>
                              <button
                                onClick={() => setSortBy("views")}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                                  sortBy === "views"
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                <div className="flex items-center gap-1">
                                  <IconEye size={14} />
                                  <span>Most Viewed</span>
                                </div>
                              </button>
                              <button
                                onClick={() => setSortBy("likes")}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                                  sortBy === "likes"
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                <div className="flex items-center gap-1">
                                  <IconHeart size={14} />
                                  <span>Most Liked</span>
                                </div>
                              </button>
                            </div>
                          </div>

                          {/* Category Filters */}
                          <div>
                            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                              <IconCategory size={16} />
                              Categories
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => setSelectedCategory("")}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                                  selectedCategory === ""
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                All Categories
                              </button>
                              {ALL_CATEGORIES.map((category) => (
                                <button
                                  key={category}
                                  onClick={() => setSelectedCategory(category)}
                                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                                    category === selectedCategory
                                      ? 'bg-blue-500 text-white'
                                      : 'bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 text-gray-700 dark:text-gray-300'
                                  }`}
                                >
                                  {category}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Reset Button */}
                          {(selectedCategory || sortBy !== "savedAt" || searchQuery) && (
                            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                              <Button
                                onClick={resetFilters}
                                className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg transition-colors"
                              >
                                Reset All Filters
                              </Button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Results Count */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">
              Showing {paginatedPitches.length} of {filteredPitches.length} saved pitches
            </p>
          </div>

          {/* Saved Pitches Grid */}
          {isLoading ? (
            // Loading Skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-[350px] rounded-xl bg-white/30 dark:bg-black/30 animate-pulse"></div>
              ))}
            </div>
          ) : paginatedPitches.length > 0 ? (
            // Results Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {paginatedPitches.map((pitch, index) => (
                <SavedPitchCard
                  key={pitch.id}
                  pitch={pitch}
                  index={index}
                  onRemove={() => removeSavedPitch(pitch.id)}
                />
              ))}
            </div>
          ) : (
            // No Results
            <Card className="p-12 text-center bg-white/50 dark:bg-black/20 backdrop-blur-lg">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200/50 dark:bg-gray-800/50 flex items-center justify-center">
                  <IconBookmark size={24} className="text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-xl font-medium">No saved pitches found</h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md">
                  {searchQuery || selectedCategory
                    ? "We couldn't find any saved pitches matching your search criteria. Try adjusting your filters or search terms."
                    : "You haven't saved any pitches yet. Start exploring and save pitches that inspire you."}
                </p>
                {searchQuery || selectedCategory ? (
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="mt-2"
                  >
                    Reset Filters
                  </Button>
                ) : (
                  <Link href="/pitches">
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 mt-2"
                    >
                      Explore Pitches
                      <IconArrowRight size={16} />
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 mb-12">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === 1
                      ? "bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <IconArrowLeft size={16} />
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, index) => (
                    <Button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>

                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === totalPages
                      ? "bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Next
                  <IconArrowRight size={16} />
                </Button>
              </div>
            </div>
          )}

          {/* Explore More Section - Show when there are saved pitches but not many */}
          {paginatedPitches.length > 0 && filteredPitches.length < 5 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-12 mt-16"
            >
              <Card className="p-8 bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10">
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Discover More Inspiring Pitches</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Explore our collection of innovative startup ideas and save the ones that inspire you for future reference.
                  </p>
                  <Link href="/pitches">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2">
                      Explore All Pitches
                      <IconArrowRight size={18} />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          )}
        </main>
      </div>
    </AnimatedGradientBackground>
  );
}

// Saved Pitch Card Component
interface SavedPitchProps {
  id: string;
  title: string;
  description: string;
  category: string;
  views: number;
  likes: number;
  createdAt: Date;
  author: string;
  authorAvatar?: string;
  coverImage?: string;
  savedAt: Date;
}

interface SavedPitchCardProps {
  pitch: SavedPitchProps;
  index?: number;
  onRemove: () => void;
}

const SavedPitchCard: React.FC<SavedPitchCardProps> = ({
  pitch,
  index = 0,
  onRemove
}) => {
  // Format date to readable string
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full relative"
    >
      {/* Remove Button - Positioned above the card */}
      <div className="absolute top-3 right-3 z-20">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
          className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-red-500 text-gray-700 dark:text-gray-300 hover:text-white transition-colors shadow-sm"
          aria-label="Remove from saved"
        >
          <IconTrash size={16} />
        </button>
      </div>

      <Card3d
        className="h-full"
        rotationIntensity={5}
        glareOpacity={0.1}
        glareSize={0.4}
        shadow={true}
        cardClassName="bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 h-full"
      >
        <Link href={`/pitches/${pitch.id}`} className="block h-full">
          <div className="flex flex-col h-full">
            {/* Cover Image */}
            {pitch.coverImage && (
              <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                <Image
                  src={pitch.coverImage}
                  alt={pitch.title}
                  fill
                  className="object-cover"
                />

                {/* Category Badge */}
                <div className="absolute bottom-3 left-3 z-10 px-2 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs">
                  {pitch.category}
                </div>

                {/* Saved Badge */}
                <div className="absolute top-3 left-3 z-10 px-2 py-1 rounded-full bg-blue-500/80 backdrop-blur-md text-white text-xs flex items-center gap-1">
                  <IconBookmark size={12} />
                  <span>Saved {formatDate(pitch.savedAt)}</span>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-2 line-clamp-1">{pitch.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {pitch.description}
              </p>

              {/* Author */}
              <div className="flex items-center mt-auto">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white overflow-hidden">
                  {pitch.authorAvatar ? (
                    <Image
                      src={pitch.authorAvatar}
                      alt={pitch.author}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  ) : (
                    pitch.author.charAt(0)
                  )}
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium">{pitch.author}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <IconEye size={16} className="mr-1" />
                    <span className="text-xs">{pitch.views}</span>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <IconHeart size={16} className="mr-1" />
                    <span className="text-xs">{pitch.likes}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <IconCalendar size={16} className="mr-1" />
                  <span className="text-xs">{formatDate(pitch.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Card3d>
    </motion.div>
  );
};
