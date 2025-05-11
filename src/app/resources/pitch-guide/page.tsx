"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import StepCard from "@/components/ui/step-card";
import { Card } from "@/components/ui/Card";
import {
  IconArrowLeft,
  IconChevronRight,
  IconBulb,
  IconAlertTriangle,
  IconDownload,
  IconStar,
  IconCheck,
  IconX,
  IconPresentation,
  IconUsers,
  IconTargetArrow,
  IconClock,
  IconCoin,
  IconChartBar,
  IconBrandYoutube,
  IconFileText
} from "@tabler/icons-react";

// Mock data for pitch guide resources
const PITCH_GUIDE_RESOURCES = [
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
  },
  {
    title: "Pitch Evaluation Checklist",
    type: "PDF",
    size: "720 KB",
    downloadUrl: "/resources/downloads/pitch-evaluation-checklist.pdf"
  }
];

// Pitch guide steps
const PITCH_GUIDE_STEPS = [
  {
    step: 1,
    title: "Define Your Problem Statement",
    description: "Clearly articulate the problem your startup solves. Use data to demonstrate the problem's significance and impact."
  },
  {
    step: 2,
    title: "Present Your Solution",
    description: "Explain how your product or service solves the problem. Highlight your unique approach and value proposition."
  },
  {
    step: 3,
    title: "Know Your Market",
    description: "Define your target market, market size, and growth potential. Show that you understand your customer segments."
  },
  {
    step: 4,
    title: "Explain Your Business Model",
    description: "Detail how your business makes money. Include pricing strategy, revenue streams, and path to profitability."
  },
  {
    step: 5,
    title: "Showcase Your Team",
    description: "Introduce key team members and highlight relevant experience. Explain why your team is uniquely positioned to succeed."
  },
  {
    step: 6,
    title: "Present Traction & Milestones",
    description: "Share progress to date, key metrics, and future milestones. Demonstrate momentum and execution capability."
  },
  {
    step: 7,
    title: "Make Your Ask Clear",
    description: "Specify what you're seeking (funding amount, partnerships, etc.) and how you'll use resources to achieve growth."
  }
];

// Pitch elements
const PITCH_ELEMENTS = [
  {
    icon: <IconBulb size={24} />,
    title: "Problem-Solution Fit",
    description: "Demonstrate a clear connection between the problem you've identified and how your solution addresses it effectively."
  },
  {
    icon: <IconUsers size={24} />,
    title: "Target Audience Clarity",
    description: "Show deep understanding of your customers, their pain points, and why they would choose your solution."
  },
  {
    icon: <IconTargetArrow size={24} />,
    title: "Unique Value Proposition",
    description: "Articulate what makes your offering different and better than alternatives in the market."
  },
  {
    icon: <IconCoin size={24} />,
    title: "Revenue Model",
    description: "Present a clear, realistic path to generating revenue and achieving profitability."
  },
  {
    icon: <IconChartBar size={24} />,
    title: "Market Opportunity",
    description: "Quantify your addressable market and demonstrate significant growth potential."
  },
  {
    icon: <IconClock size={24} />,
    title: "Timing & Urgency",
    description: "Explain why now is the right time for your solution and create a sense of urgency for investment."
  }
];

// Pitch pitfalls
const PITCH_PITFALLS = [
  {
    title: "Information Overload",
    description: "Cramming too much information into your pitch, overwhelming the audience with excessive details."
  },
  {
    title: "Unrealistic Projections",
    description: "Making overly optimistic financial forecasts without solid data or reasonable assumptions to back them up."
  },
  {
    title: "Ignoring Competition",
    description: "Failing to acknowledge competitors or claiming you have no competition, which signals market naivety."
  },
  {
    title: "Technical Jargon",
    description: "Using industry-specific terminology that your audience may not understand, creating confusion."
  },
  {
    title: "Weak Team Presentation",
    description: "Not highlighting the team's relevant experience and why they're uniquely qualified to execute the vision."
  },
  {
    title: "Unclear Ask",
    description: "Not specifying what you're seeking or how you'll use the resources to achieve specific milestones."
  }
];

