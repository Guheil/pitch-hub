"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { Button } from "@/components/ui/Button";
import {
  IconSearch,
  IconFilter,
  IconArrowRight,
  IconArrowLeft,
  IconStar,
  IconBriefcase,
  IconWorld,
  IconClock,
  IconAdjustmentsHorizontal,
  IconMessageCircle,
  IconVideo,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandGithub,
} from "@tabler/icons-react";

// Mock data for mentors
const MENTORS = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    title: "Startup Advisor & Angel Investor",
    bio: "Former CTO at TechGiant with 15+ years of experience scaling startups. Angel investor in 20+ companies with 3 successful exits.",
    expertise: ["Fundraising", "Tech Strategy", "Product Development"],
    industries: ["SaaS", "FinTech", "AI"],
    rating: 4.9,
    reviewCount: 48,
    availability: "2-3 sessions/week",
    languages: ["English", "Mandarin"],
    location: "San Francisco, CA",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    featured: true,
    verified: true,
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarahchen",
      twitter: "https://twitter.com/sarahchen",
    }
  },
  {
    id: "2",
    name: "Marcus Johnson",
    title: "Growth Marketing Expert",
    bio: "Helped 50+ startups achieve product-market fit and scale their user acquisition strategies. Previously VP of Marketing at GrowthCo.",
    expertise: ["Growth Strategy", "User Acquisition", "Marketing"],
    industries: ["E-commerce", "Consumer Apps", "Marketplaces"],
    rating: 4.7,
    reviewCount: 36,
    availability: "Evenings & Weekends",
    languages: ["English", "Spanish"],
    location: "New York, NY",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    featured: false,
    verified: true,
    socialLinks: {
      linkedin: "https://linkedin.com/in/marcusjohnson",
      twitter: "https://twitter.com/marcusjohnson",
    }
  },
  {
    id: "3",
    name: "Aisha Patel",
    title: "Product Strategy Consultant",
    bio: "Former Product Lead at ProductHQ. Specializes in helping early-stage startups define their MVP and product roadmap.",
    expertise: ["Product Strategy", "UX Design", "MVP Development"],
    industries: ["EdTech", "Health Tech", "Consumer Apps"],
    rating: 4.8,
    reviewCount: 29,
    availability: "Flexible",
    languages: ["English", "Hindi"],
    location: "Remote",
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop",
    featured: true,
    verified: true,
    socialLinks: {
      linkedin: "https://linkedin.com/in/aishapatel",
      github: "https://github.com/aishapatel",
    }
  },
  {
    id: "4",
    name: "David Rodriguez",
    title: "Venture Capital Partner",
    bio: "Partner at InnovateVC with focus on early-stage investments. Previously founded and exited two tech startups.",
    expertise: ["Fundraising", "Pitch Deck", "Financial Modeling"],
    industries: ["FinTech", "Enterprise SaaS", "Cybersecurity"],
    rating: 4.9,
    reviewCount: 42,
    availability: "Limited Availability",
    languages: ["English", "Spanish"],
    location: "Austin, TX",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    featured: false,
    verified: true,
    socialLinks: {
      linkedin: "https://linkedin.com/in/davidrodriguez",
      twitter: "https://twitter.com/davidrodriguez",
    }
  },
  {
    id: "5",
    name: "Emma Wilson",
    title: "UX/UI Design Lead",
    bio: "Award-winning designer with expertise in creating intuitive user experiences. Previously Design Director at DesignStudio.",
    expertise: ["UX/UI Design", "Brand Identity", "Design Systems"],
    industries: ["Consumer Apps", "E-commerce", "SaaS"],
    rating: 4.6,
    reviewCount: 31,
    availability: "Weekends Only",
    languages: ["English", "French"],
    location: "London, UK",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    featured: false,
    verified: true,
    socialLinks: {
      linkedin: "https://linkedin.com/in/emmawilson",
      github: "https://github.com/emmawilson",
    }
  },
  {
    id: "6",
    name: "James Kim",
    title: "Technical Co-Founder",
    bio: "Serial entrepreneur with 3 successful tech startups. Expert in building technical teams and scaling infrastructure.",
    expertise: ["Technical Leadership", "Team Building", "Architecture"],
    industries: ["AI/ML", "Developer Tools", "Cloud Infrastructure"],
    rating: 4.8,
    reviewCount: 37,
    availability: "2 sessions/week",
    languages: ["English", "Korean"],
    location: "Seattle, WA",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    featured: true,
    verified: true,
    socialLinks: {
      linkedin: "https://linkedin.com/in/jameskim",
      github: "https://github.com/jameskim",
      twitter: "https://twitter.com/jameskim",
    }
  },
  {
    id: "7",
    name: "Olivia Martinez",
    title: "Sales & Business Development",
    bio: "Helped B2B startups build and scale their sales processes from 0 to $10M+ ARR. Former VP of Sales at SalesTech.",
    expertise: ["Sales Strategy", "B2B Sales", "Revenue Operations"],
    industries: ["Enterprise SaaS", "MarTech", "HR Tech"],
    rating: 4.7,
    reviewCount: 25,
    availability: "Mornings Only",
    languages: ["English", "Spanish"],
    location: "Miami, FL",
    imageUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=1974&auto=format&fit=crop",
    featured: false,
    verified: true,
    socialLinks: {
      linkedin: "https://linkedin.com/in/oliviamartinez",
    }
  },
  {
    id: "8",
    name: "Michael Chen",
    title: "Blockchain & Web3 Advisor",
    bio: "Founded one of the first DeFi platforms. Advisor to multiple blockchain startups and Web3 projects.",
    expertise: ["Blockchain", "Tokenomics", "Web3 Strategy"],
    industries: ["Crypto", "DeFi", "NFTs"],
    rating: 4.8,
    reviewCount: 33,
    availability: "Flexible",
    languages: ["English", "Mandarin"],
    location: "Singapore",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    featured: false,
    verified: true,
    socialLinks: {
      linkedin: "https://linkedin.com/in/michaelchen",
      twitter: "https://twitter.com/michaelchen",
      github: "https://github.com/michaelchen",
    }
  },
];

