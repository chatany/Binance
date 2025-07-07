import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import autoprefixer from "autoprefixer";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [tailwindcss(), autoprefixer(), react()],
});
