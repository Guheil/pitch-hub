"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import PitchCard from "@/components/dashboard/pitch-card";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import {
  IconSearch,
  IconX,
  IconArrowRight,
  IconArrowLeft,
  IconEye,
  IconClock,
  IconHeart,
  IconCategory,
  IconStar,
  IconAdjustmentsHorizontal
} from "@tabler/icons-react";

// Mock data for startup pitches (same as dashboard)
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
  {
    id: "7",
    title: "GreenEnergy",
    description: "Renewable energy solution that combines solar and wind power with advanced battery storage for residential buildings.",
    category: "Sustainability",
    views: 1450,
    likes: 132,
    createdAt: new Date(2023, 9, 10),
    author: "James Miller",
    authorAvatar: "/avatars/james.jpg",
    coverImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "8",
    title: "FoodConnect",
    description: "Platform connecting local farmers directly with consumers, reducing food waste and supporting sustainable agriculture.",
    category: "AgTech",
    views: 987,
    likes: 79,
    createdAt: new Date(2023, 10, 5),
    author: "Sophia Garcia",
    authorAvatar: "/avatars/sophia.jpg",
    coverImage: "https://images.unsplash.com/photo-1505471768190-275e2ad070d9?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "9",
    title: "CyberGuard",
    description: "AI-powered cybersecurity solution that detects and prevents threats in real-time for small businesses.",
    category: "Cybersecurity",
    views: 1205,
    likes: 97,
    createdAt: new Date(2023, 8, 15),
    author: "Ryan Kim",
    authorAvatar: "/avatars/ryan.jpg",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
  },
  {
    id: "10",
    title: "MedConnect",
    description: "Telemedicine platform that connects patients with specialists worldwide for second opinions and consultations.",
    category: "Health Tech",
    views: 1560,
    likes: 145,
    createdAt: new Date(2023, 7, 20),
    author: "Olivia Thompson",
    authorAvatar: "/avatars/olivia.jpg",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "11",
    title: "SkillBridge",
    description: "Peer-to-peer skill sharing platform that connects learners with experts for personalized mentorship.",
    category: "EdTech",
    views: 890,
    likes: 72,
    createdAt: new Date(2023, 6, 10),
    author: "Daniel Park",
    authorAvatar: "/avatars/daniel.jpg",
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: "12",
    title: "ShopSmart",
    description: "AI shopping assistant that helps consumers find the best deals and most sustainable products across online retailers.",
    category: "Retail Tech",
    views: 1100,
    likes: 88,
    createdAt: new Date(2023, 5, 15),
    author: "Mia Johnson",
    authorAvatar: "/avatars/mia.jpg",
    coverImage: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
  },
];

// Sort options
const SORT_OPTIONS = [
  { label: "Most Viewed", value: "views", icon: <IconEye size={16} /> },
  { label: "Most Recent", value: "date", icon: <IconClock size={16} /> },
  { label: "Most Liked", value: "likes", icon: <IconHeart size={16} /> },
  { label: "Featured", value: "featured", icon: <IconStar size={16} /> },
];

