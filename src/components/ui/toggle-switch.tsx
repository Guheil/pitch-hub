"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
  description?: string;
  className?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  enabled,
  onChange,
  label,
  description,
  className,
  labelClassName,
  descriptionClassName,
  size = "md",
  disabled = false,
}) => {
  const sizes = {
    sm: {
      switch: "h-5 w-9",
      dot: "h-3 w-3",
      translate: enabled ? "translate-x-4" : "translate-x-1",
    },
    md: {
      switch: "h-6 w-11",
      dot: "h-4 w-4",
      translate: enabled ? "translate-x-6" : "translate-x-1",
    },
    lg: {
      switch: "h-7 w-14",
      dot: "h-5 w-5",
      translate: enabled ? "translate-x-8" : "translate-x-1",
    },
  };

  return (
    <div className={cn("flex items-center justify-between py-3", className)}>
      {(label || description) && (
        <div>
          {label && (
            <h3 className={cn("text-sm font-medium", labelClassName)}>
              {label}
            </h3>
          )}
          {description && (
            <p className={cn("text-xs text-gray-500 dark:text-gray-400 mt-1", descriptionClassName)}>
              {description}
            </p>
          )}
        </div>
      )}
      <button
        type="button"
        className={cn(
          "relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          enabled ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700",
          disabled && "opacity-50 cursor-not-allowed",
          sizes[size].switch
        )}
        onClick={() => !disabled && onChange(!enabled)}
        disabled={disabled}
        aria-pressed={enabled}
      >
        <span className="sr-only">{enabled ? "Enabled" : "Disabled"}</span>
        <motion.span
          layout
          className={cn(
            "inline-block transform rounded-full bg-white",
            sizes[size].dot,
            sizes[size].translate
          )}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
