"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/home/navbar";
import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import HowItWorksSection from "@/components/home/how-it-works-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import CTASection from "@/components/home/cta-section";
import Footer from "@/components/home/footer";
import SplashScreen from "@/components/ui/splash-screen";

export default function Home() {
  // State for managing splash screen and content visibility
  const [splashComplete, setSplashComplete] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Handle splash screen completion
  const handleSplashComplete = () => {
    console.log("Splash screen completed");
    setSplashComplete(true);
  };

  // Check for returning visitors after component mounts
  useEffect(() => {
    // Client-side only code
    if (typeof window !== 'undefined') {
      console.log("Home component mounted");

      // Check if user has visited before
      const hasVisited = sessionStorage.getItem('hasVisited');
      console.log("Has visited before:", hasVisited ? "yes" : "no");

      if (hasVisited) {
        // For returning visitors, we'll skip the splash screen
        // but only after the initial render to prevent hydration issues
        console.log("Returning visitor - will skip splash screen");

        // Still need a small delay to prevent hydration issues
        const timer = setTimeout(() => {
          setSplashComplete(true);
          setShowSplash(false);
        }, 100);

        return () => clearTimeout(timer);
      } else {
        // For new visitors, set the flag for future visits
        console.log("New visitor - showing splash screen");
        sessionStorage.setItem('hasVisited', 'true');
        // Keep showSplash true to display the splash screen
      }
    }
  }, []);

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Show splash screen for new visitors or during initial load */}
      {showSplash && (
        <SplashScreen
          onComplete={handleSplashComplete}
          duration={3000} // Explicitly set to 3 seconds
        />
      )}

      {/* Main Content - hidden until splash screen completes */}
      <div
        className={`transition-opacity duration-500 ${splashComplete ? "opacity-100" : "opacity-0"}`}
        style={{ display: splashComplete ? 'block' : 'none' }}
      >
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
    </div>
  );
}
