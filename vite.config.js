// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // This will proxy any request starting with /auth to your backend on localhost:8080
      "/auth": "https://yt-editorial-backend.onrender.com",
    },
  },
});
