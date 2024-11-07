/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Looks inside all src directories and subdirectories
  ],  
  theme: {
    extend: {
      // Updated color scheme in tailwind.config.ts
      colors: {
        primary: "#ff7043", // Lighter orange for primary actions and headers
        secondary: "#ffab91", // Softer orange for secondary actions and highlights
        accent: "#ffccbc", // Even lighter orange accent for interactive elements
        neutral: {
          900: "#121212", // Almost black background
          800: "#1e1e1e", // Dark background for cards and sections
          700: "#2c2c2c", // Slightly lighter for panel borders
          600: "#424242", // Neutral-dark for input backgrounds and other elements
          500: "#616161", // Neutral mid-gray for text and icons
          400: "#757575", // Slightly brighter gray for inactive text
          300: "#9e9e9e", // Light gray for secondary text
          200: "#bdbdbd", // Even lighter for borders
          100: "#e0e0e0", // Almost white for highlights
          50: "#f5f5f5",  // White for cards on dark backgrounds
        },
        error: "#cf6679", // Soft red for error messages, tuned for dark mode
        warning: "#ffa726", // Warm orange for warnings, slightly brighter
        info: "#80d8ff", // Cool blue for informational messages
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Primary font for readability
        mono: ["Fira Code", "monospace"], // Use for code blocks or technical text
      },
      spacing: {
        18: "4.5rem", // Custom spacing values if needed
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.1)", // Custom shadow for cards
        nav: "0 2px 8px rgba(0, 0, 0, 0.05)", // Light shadow for navigation elements
      },
    },
  },
  plugins: [typography],
}