// Wrapper component that uses useSearchParams
function ExplorePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for filters and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("views");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 6;

  // Get unique categories
  const categories = Array.from(new Set(MOCK_PITCHES.map(pitch => pitch.category)));

  // Handle URL parameters for sorting and filtering
  useEffect(() => {
    // Get URL parameters
    const sortParam = searchParams.get('sort');
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    // Set sort option if provided in URL
    if (sortParam) {
      if (['views', 'date', 'likes', 'featured'].includes(sortParam)) {
        setSortBy(sortParam);
      }
    }

    // Set category if provided in URL
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }

    // Set search query if provided in URL
    if (searchParam) {
      setSearchQuery(searchParam);
    }

    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchParams, categories]);

  // We're now handling URL updates directly in each filter change handler
  // This effect is only for initial loading of URL parameters
  // We don't need to update the URL when filters change anymore

  // Filter and sort pitches
  const filteredPitches = MOCK_PITCHES.filter(pitch => {
    const matchesSearch = searchQuery === "" ||
      pitch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pitch.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pitch.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !selectedCategory || pitch.category === selectedCategory;

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
      case "featured":
        // For featured, we'll use a combination of views and likes
        return (b.views * 0.7 + b.likes * 0.3) - (a.views * 0.7 + a.likes * 0.3);
      default:
        return 0;
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
    setSelectedCategory(null);
    setSortBy("views");
    setCurrentPage(1);

    // Clear URL parameters
    router.replace('/pitches', { scroll: false });
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
                <h1 className="text-3xl font-bold mb-2">Explore Pitches</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Discover innovative startup ideas from entrepreneurs around the world
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredPitches.length} {filteredPitches.length === 1 ? 'pitch' : 'pitches'} found
                </span>

                {(searchQuery || selectedCategory) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-sm"
                  >
                    Reset Filters
                  </Button>
                )}
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
                        placeholder="Search for startup ideas..."
                        value={searchQuery}
                        onChange={(e) => {
                          const newSearchQuery = e.target.value;
                          setSearchQuery(newSearchQuery);
                          setCurrentPage(1); // Reset to first page on search

                          // Update URL with new search parameter
                          const params = new URLSearchParams(searchParams.toString());
                          if (newSearchQuery === "") {
                            params.delete('search');
                          } else {
                            params.set('search', newSearchQuery);
                          }
                          const queryString = params.toString();
                          const url = queryString ? `/pitches?${queryString}` : '/pitches';
                          router.replace(url, { scroll: false });
                        }}
                        className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setCurrentPage(1);
                            // Update URL to remove search parameter
                            const params = new URLSearchParams(searchParams.toString());
                            params.delete('search');
                            const queryString = params.toString();
                            const url = queryString ? `/pitches?${queryString}` : '/pitches';
                            router.replace(url, { scroll: false });
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
                          {SORT_OPTIONS.find(option => option.value === sortBy)?.icon}
                          <span className="text-sm font-medium">
                            {SORT_OPTIONS.find(option => option.value === sortBy)?.label}
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
                              {SORT_OPTIONS.map((option) => (
                                <button
                                  key={option.value}
                                  onClick={() => {
                                    setSortBy(option.value);
                                    // Update URL with new sort parameter
                                    const params = new URLSearchParams(searchParams.toString());
                                    if (option.value === "views") {
                                      params.delete('sort');
                                    } else {
                                      params.set('sort', option.value);
                                    }
                                    const queryString = params.toString();
                                    const url = queryString ? `/pitches?${queryString}` : '/pitches';
                                    router.replace(url, { scroll: false });
                                  }}
                                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
                                    option.value === sortBy
                                      ? 'bg-blue-500 text-white'
                                      : 'bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 text-gray-700 dark:text-gray-300'
                                  }`}
                                >
                                  {option.icon}
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Category Filters */}
                          <div>
                            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                              <IconCategory size={16} />
                              Categories
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {categories.map((category) => (
                                <button
                                  key={category}
                                  onClick={() => {
                                    // If this category is already selected, clear it
                                    // Otherwise, set it as the new category
                                    const newCategory = category === selectedCategory ? null : category;
                                    setSelectedCategory(newCategory);
                                    setCurrentPage(1); // Reset to first page on category change

                                    // Update URL with new category parameter
                                    const params = new URLSearchParams(searchParams.toString());
                                    if (newCategory === null) {
                                      params.delete('category');
                                    } else {
                                      params.set('category', newCategory);
                                    }
                                    const queryString = params.toString();
                                    const url = queryString ? `/pitches?${queryString}` : '/pitches';
                                    router.replace(url, { scroll: false });
                                  }}
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
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Results Section */}
          <div className="mb-12">
            {isLoading ? (
              // Loading Skeleton
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="h-[350px] rounded-xl bg-white/30 dark:bg-black/30 animate-pulse"></div>
                ))}
              </div>
            ) : paginatedPitches.length > 0 ? (
              // Results Grid
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedPitches.map((pitch, index) => (
                  <PitchCard
                    key={pitch.id}
                    pitch={pitch}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              // No Results
              <Card className="p-12 text-center bg-white/50 dark:bg-black/20 backdrop-blur-lg">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200/50 dark:bg-gray-800/50 flex items-center justify-center">
                    <IconSearch size={24} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-xl font-medium">No pitches found</h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md">
                    We couldn&apos;t find any pitches matching your search criteria. Try adjusting your filters or search terms.
                  </p>
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="mt-2"
                  >
                    Reset Filters
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mb-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1"
              >
                <IconArrowLeft size={16} />
                Previous
              </Button>

              <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: totalPages }).map((_, index) => {
                  const page = index + 1;
                  // Show first page, last page, current page, and pages around current page
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors ${
                          currentPage === page
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-white/20 dark:hover:bg-black/20 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return <span key={page} className="text-gray-500">...</span>;
                  }
                  return null;
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1"
              >
                Next
                <IconArrowRight size={16} />
              </Button>
            </div>
          )}
        </main>
      </div>
    </AnimatedGradientBackground>
  );
}

// Main component that wraps the content in a Suspense boundary
export default function ExplorePage() {
  return (
    <Suspense fallback={
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-[350px] rounded-xl bg-white/30 dark:bg-black/30 animate-pulse"></div>
              ))}
            </div>
          </main>
        </div>
      </AnimatedGradientBackground>
    }>
      <ExplorePageContent />
    </Suspense>
  );
}
