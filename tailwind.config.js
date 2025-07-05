// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",      // custom breakpoint
        sm: "640px",      // default small
        md: "768px",      // default medium
        lg: "1024px",     // default large
        xl: "1280px",     // default extra large
        "2xl": "1536px",  // default 2x large
      },
    },
  },
  plugins: [],
};
