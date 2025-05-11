"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconRocket, IconBulb, IconPresentation } from "@tabler/icons-react";
import AnimatedGradientBackground from "./animated-gradient-background";
import Spotlight from "./spotlight";
import Card3d from "./3d-card";

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  duration = 3000, // Default duration is 3 seconds
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Handle the splash screen timing
  useEffect(() => {
    console.log("Splash screen mounted with duration:", duration);

    // Ensure the splash screen is visible for at least the specified duration
    const timer = setTimeout(() => {
      console.log("Splash screen timer completed after", duration, "ms");
      setIsVisible(false);

      if (onComplete) {
        // Small delay before calling onComplete to allow exit animation to play
        const completeTimer = setTimeout(() => {
          console.log("Calling onComplete callback");
          onComplete();
        }, 500);

        return () => clearTimeout(completeTimer);
      }
    }, duration);

    return () => {
      console.log("Cleaning up splash screen timer");
      clearTimeout(timer);
    };
  }, [duration, onComplete]);

  // Prevent scrolling when splash screen is visible
  useEffect(() => {
    if (isVisible) {
      // Prevent scrolling and ensure full height
      document.body.style.overflow = "hidden";
      document.documentElement.style.height = "100%";
      document.body.style.height = "100%";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      // Restore normal scrolling
      document.body.style.overflow = "";
      document.documentElement.style.height = "";
      document.body.style.height = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      // Clean up
      document.body.style.overflow = "";
      document.documentElement.style.height = "";
      document.body.style.height = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isVisible]);

  // Define animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const logoVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: -15 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.2
      }
    }
  };

  const textCharVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + (i * 0.05),
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  // Create staggered text animation
  const AnimatedText = ({ text, className }: { text: string, className?: string }) => {
    return (
      <span className={cn("inline-block", className)}>
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={textCharVariants}
            initial="hidden"
            animate="visible"
            className="inline-block"
            style={{
              display: char === " " ? "inline" : "inline-block",
              width: char === " " ? "0.5em" : "auto"
            }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    );
  };

  // Create floating icons for visual interest
  const FloatingIcon = ({
    icon,
    delay = 0,
    duration = 5,
    x = 50,
    y = 50
  }: {
    icon: React.ReactNode,
    delay?: number,
    duration?: number,
    x?: number,
    y?: number
  }) => {
    return (
      <motion.div
        className="absolute text-white/20"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.5,
          x: [0, x, 0, -x, 0],
          y: [0, y, -y, 0, y],
          rotate: [0, 10, -10, 5, 0]
        }}
        transition={{
          delay,
          duration,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      >
        {icon}
      </motion.div>
    );
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden w-screen h-screen"
          style={{ height: '100vh', width: '100vw' }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Enhanced background with animated gradient */}
          <AnimatedGradientBackground
            colors={["#0ea5e9", "#6366f1", "#8b5cf6", "#d946ef", "#ec4899"]}
            className="absolute inset-0 w-full h-full"
            containerClassName="w-screen h-screen"
            blur={150}
            speed={15}
            opacity={0.25}
            interactive={true}
          >
            {/* Spotlight effect */}
            <Spotlight className="h-screen w-screen flex items-center justify-center" size={800}>
              <div className="relative max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center h-full">
                {/* Floating icons for visual interest */}
                <FloatingIcon icon={<IconRocket size={32} />} delay={0.2} x={100} y={80} />
                <FloatingIcon icon={<IconBulb size={24} />} delay={0.5} x={-80} y={120} />
                <FloatingIcon icon={<IconPresentation size={28} />} delay={0.8} x={120} y={-70} />

                {/* 3D Card with logo */}
                <Card3d
                  className="mb-8 w-40 h-40 sm:w-48 sm:h-48"
                  rotationIntensity={15}
                  glareOpacity={0.2}
                  glareSize={0.7}
                  shadow={true}
                >
                  <motion.div
                    className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl overflow-hidden"
                    variants={logoVariants}
                  >
                    <div className="relative w-full h-full">
                      {/* Animated background elements */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />

                      {/* Animated circles */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute rounded-full bg-white/10"
                          style={{
                            width: `${(i + 1) * 100}%`,
                            height: `${(i + 1) * 100}%`,
                            left: '50%',
                            top: '50%',
                            x: '-50%',
                            y: '-50%',
                            border: '1px solid rgba(255,255,255,0.2)',
                          }}
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.1, 0.3, 0.1],
                          }}
                          transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5,
                          }}
                        />
                      ))}

                      {/* Logo */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center text-white"
                        initial={{ scale: 0.5, opacity: 0, rotateZ: -10 }}
                        animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                      >
                        <div className="relative w-20 h-20">
                          <Image
                            src="/logo-founder.svg"
                            alt="FoundersFrame Logo"
                            width={80}
                            height={80}
                            className="drop-shadow-lg"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </Card3d>

                {/* Animated title with character-by-character animation */}
                <motion.div
                  className="text-center mb-6"
                  variants={itemVariants}
                >
                  <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500">
                    <AnimatedText text="FoundersFrame" />
                  </h1>
                  <p className="mt-3 text-xl text-gray-600 dark:text-gray-300">
                    <AnimatedText text="Share your ideas with the world" />
                  </p>
                </motion.div>

                {/* Enhanced loading indicator */}
                <motion.div
                  className="w-64 sm:w-80 mt-6"
                  variants={itemVariants}
                >
                  <div className="relative h-2 bg-gray-200/20 dark:bg-gray-800/30 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: duration / 1000 - 0.5,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Animated glow effect */}
                    <motion.div
                      className="absolute inset-y-0 w-20 bg-white/30 blur-sm"
                      initial={{ left: "-10%" }}
                      animate={{ left: "100%" }}
                      transition={{
                        duration: duration / 1000 - 0.5,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  {/* Loading text */}
                  <motion.p
                    className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    Loading your experience...
                  </motion.p>
                </motion.div>
              </div>
            </Spotlight>
          </AnimatedGradientBackground>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
