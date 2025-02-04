import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import PagesSitemap from "vite-plugin-pages-sitemap";

export default defineConfig({
  plugins: [
    react(),
    PagesSitemap({
      hostname: "https://cashooz.com", // Change to your domain
      exclude: ["/dashboard"], // Exclude admin pages
    }),
  ],
  server: {
    host: true,
  },
});
