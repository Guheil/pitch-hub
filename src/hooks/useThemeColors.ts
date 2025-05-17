/**
 * useThemeColors Hook
 *
 * A custom hook for accessing theme colors in components
 * Compatible with both JavaScript and TypeScript imports
 */

import { useTheme } from '@/components/theme/theme-provider';
import * as themeConstants from '@/constants/theme';
import { getThemeColor, getCommonColor } from '@/utils/theme-utils';

const theme = themeConstants.theme;

/**
 * Hook to access theme colors based on current theme
 */
export function useThemeColors() {
  const { isDarkMode } = useTheme();
  const mode = isDarkMode ? 'dark' : 'light';
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  /**
   * Get a color from the current theme
   * @param path - Path to the color in the theme object
   */
  const getColor = (path: string) => {
    return getThemeColor(path, mode);
  };

  /**
   * Get a common color (not theme-specific)
   * @param path - Path to the color in the common theme object
   */
  const getCommon = (path: string) => {
    return getCommonColor(path);
  };

  return {
    colors: currentTheme,
    common: theme.common,
    getColor,
    getCommon,
    isDarkMode,
  };
}

export default useThemeColors;
