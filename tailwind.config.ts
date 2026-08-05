import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "space-grotesk": ["var(--font-space-grotesk)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        background: "#050505",
        surface: "#101010",
        "surface-2": "#1a1a1a",
        "surface-3": "#242424",
        purple: {
          DEFAULT: "#8b5cf6",
          light: "#a78bfa",
          dark: "#6d28d9",
          glow: "#7c3aed",
        },
        cyan: {
          DEFAULT: "#06b6d4",
          light: "#22d3ee",
          dark: "#0891b2",
          glow: "#0e7490",
        },
        magenta: {
          DEFAULT: "#ec4899",
          light: "#f472b6",
          dark: "#db2777",
          glow: "#be185d",
        },
        "text-primary": "#ffffff",
        "text-secondary": "#a1a1aa",
        "text-muted": "#52525b",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-aurora":
          "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #ec4899 100%)",
        "gradient-purple-cyan":
          "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
        "gradient-purple-magenta":
          "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
        "gradient-surface":
          "linear-gradient(180deg, #101010 0%, #050505 100%)",
      },
      animation: {
        "blob-float": "blobFloat 8s ease-in-out infinite",
        "blob-float-reverse": "blobFloatReverse 10s ease-in-out infinite",
        "aurora-shift": "auroraShift 12s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "gradient-x": "gradientX 6s ease infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite",
        "border-rotate": "borderRotate 4s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        blobFloat: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
        blobFloatReverse: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-40px, 30px) scale(0.95)" },
          "66%": { transform: "translate(20px, -40px) scale(1.05)" },
        },
        auroraShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        borderRotate: {
          "0%": { "--border-angle": "0deg" },
          "100%": { "--border-angle": "360deg" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glow-purple": "0 0 30px rgba(139, 92, 246, 0.3)",
        "glow-cyan": "0 0 30px rgba(6, 182, 212, 0.3)",
        "glow-magenta": "0 0 30px rgba(236, 72, 153, 0.3)",
        "glow-white": "0 0 20px rgba(255, 255, 255, 0.1)",
        card: "0 25px 50px rgba(0, 0, 0, 0.5)",
        "card-hover": "0 35px 70px rgba(0, 0, 0, 0.7)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
      },
    },
  },
  plugins: [],
};

export default config;
