"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
};

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
  isDarkMode: true,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "theme-preference",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Initialize theme from localStorage or default
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme | null;

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(defaultTheme);
    }
  }, [defaultTheme, storageKey]);

  // Apply theme classes and update isDarkMode state
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove the previous theme class
    root.classList.remove("light", "dark");

    let effectiveTheme: 'light' | 'dark';

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      effectiveTheme = systemTheme as 'light' | 'dark';
    } else {
      root.classList.add(theme);
      effectiveTheme = theme as 'light' | 'dark';
    }

    // Update dark mode state
    setIsDarkMode(effectiveTheme === 'dark');

    // Save the theme preference to localStorage
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      const root = window.document.documentElement;
      const systemTheme = mediaQuery.matches ? "dark" : "light";

      root.classList.remove("light", "dark");
      root.classList.add(systemTheme);

      // Update dark mode state
      setIsDarkMode(systemTheme === 'dark');
    };

    // Initial call to ensure the class is set
    handleChange();

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
    },
    isDarkMode,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
