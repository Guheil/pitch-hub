"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import Spotlight from "@/components/ui/spotlight";
import { Card3d } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  IconBrandTwitter,
  IconBrandLinkedin,
  IconMail,
  IconMapPin,
  IconHeart,
  IconBulb,
  IconRocket,
  IconUsers,
  IconArrowRight,
  IconBrandGithub,
} from "@tabler/icons-react";

// Team member data
const teamMembers = [
  {
    name: "Xavier Gael San Juan",
    role: "Founder & Lead Developer",
    bio: "Visionary developer with a passion for creating platforms that empower entrepreneurs to showcase their ideas.",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop",
    social: {
      twitter: "https://twitter.com/xaviergael",
      linkedin: "https://linkedin.com/in/xaviergael",
      github: "https://github.com/xaviergael",
    },
  },
  {
    name: "Andriq Klyne Ajido",
    role: "Co-Founder & Technical Architect",
    bio: "Technical innovator focused on building scalable and robust platforms for the startup ecosystem.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    social: {
      twitter: "https://twitter.com/andriqklyne",
      linkedin: "https://linkedin.com/in/andriqklyne",
      github: "https://github.com/andriqklyne",
    },
  },
  {
    name: "Maira Francine Rosales",
    role: "Co-Founder & Design Lead",
    bio: "Creative designer dedicated to crafting intuitive and engaging user experiences for startup platforms.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    social: {
      twitter: "https://twitter.com/mairafrancine",
      linkedin: "https://linkedin.com/in/mairafrancine",
      github: "https://github.com/mairafrancine",
    },
  },
];

// Company values
const companyValues = [
  {
    title: "Innovation",
    description: "We believe in pushing boundaries and exploring new ideas that can transform the startup ecosystem.",
    icon: <IconBulb size={32} />,
  },
  {
    title: "Community",
    description: "We're building a supportive network where entrepreneurs can connect, learn, and grow together.",
    icon: <IconUsers size={32} />,
  },
  {
    title: "Accessibility",
    description: "We're committed to making entrepreneurship resources accessible to everyone, regardless of background.",
    icon: <IconHeart size={32} />,
  },
  {
    title: "Impact",
    description: "We measure our success by the positive change our platform brings to founders and their communities.",
    icon: <IconRocket size={32} />,
  },
];

export default function DashboardAboutPage() {
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

        {/* Hero Section */}
        <Spotlight className="min-h-[80vh] flex flex-col items-center justify-center p-4 pt-24 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"></div>

          <div className="max-w-5xl mx-auto text-center px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm text-sm"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-medium">Our Story</span>
              <div className="w-2 h-2 rounded-full bg-purple-600 ml-2"></div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
            >
              About FoundersFrame
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-20"></div>
              <div className="relative bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <p className="text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto">
                  Empowering the next generation of entrepreneurs to share their vision and connect with a community of innovators.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12"
            >
              <Link href="#mission">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/20"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>
        </Spotlight>

        {/* Our Mission Section */}
        <section id="mission" className="py-24 px-4 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-40 right-0 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl"></div>
          <div className="absolute bottom-40 left-0 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"></div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm text-sm mb-4">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-medium">Why We Exist</span>
              </div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Our Mission</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-lg">
                  <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                    At FoundersFrame, we're on a mission to democratize entrepreneurship by providing a platform where innovative ideas can be shared, refined, and brought to life.
                  </p>
                  <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                    Founded by Xavier, Andriq, and Maira, our platform was born from a shared vision to create a space where entrepreneurs from all backgrounds can showcase their ideas and connect with the resources they need to succeed.
                  </p>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    Though we're just getting started, we're committed to building a supportive ecosystem that bridges the gap between visionary founders and the feedback, mentorship, and connections they need to transform their ideas into reality.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card3d
                  className="h-full"
                  rotationIntensity={3}
                  glareOpacity={0.2}
                  glareSize={0.6}
                  shadow={true}
                  cardClassName="bg-gradient-to-b from-white/30 to-white/10 dark:from-black/30 dark:to-black/10 backdrop-blur-md border border-white/30 dark:border-white/10 h-full rounded-xl overflow-hidden"
                >
                  <div className="relative h-[400px] rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-purple-600/30 mix-blend-overlay rounded-xl"></div>
                    <Image
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                      alt="Team collaboration"
                      fill
                      className="object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">Building Together</h3>
                      <p className="text-white/80">Our journey has just begun</p>
                    </div>
                  </div>
                </Card3d>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Journey Section */}
        <section className="py-24 px-4 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-1/3 left-0 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-0 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"></div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm text-sm mb-4">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-medium">Where We're Headed</span>
              </div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Our Journey Begins</h2>
              <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                Though our journey has just begun, we're excited about the path ahead as we build FoundersFrame with a deep commitment to supporting entrepreneurs.
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1.5 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>

              {/* Timeline Items */}
              <div className="space-y-32 relative">
                <TimelineItem
                  year={`${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                  title="The Idea"
                  description="FoundersFrame was conceived as a platform to democratize access to entrepreneurial resources and provide a space for innovators to showcase their ideas."
                  isLeft={true}
                  icon={<IconBulb size={24} />}
                />

                <TimelineItem
                  year={`${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                  title="Team Formation"
                  description="Xavier, Andriq, and Maira joined forces, combining their expertise in development, architecture, and design to bring FoundersFrame to life."
                  isLeft={false}
                  icon={<IconUsers size={24} />}
                />

                <TimelineItem
                  year="Today"
                  title="Development Begins"
                  description="Our team immediately began developing the platform, focusing on creating an intuitive and engaging user experience for entrepreneurs."
                  isLeft={true}
                  icon={<IconRocket size={24} />}
                />

                <TimelineItem
                  year="Coming Soon"
                  title="Official Launch"
                  description="We're working diligently to prepare FoundersFrame for its official launch, where we'll begin supporting entrepreneurs from around the world."
                  isLeft={false}
                  icon={<IconHeart size={24} />}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm text-sm mb-4">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-medium">The Founders</span>
              </div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Meet Our Team</h2>
              <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                The passionate individuals behind FoundersFrame, dedicated to empowering entrepreneurs and fostering innovation.
              </p>
            </motion.div>

            {/* Centered team members with larger cards */}
            <div className="flex flex-col items-center justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                {teamMembers.map((member, index) => (
                  <TeamMemberCard key={index} member={member} index={index} />
                ))}
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -left-20 top-1/2 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute -right-20 top-1/3 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl"></div>
        </section>

        {/* Values Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-foreground/5 to-foreground/10 backdrop-blur-sm relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-1/4 left-0 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"></div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm text-sm mb-4">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-medium">What We Stand For</span>
              </div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Our Values</h2>
              <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                The core principles that guide everything we do at FoundersFrame.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyValues.map((value, index) => (
                <ValueCard key={index} value={value} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-foreground/10">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-foreground/60">
              &copy; {new Date().getFullYear()} FoundersFrame. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </AnimatedGradientBackground>
  );
}

// Timeline Item Component
function TimelineItem({ year, title, description, isLeft, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`flex items-center ${isLeft ? 'flex-row-reverse' : ''}`}
    >
      <div className={`w-1/2 ${isLeft ? 'text-right pr-16' : 'pl-16'}`}>
        <Card3d
          className="h-full"
          rotationIntensity={2}
          glareOpacity={0.1}
          glareSize={0.4}
          shadow={true}
          cardClassName="bg-gradient-to-b from-white/40 to-white/20 dark:from-black/30 dark:to-black/10 backdrop-blur-md border border-white/30 dark:border-white/10 h-full rounded-xl overflow-hidden"
        >
          <div className="p-6">
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">{title}</h3>
            <div className="w-10 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4"></div>
            <p className="text-foreground/80">{description}</p>
          </div>
        </Card3d>
      </div>

      <div className="relative">
        {/* Center dot with icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg z-10">
          {icon}
        </div>

        {/* Year label */}
        <div className={`absolute top-1/2 transform -translate-y-1/2 ${isLeft ? 'right-20' : 'left-20'} bg-white/20 dark:bg-black/20 backdrop-blur-md px-4 py-1 rounded-full border border-white/20 text-sm font-medium`}>
          {year}
        </div>
      </div>

      <div className="w-1/2"></div>
    </motion.div>
  );
}

