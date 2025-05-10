"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
}

export function Spotlight({
  children,
  className = "",
  size = 400,
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const containerSize = useRef({ w: 0, h: 0 });
  const [visible, setVisible] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mousePosition.current.x = clientX - rect.left;
      mousePosition.current.y = clientY - rect.top;
    }
  };

  const render = () => {
    if (containerRef.current) {
      const { w, h } = containerSize.current;
      const { x, y } = mousePosition.current;
      const speed = 0.15;

      // Calculate the lerped mouse position
      mouse.current.x += (x - mouse.current.x) * speed;
      mouse.current.y += (y - mouse.current.y) * speed;

      // Update the spotlight position
      if (containerRef.current) {
        const spotlightEl = containerRef.current.querySelector(".spotlight") as HTMLElement;
        if (spotlightEl) {
          spotlightEl.style.backgroundImage = `
            radial-gradient(
              circle at ${mouse.current.x}px ${mouse.current.y}px,
              rgba(255, 255, 255, 0.1) 0%,
              transparent ${size}px
            )
          `;
        }
      }

      requestAnimationFrame(render);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerSize.current.w = containerRef.current.offsetWidth;
      containerSize.current.h = containerRef.current.offsetHeight;
    }
    
    setVisible(true);
    requestAnimationFrame(render);
    
    const handleResize = () => {
      if (containerRef.current) {
        containerSize.current.w = containerRef.current.offsetWidth;
        containerSize.current.h = containerRef.current.offsetHeight;
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={onMouseMove}
      className={cn("relative overflow-hidden", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="spotlight absolute inset-0 pointer-events-none"
        style={{
          backgroundBlendMode: "soft-light",
        }}
      />
      {children}
    </motion.div>
  );
}

export default Spotlight;
