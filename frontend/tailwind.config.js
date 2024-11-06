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
  primary: "#d84315", // Dark orange for primary actions and headers
  secondary: "#ff7043", // Lighter orange for secondary actions and highlights
  accent: "#ffab91", // Light orange accent for interactive elements
  neutral: {
    50: "#faf9f5",
    100: "#f5f3ef",
    200: "#e9e6d7",
    300: "#dcd2b9",
    400: "#c5af91",
    500: "#a9906e",
    600: "#8a7054",
    700: "#6c5441",
    800: "#4f3b31",
    900: "#332720",
  },
  error: "#e53935", // Bright red for error messages
  warning: "#ffb74d", // Warm yellow-orange for warnings
  info: "#ff8a65", // Soft orange-pink for informational messages
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