// Team Member Card Component
function TeamMemberCard({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex justify-center"
    >
      <Card3d
        className="h-full w-full max-w-sm"
        rotationIntensity={5}
        glareOpacity={0.15}
        glareSize={0.5}
        shadow={true}
        cardClassName="bg-gradient-to-b from-white/60 to-white/30 dark:from-black/30 dark:to-black/10 backdrop-blur-md border border-white/30 dark:border-white/10 h-full rounded-xl overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Gradient top bar */}
          <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>

          <div className="p-8 flex flex-col h-full">
            {/* Avatar with gradient border */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-1 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">{member.name}</h3>
              <p className="text-foreground/70 font-medium mb-4">{member.role}</p>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4 rounded-full"></div>
              <p className="text-foreground/80 mb-6">{member.bio}</p>
            </div>

            <div className="flex justify-center gap-4 mt-auto">
              <Link href={member.social.twitter} className="transform transition-transform hover:scale-110">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 hover:bg-blue-500/20"
                >
                  <IconBrandTwitter size={18} className="text-blue-500" />
                </Button>
              </Link>
              <Link href={member.social.linkedin} className="transform transition-transform hover:scale-110">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 hover:bg-blue-700/20"
                >
                  <IconBrandLinkedin size={18} className="text-blue-700" />
                </Button>
              </Link>
              <Link href={member.social.github} className="transform transition-transform hover:scale-110">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 hover:bg-gray-700/20"
                >
                  <IconBrandGithub size={18} className="text-gray-700 dark:text-gray-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card3d>
    </motion.div>
  );
}

// Value Card Component
function ValueCard({ value, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card3d
        className="h-full"
        rotationIntensity={3}
        glareOpacity={0.1}
        glareSize={0.4}
        shadow={true}
        cardClassName="bg-gradient-to-b from-white/40 to-white/20 dark:from-black/30 dark:to-black/10 backdrop-blur-md border border-white/30 dark:border-white/10 h-full rounded-xl overflow-hidden group-hover:border-blue-500/30 dark:group-hover:border-blue-500/20 transition-all duration-300"
      >
        <div className="p-8 flex flex-col items-center text-center h-full">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <div className="text-blue-500 dark:text-blue-400 transform group-hover:scale-110 transition-transform duration-300">
              {value.icon}
            </div>
          </div>

          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">{value.title}</h3>

          <div className="w-10 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 group-hover:w-16 transition-all duration-300"></div>

          <p className="text-foreground/80">{value.description}</p>
        </div>
      </Card3d>
    </motion.div>
  );
}
