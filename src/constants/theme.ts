/**
 * Theme Constants
 *
 * This file contains all color constants used throughout the application.
 * Colors are organized by theme (dark/light) and purpose.
 *
 * Note: This file is designed to be imported by both TypeScript and JavaScript files.
 */

// Common colors used in both themes
export const common = {
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',

  // Brand colors
  brand: {
    blue: {
      primary: '#0057b8',
      light: '#0ea5e9',
      dark: '#003b7a',
      hover: '#0046a1',
    },
    purple: {
      primary: '#5a189a',
      light: '#8b5cf6',
      dark: '#3c0d66',
      hover: '#4a1580',
    },
    red: {
      primary: '#b30000',
      light: '#ef4444',
      dark: '#7f0000',
      hover: '#a00000',
    },
    green: {
      primary: '#006400',
      light: '#10b981',
      dark: '#004d00',
      hover: '#005500',
    },
  },

  // Gradients
  gradients: {
    brand: ['#0ea5e9', '#6366f1', '#8b5cf6', '#d946ef'],
  },
}

// Dark theme colors
export const darkTheme = {
  // Base colors
  background: '#0a0a0a',
  foreground: '#ededed',

  // Text colors
  text: {
    primary: '#ededed',
    secondary: '#a0a0a0',
    muted: '#909090',
    inverted: '#000000',
  },

  // UI Element colors
  ui: {
    primary: '#ededed', // For primary buttons
    primaryHover: '#444444',
    secondary: '#1a1a1a',
    secondaryHover: '#2a2a2a',
    outline: 'rgba(255, 255, 255, 0.145)',
    ghost: 'rgba(255, 255, 255, 0.05)',
    ghostHover: '#1a1a1a',
    card: 'rgba(0, 0, 0, 0.8)',
    cardBorder: 'rgba(255, 255, 255, 0.1)',
    input: '#1a1a1a',
    inputBorder: 'rgba(255, 255, 255, 0.2)',
    divider: 'rgba(255, 255, 255, 0.1)',
    dropdown: '#1a1a1a',
    dropdownHover: '#2a2a2a',
  },

  // Overlay colors
  overlay: {
    background: 'rgba(0, 0, 0, 0.7)',
    backdrop: 'rgba(0, 0, 0, 0.2)',
    card: 'rgba(0, 0, 0, 0.8)',
    hover: 'rgba(0, 0, 0, 0.2)',
  },

  // Status colors
  status: {
    success: common.brand.green.primary,
    error: common.brand.red.primary,
    warning: '#f59e0b',
    info: common.brand.blue.primary,
  },
}

// Light theme colors
export const lightTheme = {
  // Base colors
  background: '#ffffff',
  foreground: '#000000',

  // Text colors
  text: {
    primary: '#000000',
    secondary: '#333333',
    muted: '#444444',
    inverted: '#ffffff',
  },

  // UI Element colors
  ui: {
    primary: common.brand.blue.primary, // For primary buttons
    primaryHover: common.brand.blue.hover,
    secondary: '#f2f2f2',
    secondaryHover: '#e5e5e5',
    outline: 'rgba(0, 0, 0, 0.08)',
    ghost: 'transparent',
    ghostHover: '#f2f2f2',
    card: 'rgba(255, 255, 255, 0.95)',
    cardBorder: 'rgba(0, 0, 0, 0.1)',
    input: '#ffffff',
    inputBorder: 'rgba(0, 0, 0, 0.2)',
    divider: 'rgba(0, 0, 0, 0.1)',
    dropdown: '#f5f5f5',
    dropdownHover: '#e0e0e0',
  },

  // Overlay colors
  overlay: {
    background: 'rgba(255, 255, 255, 0.7)',
    backdrop: 'rgba(240, 240, 240, 0.8)',
    card: 'rgba(255, 255, 255, 0.95)',
    hover: 'rgba(255, 255, 255, 0.2)',
  },

  // Status colors
  status: {
    success: common.brand.green.primary,
    error: common.brand.red.primary,
    warning: '#f59e0b',
    info: common.brand.blue.primary,
  },
}

// Export a combined theme object for easy access
export const theme = {
  common,
  dark: darkTheme,
  light: lightTheme,
}

export default theme;
