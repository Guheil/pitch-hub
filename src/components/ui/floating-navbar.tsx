import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed top-4 inset-x-0 mx-auto w-fit z-[5000] flex justify-center",
            className
          )}
        >
          <div className="flex items-center justify-center space-x-4 bg-black/10 backdrop-blur-lg border border-white/[0.2] p-2 rounded-full">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.link}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                className={cn(
                  "relative px-4 py-2 rounded-full text-sm font-medium text-white transition-colors",
                  "hover:text-white"
                )}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {item.icon && item.icon}
                  <span>{item.name}</span>
                </span>
                {activeIndex === index && (
                  <motion.div
                    layoutId="pill-tab"
                    transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
                    className="absolute inset-0 bg-white/10 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNav;
