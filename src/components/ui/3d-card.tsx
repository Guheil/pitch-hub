"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Card3dProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  cardClassName?: string;
  glareClassName?: string;
  rotationIntensity?: number;
  glareOpacity?: number;
  glareSize?: number;
  borderRadius?: string;
  shadow?: boolean;
}

export const Card3d = ({
  children,
  className = "",
  containerClassName = "",
  cardClassName = "",
  glareClassName = "",
  rotationIntensity = 10,
  glareOpacity = 0.2,
  glareSize = 0.8,
  borderRadius = "1rem",
  shadow = true,
}: Card3dProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation based on mouse position
    const rotateY = (mouseX / (rect.width / 2)) * rotationIntensity;
    const rotateX = -((mouseY / (rect.height / 2)) * rotationIntensity);

    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      setRotation({ x: rotateX, y: rotateY });

      // Calculate glare position
      const glareX = (mouseX / rect.width) * 100;
      const glareY = (mouseY / rect.height) * 100;
      setGlarePosition({ x: glareX, y: glareY });
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className={cn("perspective-1000", containerClassName)}>
      <motion.div
        ref={cardRef}
        className={cn(
          "relative transition-transform duration-200 ease-out transform-gpu",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          borderRadius,
          boxShadow: shadow && isHovered ? "0 50px 100px -20px rgba(0,0,0,0.2)" : "none",
        }}
      >
        <div
          className={cn(
            "relative z-10 overflow-hidden",
            cardClassName
          )}
          style={{ borderRadius }}
        >
          {children}
        </div>

        {/* Glare effect */}
        {isHovered && (
          <div
            className={cn(
              "absolute inset-0 pointer-events-none z-20",
              glareClassName
            )}
            style={{
              borderRadius,
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glareOpacity}) 0%, rgba(255,255,255,0) ${glareSize * 100}%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Card3d;
