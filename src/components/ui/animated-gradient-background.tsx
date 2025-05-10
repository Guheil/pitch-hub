import React from "react";
import { motion } from "framer-motion";

export const AnimatedGradientBackground = ({
  children,
  className = "",
  containerClassName = "",
  colors = ["#0ea5e9", "#6366f1", "#8b5cf6", "#d946ef"],
  blur = 140,
  speed = 20,
  opacity = 0.15,
  interactive = true,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  blur?: number;
  speed?: number;
  opacity?: number;
  interactive?: boolean;
}) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`relative overflow-hidden ${containerClassName}`}
      onMouseMove={handleMouseMove}
    >
      <div
        className={`absolute inset-0 z-0 overflow-hidden ${className}`}
        style={{ opacity }}
      >
        {colors.map((color, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              backgroundColor: color,
              width: "40%",
              height: "40%",
              borderRadius: "50%",
              filter: `blur(${blur}px)`,
              mixBlendMode: "normal",
              willChange: "transform",
            }}
            animate={{
              x: interactive
                ? mousePosition.x - 200 + Math.sin(index * 45) * 100
                : Math.sin(index * 45 + Date.now() / (1000 * speed)) * 100,
              y: interactive
                ? mousePosition.y - 200 + Math.cos(index * 45) * 100
                : Math.cos(index * 45 + Date.now() / (1000 * speed)) * 100,
            }}
            transition={{
              duration: interactive ? 0.3 : 3,
              ease: "easeOut",
              repeat: interactive ? 0 : Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedGradientBackground;