// All unique expertise areas
const ALL_EXPERTISE = Array.from(
  new Set(MENTORS.flatMap(mentor => mentor.expertise))
).sort();

// All unique industries
const ALL_INDUSTRIES = Array.from(
  new Set(MENTORS.flatMap(mentor => mentor.industries))
).sort();

// All unique languages
const ALL_LANGUAGES = Array.from(
  new Set(MENTORS.flatMap(mentor => mentor.languages))
).sort();

export default function MentorsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState<string>("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const mentorsPerPage = 6;

  // Load filters from URL on initial load
  useEffect(() => {
    const query = searchParams.get("query") || "";
    const expertise = searchParams.get("expertise") || "";
    const industry = searchParams.get("industry") || "";
    const language = searchParams.get("language") || "";
    const verified = searchParams.get("verified") === "true";
    const page = parseInt(searchParams.get("page") || "1", 10);

    setSearchQuery(query);
    setSelectedExpertise(expertise);
    setSelectedIndustry(industry);
    setSelectedLanguage(language);
    setShowVerifiedOnly(verified);
    setCurrentPage(page);
  }, [searchParams]);

  // Update URL when filters change
  const updateUrlWithFilters = () => {
    const params = new URLSearchParams();

    if (searchQuery) params.set("query", searchQuery);
    if (selectedExpertise) params.set("expertise", selectedExpertise);
    if (selectedIndustry) params.set("industry", selectedIndustry);
    if (selectedLanguage) params.set("language", selectedLanguage);
    if (showVerifiedOnly) params.set("verified", "true");
    if (currentPage > 1) params.set("page", currentPage.toString());

    router.push(`/community/mentors?${params.toString()}`);
  };

  // Apply filters when they change
  useEffect(() => {
    // Skip the initial render to prevent infinite loops
    const timer = setTimeout(() => {
      updateUrlWithFilters();
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedExpertise, selectedIndustry, selectedLanguage, showVerifiedOnly, currentPage]);

  // Filter mentors based on selected filters
  const filteredMentors = MENTORS.filter(mentor => {
    const matchesSearch = searchQuery === "" ||
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase())) ||
      mentor.industries.some(ind => ind.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesExpertise = !selectedExpertise || mentor.expertise.includes(selectedExpertise);
    const matchesIndustry = !selectedIndustry || mentor.industries.includes(selectedIndustry);
    const matchesLanguage = !selectedLanguage || mentor.languages.includes(selectedLanguage);
    const matchesVerified = !showVerifiedOnly || mentor.verified;

    return matchesSearch && matchesExpertise && matchesIndustry && matchesLanguage && matchesVerified;
  });

  // Get current mentors for pagination
  const indexOfLastMentor = currentPage * mentorsPerPage;
  const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;
  const currentMentors = filteredMentors.slice(indexOfFirstMentor, indexOfLastMentor);
  const totalPages = Math.ceil(filteredMentors.length / mentorsPerPage);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedExpertise("");
    setSelectedIndustry("");
    setSelectedLanguage("");
    setShowVerifiedOnly(false);
    setCurrentPage(1);
  };

  return (
    <AnimatedGradientBackground
      colors={["#0ea5e9", "#6366f1", "#8b5cf6"]}
      className="absolute inset-0"
      containerClassName="min-h-screen"
      blur={120}
      speed={40}
      opacity={0.05}
      interactive={false}
    >
      <div className="min-h-screen">
        <DashboardNavbar />

        {/* Hero Section */}
        <div className="relative py-20 px-4 overflow-hidden">
          {/* Background image with overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>

          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>

          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-4xl md:text-5xl font-bold mb-4 text-white"
              >
                Connect with Expert Mentors
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-xl text-gray-100 mb-8"
              >
                Get personalized guidance from industry experts who have been where you want to go
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="max-w-xl mx-auto relative"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for mentors by name, expertise, or industry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-4 px-6 pl-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                  />
                  <IconSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-white" size={22} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          {/* Filters Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mb-10"
          >
            <div className="relative rounded-xl overflow-hidden shadow-md">
              {/* Background with blur effect */}
              <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/50 backdrop-blur-md"></div>

              <div className="relative p-6 border border-white/20 dark:border-white/10 rounded-xl">
                {/* Header with title and toggle button */}
                <div className="flex flex-wrap justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800 dark:text-white">
                    <IconFilter size={22} className="text-blue-500" />
                    Find Your Perfect Mentor
                  </h2>

                  <div className="flex items-center gap-3">
                    <Button
                      onClick={resetFilters}
                      className="text-sm py-2 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <IconFilter size={16} />
                      Reset
                    </Button>

                    <Button
                      onClick={() => setShowFilters(!showFilters)}
                      className="md:hidden text-sm py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all flex items-center gap-2 shadow-md"
                    >
                      <IconAdjustmentsHorizontal size={16} />
                      {showFilters ? "Hide" : "Show"}
                    </Button>
                  </div>
                </div>

                {/* Filter controls */}
                <div className={`${showFilters ? 'block' : 'hidden md:block'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Expertise Filter */}
                    <div className="relative group">
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Expertise</label>
                      <div className="relative">
                        <select
                          value={selectedExpertise}
                          onChange={(e) => setSelectedExpertise(e.target.value)}
                          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        >
                          <option value="">All Expertise</option>
                          {ALL_EXPERTISE.map((expertise) => (
                            <option key={expertise} value={expertise}>
                              {expertise}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Industry Filter */}
                    <div className="relative group">
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Industry</label>
                      <div className="relative">
                        <select
                          value={selectedIndustry}
                          onChange={(e) => setSelectedIndustry(e.target.value)}
                          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        >
                          <option value="">All Industries</option>
                          {ALL_INDUSTRIES.map((industry) => (
                            <option key={industry} value={industry}>
                              {industry}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Language Filter */}
                    <div className="relative group">
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Language</label>
                      <div className="relative">
                        <select
                          value={selectedLanguage}
                          onChange={(e) => setSelectedLanguage(e.target.value)}
                          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        >
                          <option value="">All Languages</option>
                          {ALL_LANGUAGES.map((language) => (
                            <option key={language} value={language}>
                              {language}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Verified Filter */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Verification</label>
                      <label className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 h-[46px]">
                        <input
                          type="checkbox"
                          checked={showVerifiedOnly}
                          onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                          className="rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-gray-700 dark:text-gray-300">Verified Mentors Only</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="mb-8 flex justify-between items-center">
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Showing <span className="text-blue-600 dark:text-blue-400 font-semibold">{currentMentors.length}</span> of <span className="text-blue-600 dark:text-blue-400 font-semibold">{filteredMentors.length}</span> mentors
              </p>
            </div>
          </div>

          {/* Mentors Grid */}
          {currentMentors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentMentors.map((mentor, index) => (
                <motion.div
                  key={mentor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                >
                  <div className="group relative h-full rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 dark:border-white/5 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10">
                    <div className="relative p-6 flex flex-col h-full">
                      {/* Featured Badge */}
                      {mentor.featured && (
                        <div className="absolute top-4 right-4 bg-blue-500/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                          <IconStar size={12} />
                          <span>Featured</span>
                        </div>
                      )}

                      {/* Mentor Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-blue-400/30 dark:border-blue-500/30 shadow-md">
                          <Image
                            src={mentor.imageUrl}
                            alt={mentor.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                            priority={index < 3}
                          />
                          {mentor.verified && (
                            <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                              <IconStar size={14} />
                            </div>
                          )}
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white">{mentor.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{mentor.title}</p>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-gray-700 dark:text-gray-200 mb-5 line-clamp-3 bg-white/30 dark:bg-black/20 backdrop-blur-sm p-3 rounded-lg border border-white/20 dark:border-white/5">
                        {mentor.bio}
                      </p>

                      {/* Expertise */}
                      <div className="mb-4">
                        <h4 className="text-xs uppercase text-gray-600 dark:text-gray-300 mb-2 font-semibold">Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {mentor.expertise.map((skill) => (
                            <span
                              key={skill}
                              className="text-xs bg-blue-100 dark:bg-blue-500/30 text-blue-800 dark:text-blue-100 px-2 py-1 rounded-full border border-blue-200 dark:border-blue-400/20"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Industries */}
                      <div className="mb-4">
                        <h4 className="text-xs uppercase text-gray-600 dark:text-gray-300 mb-2 font-semibold">Industries</h4>
                        <div className="flex flex-wrap gap-2">
                          {mentor.industries.map((industry) => (
                            <span
                              key={industry}
                              className="text-xs bg-purple-100 dark:bg-purple-500/30 text-purple-800 dark:text-purple-100 px-2 py-1 rounded-full border border-purple-200 dark:border-purple-400/20"
                            >
                              {industry}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-2 gap-3 text-xs mb-5 bg-white/30 dark:bg-black/20 backdrop-blur-sm p-3 rounded-lg border border-white/20 dark:border-white/5">
                        <div className="flex items-center gap-2">
                          <IconStar size={16} className="text-yellow-500 dark:text-yellow-400" />
                          <span className="text-gray-700 dark:text-gray-200">{mentor.rating} ({mentor.reviewCount} reviews)</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <IconClock size={16} className="text-gray-500 dark:text-gray-300" />
                          <span className="text-gray-700 dark:text-gray-200">{mentor.availability}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <IconWorld size={16} className="text-gray-500 dark:text-gray-300" />
                          <span className="text-gray-700 dark:text-gray-200">{mentor.languages.join(", ")}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <IconBriefcase size={16} className="text-gray-500 dark:text-gray-300" />
                          <span className="text-gray-700 dark:text-gray-200">{mentor.location}</span>
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className="flex gap-3 mb-5">
                        {mentor.socialLinks.linkedin && (
                          <a href={mentor.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors bg-white/20 dark:bg-white/10 p-2 rounded-full">
                            <IconBrandLinkedin size={18} />
                          </a>
                        )}
                        {mentor.socialLinks.twitter && (
                          <a href={mentor.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors bg-white/20 dark:bg-white/10 p-2 rounded-full">
                            <IconBrandTwitter size={18} />
                          </a>
                        )}
                        {mentor.socialLinks.github && (
                          <a href={mentor.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors bg-white/20 dark:bg-white/10 p-2 rounded-full">
                            <IconBrandGithub size={18} />
                          </a>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-auto flex gap-3">
                        <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md">
                          <IconMessageCircle size={18} />
                          Message
                        </Button>
                        <Button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md">
                          <IconVideo size={18} />
                          Book Session
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">No mentors found matching your filters.</p>
              <Button onClick={resetFilters} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                Reset Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 mb-16">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                    currentPage === 1
                      ? "bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50"
                      : "bg-white/10 backdrop-blur-sm border border-white/20 text-gray-700 dark:text-gray-200 hover:bg-white/20 shadow-md"
                  }`}
                >
                  <IconArrowLeft size={18} />
                  Previous
                </Button>

                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <Button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
                        currentPage === index + 1
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                          : "bg-white/10 backdrop-blur-sm border border-white/20 text-gray-700 dark:text-gray-200 hover:bg-white/20 shadow-md"
                      }`}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>

                <Button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                    currentPage === totalPages
                      ? "bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50"
                      : "bg-white/10 backdrop-blur-sm border border-white/20 text-gray-700 dark:text-gray-200 hover:bg-white/20 shadow-md"
                  }`}
                >
                  Next
                  <IconArrowRight size={18} />
                </Button>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mb-12"
          >
            <div className="relative rounded-2xl overflow-hidden">
              {/* Background image with overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-500/20 to-yellow-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

              <div className="relative p-12 md:p-16">
                <div className="relative text-center max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Become a Mentor</h2>
                  <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                    Share your expertise and help the next generation of entrepreneurs succeed. Join our community of mentors and make a difference.
                  </p>
                  <Button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg transition-all inline-flex items-center gap-2 font-semibold text-lg shadow-lg hover:shadow-xl">
                    Apply to be a Mentor
                    <IconArrowRight size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </AnimatedGradientBackground>
  );
}
