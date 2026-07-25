// ============================================================
// YAJMAN — Tailwind Theme Configuration
// Extracted from Figma: "yajman app" → "website design" tab
// ============================================================
//
// FONTS: Only two font families across the entire app:
//   1. Inter      — everything (body, headings, UI, labels, buttons, footer)
//   2. Dancing Script — ONLY for section eyebrow decorative text
//
// ============================================================

import type { Config } from "tailwindcss";

const theme: Config["theme"] = {
  extend: {
    // ─── COLOR SYSTEM ───────────────────────────────────────
    colors: {
      brand: {
        saffron: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fee7d6",
          300: "#ffa33b",
          400: "#fb6000", // ← PRIMARY action color (buttons, CTAs, links)
          500: "#f26522",
          600: "#fb5b32",
          700: "#fd4621",
          800: "#d30b0b",
          900: "#8d4833",
        },
        gold: {
          50: "#fffaf0",
          100: "#fff4ed",
          200: "#f9c108",
          300: "#facc15",
          400: "#dbcc60", // ← ratings, stars, festive elements
          500: "#f4a329",
        },
        navy: {
          DEFAULT: "#1f1f1f", // ← PRIMARY text & dark backgrounds
          50: "#f8f8fa",
          100: "#ebebf0",
          200: "#d1d5db",
          300: "#9ca3af",
          400: "#788094",
          500: "#677489",
          600: "#6b7280",
          700: "#5f556a",
          800: "#232222",
          900: "#1f1f1f",
          950: "#212121ff",
        },
        magenta: {
          DEFAULT: "#e32682", // promotional badges
        },
        purple: {
          DEFAULT: "#7546ff", // premium tier accent
          dark: "#4d40ca",
        },
      },
      surface: {
        DEFAULT: "#ffffff",
        muted: "#f8f8fa",
        warm: "#fffaf0",
        peach: "#fff4ed",
      },
      border: {
        DEFAULT: "#ebebf0",
        dark: "#d1d5db",
        muted: "#cccccc",
      },
      text: {
        primary: "#1f1f1f",
        secondary: "#5f556a",
        muted: "#6b7280",
        light: "#9ca3af",
        inverse: "#ffffff",
      },
      success: "#10b981",
      error: "#d30b0b",
      warning: "#f4a329",
      info: "#4d40ca",
    },

    // ─── TYPOGRAPHY ─────────────────────────────────────────
    // TWO fonts only. Inter for everything. Dancing Script for eyebrows.
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],        // default body + UI
      display: ["Inter", "system-ui", "sans-serif"],     // headings (Inter SemiBold/Bold)
      decorative: ["Dancing Script", "cursive"],          // ONLY eyebrow labels
    },

    fontSize: {
      xs: ["12px", { lineHeight: "16px" }],
      sm: ["14px", { lineHeight: "20px" }],
      base: ["16px", { lineHeight: "24px" }],
      lg: ["18px", { lineHeight: "28px" }],
      xl: ["20px", { lineHeight: "28px" }],
      "2xl": ["24px", { lineHeight: "32px" }],
      "3xl": ["28px", { lineHeight: "36px" }],
      "4xl": ["32px", { lineHeight: "40px" }],
      "5xl": ["36px", { lineHeight: "44px" }],
      "6xl": ["40px", { lineHeight: "48px" }],
      "7xl": ["48px", { lineHeight: "56px" }],
      "8xl": ["52px", { lineHeight: "60px" }],
      "9xl": ["64px", { lineHeight: "72px" }],
      hero: ["68px", { lineHeight: "76px" }],
    },

    // ─── SPACING & LAYOUT ───────────────────────────────────
    maxWidth: {
      site: "1550px",
      content: "1350px",
      narrow: "1200px",
      prose: "720px",
    },

    // ─── BORDER RADIUS ──────────────────────────────────────
    borderRadius: {
      none: "0",
      sm: "4px",
      DEFAULT: "8px",
      md: "12px",
      lg: "16px",
      xl: "20px",
      "2xl": "24px",
      full: "9999px",
    },

    // ─── SHADOWS ────────────────────────────────────────────
    boxShadow: {
      card: "0 2px 12px rgba(26, 26, 46, 0.08)",
      "card-hover": "0 8px 24px rgba(26, 26, 46, 0.12)",
      dropdown: "0 4px 16px rgba(26, 26, 46, 0.1)",
      modal: "0 16px 48px rgba(26, 26, 46, 0.2)",
    },

    // ─── ANIMATIONS ─────────────────────────────────────────
    // Subtle entrance animations for scroll-reveal + drawer menu
    keyframes: {
      // Scroll-reveal: elements fade in with slight upward movement
      "fade-in-up": {
        "0%": { opacity: "0", transform: "translateY(16px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
      // Lighter variant for cards, badges, small items
      "fade-in": {
        "0%": { opacity: "0", transform: "translateY(8px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
      // Scale-in for icons, avatars, badges
      "scale-in": {
        "0%": { opacity: "0", transform: "scale(0.9)" },
        "100%": { opacity: "1", transform: "scale(1)" },
      },
      // Mobile drawer: slides in from left
      "drawer-open": {
        "0%": { transform: "translateX(-100%)" },
        "100%": { transform: "translateX(0)" },
      },
      "drawer-close": {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-100%)" },
      },
      // Drawer backdrop
      "overlay-in": {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
      "overlay-out": {
        "0%": { opacity: "1" },
        "100%": { opacity: "0" },
      },
      // Stagger children (for card grids, list items)
      "stagger-in": {
        "0%": { opacity: "0", transform: "translateY(12px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
    },
    animation: {
      "fade-in-up": "fade-in-up 0.5s ease-out forwards",
      "fade-in": "fade-in 0.3s ease-out forwards",
      "scale-in": "scale-in 0.3s ease-out forwards",
      "drawer-open": "drawer-open 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      "drawer-close": "drawer-close 0.25s ease-in forwards",
      "overlay-in": "overlay-in 0.3s ease-out forwards",
      "overlay-out": "overlay-out 0.25s ease-in forwards",
      "stagger-in": "stagger-in 0.4s ease-out forwards",
    },

    // ─── TRANSITION ─────────────────────────────────────────
    transitionTimingFunction: {
      "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
    },
  },
};

export default theme;

// ============================================================
// USAGE NOTES FOR CLAUDE CODE
// ============================================================
//
// 1. Import this theme in tailwind.config.ts:
//    import theme from "./theme";
//    export default { theme, ... } satisfies Config;
//
// 2. Google Fonts to load (in layout.tsx via next/font/google):
//    - Inter: weights 400, 500, 600, 700, 800
//    - Dancing Script: weight 700
//    That's it. Only two fonts in the entire app.
//
// 3. Font usage rules:
//    - font-sans (Inter) → EVERYTHING: body, headings, buttons,
//      nav, footer, labels, inputs, pricing, cards
//    - font-decorative (Dancing Script) → ONLY section eyebrow
//      labels like "Discover", "why choose us", "Our Testimonial",
//      "Sacred Services", "Book In Minutes", "our support team"
//    - font-display is aliased to Inter so existing classes still work
//
// 4. Key color decisions:
//    - brand-saffron-400 (#fb6000) → PRIMARY action color
//    - brand-navy (#1a1a2e) → PRIMARY text & dark backgrounds
//    - brand-gold-400 (#dbcc60) → ratings, stars, festive
//    - surface-warm (#fffaf0) → alternating section backgrounds
//    - brand-magenta (#e32682) → promotional badges
//
// 5. Animation usage:
//    - Use animate-fade-in-up on sections as they enter viewport
//    - Use animate-stagger-in on card grids with staggered delay
//      via style={{ animationDelay: `${index * 100}ms` }}
//    - Use animate-drawer-open / animate-drawer-close for mobile nav
//    - Use animate-overlay-in / animate-overlay-out for drawer backdrop
//    - All animations should use IntersectionObserver for scroll-trigger
//    - Keep animations SUBTLE: small translateY (8-16px), short duration
//
