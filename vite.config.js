import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import autoprefixer from "autoprefixer";
import React from "react";
export default defineConfig({
  plugins: [tailwindcss(), autoprefixer()],
});