export default function PitchGuidePage() {
  const [activeStep, setActiveStep] = useState(1);

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
              <span className="text-gray-700 dark:text-gray-300">Pitch Guide</span>
            </nav>
          </div>

          {/* Header Section */}
          <div className="mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              The Ultimate Pitch Guide
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl"
            >
              Learn how to create a compelling pitch that captures attention, communicates your vision effectively, and increases your chances of securing investment.
            </motion.p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Introduction Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-blue-500/10">
                    <IconPresentation size={24} className="text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-bold">Why Your Pitch Matters</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  A great pitch is more than just a presentation—it&apos;s your opportunity to tell your startup&apos;s story in a way that resonates with investors, partners, and customers. Whether you&apos;re pitching for funding, partnerships, or customer acquisition, the principles remain the same: clarity, conciseness, and compelling storytelling.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  This guide will walk you through the essential elements of a successful pitch, common pitfalls to avoid, and expert tips to help you stand out. Follow these guidelines to craft a pitch that not only communicates your vision but also inspires action.
                </p>
              </motion.div>

              {/* Step-by-Step Guide Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-6 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-full bg-purple-500/10">
                    <IconBulb size={24} className="text-purple-500" />
                  </div>
                  <h2 className="text-2xl font-bold">Step-by-Step Pitch Creation</h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {PITCH_GUIDE_STEPS.map((step) => (
                    <div
                      key={step.step}
                      onMouseEnter={() => setActiveStep(step.step)}
                      onClick={() => setActiveStep(step.step)}
                    >
                      <StepCard
                        step={step.step}
                        title={step.title}
                        description={step.description}
                        isActive={activeStep === step.step}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Key Elements Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="p-6 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-full bg-green-500/10">
                    <IconCheck size={24} className="text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold">Key Elements of a Successful Pitch</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PITCH_ELEMENTS.map((element, index) => (
                    <Card key={index} className="p-5 border border-white/10 dark:border-white/5 bg-white/30 dark:bg-black/30">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-white/50 dark:bg-black/50 flex-shrink-0">
                          {element.icon}
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">{element.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{element.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>

              {/* Common Pitfalls Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="p-6 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-full bg-red-500/10">
                    <IconAlertTriangle size={24} className="text-red-500" />
                  </div>
                  <h2 className="text-2xl font-bold">Common Pitfalls to Avoid</h2>
                </div>
                <div className="space-y-4">
                  {PITCH_PITFALLS.map((pitfall, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-white/30 dark:bg-black/30 border border-white/10 dark:border-white/5">
                      <div className="p-2 rounded-full bg-red-500/10 flex-shrink-0">
                        <IconX size={18} className="text-red-500" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">{pitfall.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{pitfall.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Expert Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="p-6 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <IconStar size={20} className="text-yellow-500" />
                  Expert Tips
                </h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/30 dark:bg-black/30 border border-white/10 dark:border-white/5">
                    <p className="text-sm italic mb-2">
                      &quot;Start with why. People don&apos;t buy what you do; they buy why you do it. Your passion and purpose should shine through in every pitch.&quot;
                    </p>
                    <p className="text-sm font-medium">— Simon Sinek, Author & Speaker</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/30 dark:bg-black/30 border border-white/10 dark:border-white/5">
                    <p className="text-sm italic mb-2">
                      &quot;The best pitches tell a story that resonates emotionally while being backed by data that appeals to logic. You need both to be truly compelling.&quot;
                    </p>
                    <p className="text-sm font-medium">— Anya Hayden, Venture Capitalist</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/30 dark:bg-black/30 border border-white/10 dark:border-white/5">
                    <p className="text-sm italic mb-2">
                      &quot;Practice your pitch until you can deliver it naturally, not robotically. The best pitches feel like conversations, not presentations.&quot;
                    </p>
                    <p className="text-sm font-medium">— Mark Cuban, Entrepreneur & Investor</p>
                  </div>
                </div>
              </motion.div>

              {/* Downloadable Resources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="p-6 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5"
              >
                <h3 className="text-xl font-bold mb-4">Resources</h3>
                <div className="space-y-3">
                  {PITCH_GUIDE_RESOURCES.map((resource, index) => (
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
              </motion.div>

              {/* Related Resources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="p-6 rounded-2xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5"
              >
                <h3 className="text-xl font-bold mb-4">Related Resources</h3>
                <div className="space-y-3">
                  <Link
                    href="/resources/pitch-masterclass"
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/10 dark:border-white/5 hover:bg-white/70 dark:hover:bg-black/30 transition-colors"
                  >
                    <div className="p-2 rounded-full bg-blue-500/10 flex-shrink-0">
                      <IconBrandYoutube size={18} className="text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Pitch Masterclass</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Video course • 45 min</p>
                    </div>
                  </Link>
                  <Link
                    href="/resources/templates/pitch-deck"
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/10 dark:border-white/5 hover:bg-white/70 dark:hover:bg-black/30 transition-colors"
                  >
                    <div className="p-2 rounded-full bg-purple-500/10 flex-shrink-0">
                      <IconFileText size={18} className="text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Pitch Deck Template</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Template • PPTX, PDF</p>
                    </div>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </AnimatedGradientBackground>
  );
}
