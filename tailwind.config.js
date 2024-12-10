/** @type {import('tailwindcss').Config} */
export default {
  // Specify which files Tailwind should scan for class names
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}", // Scans all source files for Tailwind classes
  ],
  theme: {
    extend: {
      // Place to extend/override Tailwind's default theme
      // Example: colors, spacing, typography, etc.
    },
  },
  plugins: [], // Array for Tailwind plugins like @tailwindcss/forms, @tailwindcss/typography
} 