"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import FeatureCard from "../ui/feature-card";
import TextReveal from "../ui/text-reveal";
import { 
  IconVideo, 
  IconUsers, 
  IconBulb, 
  IconChartBar, 
  IconShield, 
  IconRocket 
} from "@tabler/icons-react";

interface FeaturesSectionProps {
  className?: string;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ className }) => {
  const features = [
    {
      icon: <IconVideo size={24} />,
      title: "Video Pitches",
      description: "Upload and share video pitches to effectively communicate your startup idea.",
    },
    {
      icon: <IconUsers size={24} />,
      title: "Connect with Investors",
      description: "Get your ideas in front of potential investors and collaborators.",
    },
    {
      icon: <IconBulb size={24} />,
      title: "Idea Validation",
      description: "Receive feedback and validation from the community on your startup concept.",
    },
    {
      icon: <IconChartBar size={24} />,
      title: "Analytics Dashboard",
      description: "Track views, engagement, and interest in your startup pitches.",
    },
    {
      icon: <IconShield size={24} />,
      title: "Idea Protection",
      description: "Optional NDA and intellectual property protection features for your ideas.",
    },
    {
      icon: <IconRocket size={24} />,
      title: "Launch Support",
      description: "Resources and tools to help you take your idea from concept to launch.",
    },
  ];

  return (
    <section className={cn("py-20 px-4", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-3"
          >
            <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10">
              Features
            </span>
          </motion.div>
          
          <TextReveal
            text="Everything You Need to Pitch Your Startup"
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
            animationType="slide-up"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Our platform provides all the tools entrepreneurs need to showcase their ideas and connect with the right people.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
