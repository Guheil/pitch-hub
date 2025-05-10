import React from "react";
import Navbar from "@/components/home/navbar";
import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import HowItWorksSection from "@/components/home/how-it-works-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import CTASection from "@/components/home/cta-section";
import Footer from "@/components/home/footer";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />

      <main>
        <HeroSection />

        <div id="features">
          <FeaturesSection />
        </div>

        <div id="how-it-works">
          <HowItWorksSection />
        </div>

        <div id="testimonials">
          <TestimonialsSection />
        </div>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
