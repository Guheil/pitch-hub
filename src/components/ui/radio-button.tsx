"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RadioButtonProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  disabled?: boolean;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  description,
  icon,
  className,
  labelClassName,
  descriptionClassName,
  disabled = false,
}) => {
  return (
    <div className={cn("flex items-start space-x-3", className)}>
      <div className="flex items-center h-5">
        <input
          id={id}
          name={name}
          type="radio"
          value={value}
          checked={checked}
          onChange={() => !disabled && onChange(value)}
          disabled={disabled}
          className={cn(
            "h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
      </div>
      <div className="min-w-0 flex-1 text-sm">
        <label
          htmlFor={id}
          className={cn(
            "flex items-center gap-2 font-medium cursor-pointer",
            disabled && "opacity-50 cursor-not-allowed",
            labelClassName
          )}
        >
          {icon}
          {label}
        </label>
        {description && (
          <p className={cn("mt-1 text-xs text-gray-500 dark:text-gray-400", descriptionClassName)}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default RadioButton;
