"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import {
  IconVideo,
  IconArrowLeft,
  IconClock,
  IconUser,
  IconStar,
  IconDownload,
  IconShare,
  IconBookmark,
  IconPlayerPlay,
  IconChevronRight,
  IconBrandYoutube,
  IconBrandLinkedin,
  IconBrandTwitter
} from "@tabler/icons-react";

// Mock data for the pitch masterclass
const PITCH_MASTERCLASS = {
  title: "Pitch Masterclass: Creating Compelling Startup Pitches",
  description: "Learn how to create compelling pitch videos and presentations that capture investor attention and effectively communicate your vision.",
  author: "Sarah Johnson",
  authorRole: "Pitch Coach & Former VC",
  authorBio: "Sarah Johnson is a renowned pitch coach who has helped over 200 startups secure more than $150M in funding. She previously worked as a venture capitalist at Sequoia Capital and now dedicates her time to helping entrepreneurs perfect their pitches.",
  duration: "45 min",
  rating: 4.8,
  ratingCount: 342,
  coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
  publishedDate: "October 15, 2023",
  updatedDate: "January 5, 2024",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
  modules: [
    {
      title: "Introduction to Pitch Psychology",
      duration: "8:45",
      description: "Understanding how investors think and what they look for in pitches",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    },
    {
      title: "Crafting Your Story",
      duration: "12:30",
      description: "How to structure your pitch narrative for maximum impact",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    },
    {
      title: "Visual Presentation Techniques",
      duration: "10:15",
      description: "Design principles for creating compelling visual aids",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    },
    {
      title: "Delivery and Body Language",
      duration: "9:20",
      description: "How to present with confidence and authority",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    },
    {
      title: "Handling Q&A Like a Pro",
      duration: "7:50",
      description: "Techniques for answering tough investor questions",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    }
  ],
  resources: [
    {
      title: "Pitch Deck Template",
      type: "PPTX",
      size: "2.4 MB",
      downloadUrl: "/resources/downloads/pitch-deck-template.pptx"
    },
    {
      title: "Pitch Script Template",
      type: "PDF",
      size: "1.1 MB",
      downloadUrl: "/resources/downloads/pitch-script-template.pdf"
    },
    {
      title: "Investor Q&A Cheat Sheet",
      type: "PDF",
      size: "850 KB",
      downloadUrl: "/resources/downloads/investor-qa-cheatsheet.pdf"
    }
  ]
};

export default function PitchMasterclassPage() {
  const [activeModule, setActiveModule] = useState(0);

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
              <span className="text-gray-700 dark:text-gray-300">Pitch Masterclass</span>
            </nav>
          </div>

          {/* Resource Header */}
          <div className="relative rounded-3xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
            
            <div className="relative z-10 p-8 md:p-12 text-white">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium">Video Course</span>
                    <span className="flex items-center gap-1 px-3 py-1 bg-yellow-500/80 backdrop-blur-md rounded-full text-xs font-medium">
                      <IconStar size={12} />
                      Featured
                    </span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{PITCH_MASTERCLASS.title}</h1>
                  
                  <p className="text-white/90 text-lg mb-6 max-w-3xl">
                    {PITCH_MASTERCLASS.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold mr-3">
                        SJ
                      </div>
                      <div>
                        <p className="font-medium">{PITCH_MASTERCLASS.author}</p>
                        <p className="text-sm text-white/70">{PITCH_MASTERCLASS.authorRole}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <IconClock size={18} />
                      <span>{PITCH_MASTERCLASS.duration}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <IconStar size={18} className="text-yellow-400" />
                      <span>{PITCH_MASTERCLASS.rating} ({PITCH_MASTERCLASS.ratingCount} ratings)</span>
                    </div>
                    
                    <div className="flex items-center gap-3 ml-auto">
                      <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                        <IconBookmark size={20} />
                      </button>
                      <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                        <IconShare size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player and Description */}
            <div className="lg:col-span-2">
              {/* Video Player */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black mb-8">
                <iframe
                  src={PITCH_MASTERCLASS.modules[activeModule].videoUrl}
                  className="absolute inset-0 w-full h-full"
                  title={PITCH_MASTERCLASS.modules[activeModule].title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* Module Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  {PITCH_MASTERCLASS.modules[activeModule].title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {PITCH_MASTERCLASS.modules[activeModule].description}
                </p>
              </div>
              
              {/* Author Bio */}
              <div className="p-6 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5 mb-8">
                <h3 className="text-xl font-bold mb-4">About the Instructor</h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    SJ
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{PITCH_MASTERCLASS.author}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{PITCH_MASTERCLASS.authorRole}</p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {PITCH_MASTERCLASS.authorBio}
                    </p>
                    <div className="flex gap-3 mt-4">
                      <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors">
                        <IconBrandLinkedin size={20} />
                      </a>
                      <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                        <IconBrandTwitter size={20} />
                      </a>
                      <a href="#" className="text-gray-500 hover:text-red-500 transition-colors">
                        <IconBrandYoutube size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Share and Download */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-colors">
                  <IconShare size={18} />
                  Share this Course
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-colors">
                  <IconDownload size={18} />
                  Download Resources
                </button>
              </div>
            </div>
            
            {/* Sidebar - Course Modules and Resources */}
            <div className="lg:col-span-1">
              {/* Course Modules */}
              <div className="p-6 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5 mb-6">
                <h3 className="text-xl font-bold mb-4">Course Modules</h3>
                <div className="space-y-3">
                  {PITCH_MASTERCLASS.modules.map((module, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveModule(index)}
                      className={`w-full text-left p-3 rounded-xl flex items-start gap-3 transition-colors ${
                        activeModule === index
                          ? "bg-blue-500/10 border border-blue-500/30"
                          : "hover:bg-white/70 dark:hover:bg-black/30 border border-transparent"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activeModule === index
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}>
                        {activeModule === index ? (
                          <IconPlayerPlay size={16} />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <h4 className={`font-medium ${
                          activeModule === index ? "text-blue-600 dark:text-blue-400" : ""
                        }`}>
                          {module.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {module.duration}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Downloadable Resources */}
              <div className="p-6 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5">
                <h3 className="text-xl font-bold mb-4">Resources</h3>
                <div className="space-y-3">
                  {PITCH_MASTERCLASS.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.downloadUrl}
                      className="block p-3 rounded-xl border border-white/10 dark:border-white/5 hover:bg-white/70 dark:hover:bg-black/30 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{resource.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {resource.type} • {resource.size}
                          </p>
                        </div>
                        <IconDownload size={18} className="text-gray-500" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AnimatedGradientBackground>
  );
}
