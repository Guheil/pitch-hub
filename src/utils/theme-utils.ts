/**
 * Theme Utilities
 *
 * Helper functions for working with theme colors and styles
 * Compatible with both JavaScript and TypeScript imports
 */

import * as themeConstants from '@/constants/theme';
const theme = themeConstants.theme;

/**
 * Get a color value from the theme based on the current mode
 *
 * @param colorPath - Path to the color in the theme object (e.g., 'ui.primary', 'text.secondary')
 * @param mode - Theme mode ('dark' or 'light')
 * @returns The color value
 */
export function getThemeColor(colorPath: string, mode: 'dark' | 'light' = 'dark'): string {
  const parts = colorPath.split('.');
  let result: unknown = mode === 'dark' ? theme.dark : theme.light;

  for (const part of parts) {
    if (result && typeof result === 'object' && result !== null && part in result) {
      result = (result as Record<string, unknown>)[part];
    } else {
      // If not found in theme-specific colors, try common colors
      result = getCommonColor(colorPath);
      break;
    }
  }

  return typeof result === 'string' ? result : '';
}

/**
 * Get a color from the common theme colors
 *
 * @param colorPath - Path to the color in the common theme object (e.g., 'brand.blue.primary')
 * @returns The color value
 */
export function getCommonColor(colorPath: string): string {
  const parts = colorPath.split('.');
  let result: unknown = theme.common;

  for (const part of parts) {
    if (result && typeof result === 'object' && result !== null && part in result) {
      result = (result as Record<string, unknown>)[part];
    } else {
      return '';
    }
  }

  return typeof result === 'string' ? result : '';
}

/**
 * Generate CSS variables for the theme
 *
 * @param mode - Theme mode ('dark' or 'light')
 * @returns CSS variables as a string
 */
export function generateThemeVariables(mode: 'dark' | 'light' = 'dark'): string {
  const themeObj = mode === 'dark' ? theme.dark : theme.light;
  let cssVars = '';

  // Helper function to flatten nested objects
  const flattenObject = (obj: Record<string, unknown>, prefix = '') => {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      const newKey = prefix ? `${prefix}-${key}` : key;

      if (typeof value === 'object' && value !== null) {
        // Cast the value to Record<string, unknown> since we've verified it's a non-null object
        flattenObject(value as Record<string, unknown>, newKey);
      } else {
        cssVars += `  --${newKey}: ${value};\n`;
      }
    });
  };

  flattenObject(themeObj);
  return cssVars;
}

const themeUtils = {
  getThemeColor,
  getCommonColor,
  generateThemeVariables,
};

export default themeUtils;
