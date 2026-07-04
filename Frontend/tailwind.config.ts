import type { Config } from "tailwindcss";
import {
  BRAND_SCALE,
  SECONDARY,
  ACCENT,
  SUCCESS,
  GOLD,
  SANDSTONE,
  FOREST,
  MAROON,
  CRIMSON,
  PURPLE,
  TEAL,
  DESTRUCTIVE,
  WARNING,
  INFO,
  BACKGROUND,
  CARD,
  SECTION_BACKGROUND,
  FOREGROUND,
  BODY_TEXT,
  SECONDARY_TEXT,
  FADED_TEXT,
  BORDER,
  BORDER_HOVER
} from "./src/lib/theme-colors";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1320px" } },
    extend: {
      colors: {
        brand: { DEFAULT: BRAND_SCALE[600], ...BRAND_SCALE },
        secondary: { DEFAULT: SECONDARY, foreground: FOREGROUND },
        accent: { DEFAULT: ACCENT, foreground: FOREGROUND },
        success: { DEFAULT: SUCCESS, foreground: "#ffffff" },
        gold: { DEFAULT: GOLD, foreground: FOREGROUND },
        sandstone: { DEFAULT: SANDSTONE, foreground: FOREGROUND },
        forest: { DEFAULT: FOREST, foreground: "#ffffff" },
        maroon: { DEFAULT: MAROON, foreground: "#ffffff" },
        crimson: { DEFAULT: CRIMSON, foreground: "#ffffff" },
        purple: { DEFAULT: PURPLE, foreground: "#ffffff" },
        teal: { DEFAULT: TEAL, foreground: "#ffffff" },
        destructive: { DEFAULT: DESTRUCTIVE, foreground: "#ffffff" },
        warning: { DEFAULT: WARNING, foreground: FOREGROUND },
        info: { DEFAULT: INFO, foreground: FOREGROUND },
        background: BACKGROUND,
        foreground: FOREGROUND,
        body: BODY_TEXT,
        faded: FADED_TEXT,
        border: { DEFAULT: BORDER, hover: BORDER_HOVER },
        muted: { DEFAULT: SECTION_BACKGROUND, foreground: SECONDARY_TEXT },
        card: { DEFAULT: CARD, foreground: FOREGROUND },
        /* Brand DEFAULT passes WCAG 1.4.11 non-text contrast (8.72:1) on white */
        ring: BRAND_SCALE[600]
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "var(--font-inter)", "sans-serif"]
      },
      borderRadius: { lg: "1rem", xl: "1.25rem", "2xl": "1.5rem", "3xl": "2rem" },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(27,79,114,0.08)",
        card: "0 8px 30px -6px rgba(27,79,114,0.12)",
        glow: "0 0 0 1px rgba(93,173,226,0.2), 0 8px 30px -6px rgba(93,173,226,0.25)"
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        shimmer: { "100%": { transform: "translateX(100%)" } }
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        shimmer: "shimmer 1.5s infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
export default config;
