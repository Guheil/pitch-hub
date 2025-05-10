"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import StepCard from "../ui/step-card";
import TextReveal from "../ui/text-reveal";

interface HowItWorksSectionProps {
  className?: string;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ className }) => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      step: 1,
      title: "Create an Account",
      description: "Sign up for a free account to get started with PitchHub.",
    },
    {
      step: 2,
      title: "Prepare Your Pitch",
      description: "Create a compelling pitch video and description for your startup idea.",
    },
    {
      step: 3,
      title: "Submit Your Idea",
      description: "Upload your pitch and provide details about your startup concept.",
    },
    {
      step: 4,
      title: "Connect & Collaborate",
      description: "Receive feedback, connect with investors, and find collaborators.",
    },
  ];

  return (
    <section className={cn("min-h-screen flex items-center py-20 px-4 bg-foreground/5", className)}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-3"
          >
            <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10">
              How It Works
            </span>
          </motion.div>

          <TextReveal
            text="Simple Process, Powerful Results"
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
            Getting your startup idea in front of the right people is just a few steps away.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Ready to bring your startup idea to life?
          </p>
          <a
            href="/signup"
            className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-6 py-3 font-medium hover:bg-foreground/90 transition-colors"
          >
            Get Started Today
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
