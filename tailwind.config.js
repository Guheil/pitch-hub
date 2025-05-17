/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Base colors
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        // UI colors
        ui: {
          primary: 'var(--ui-primary)',
          primaryHover: 'var(--ui-primary-hover)',
          secondary: 'var(--ui-secondary)',
          secondaryHover: 'var(--ui-secondary-hover)',
          outline: 'var(--ui-outline)',
          ghost: 'var(--ui-ghost)',
          ghostHover: 'var(--ui-ghost-hover)',
          card: 'var(--ui-card)',
          cardBorder: 'var(--ui-card-border)',
          input: 'var(--ui-input)',
          inputBorder: 'var(--ui-input-border)',
          divider: 'var(--ui-divider)',
        },

        // Text colors
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          inverted: 'var(--text-inverted)',
        },

        // Overlay colors
        overlay: {
          background: 'var(--overlay-background)',
          backdrop: 'var(--overlay-backdrop)',
          card: 'var(--overlay-card)',
          hover: 'var(--overlay-hover)',
        },

        // Status colors
        status: {
          success: 'var(--status-success)',
          error: 'var(--status-error)',
          warning: 'var(--status-warning)',
          info: 'var(--status-info)',
        },

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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "fade-out": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "slide-in-bottom": {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "slide-in-top": {
          "0%": { transform: "translateY(-20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center"
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center"
          }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-in-out",
        "fade-out": "fade-out 0.3s ease-in-out",
        "slide-in-right": "slide-in-right 0.3s ease-in-out",
        "slide-out-right": "slide-out-right 0.3s ease-in-out",
        "slide-in-bottom": "slide-in-bottom 0.4s ease-out",
        "slide-in-top": "slide-in-top 0.4s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "gradient-xy": "gradient-xy 15s ease infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
