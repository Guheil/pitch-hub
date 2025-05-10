"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import TestimonialCard from "../ui/testimonial-card";
import TextReveal from "../ui/text-reveal";

interface TestimonialsSectionProps {
  className?: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ className }) => {
  const testimonials = [
    {
      quote: "PitchHub helped me connect with investors who believed in my vision. Within months, I secured the funding I needed to launch my startup.",
      author: "Sarah Johnson",
      role: "Founder, TechStart",
    },
    {
      quote: "The feedback I received on my pitch was invaluable. It helped me refine my idea and business model before approaching investors.",
      author: "Michael Chen",
      role: "CEO, InnovateCo",
    },
    {
      quote: "As an investor, PitchHub has become my go-to platform for discovering promising startups and innovative ideas worth backing.",
      author: "David Rodriguez",
      role: "Angel Investor",
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
              Testimonials
            </span>
          </motion.div>
          
          <TextReveal
            text="Success Stories from Our Community"
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
            Hear from entrepreneurs and investors who have found success through PitchHub.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              index={index}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-foreground/5 border border-foreground/10">
            <span className="text-lg font-medium">Join hundreds of successful entrepreneurs on PitchHub</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
