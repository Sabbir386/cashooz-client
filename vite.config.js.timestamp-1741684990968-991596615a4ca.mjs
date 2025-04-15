// vite.config.js
import { defineConfig } from "file:///C:/Users/Amit4/Desktop/cashooz/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Amit4/Desktop/cashooz/node_modules/@vitejs/plugin-react/dist/index.mjs";
import PagesSitemap from "file:///C:/Users/Amit4/Desktop/cashooz/node_modules/vite-plugin-pages-sitemap/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    PagesSitemap({
      hostname: "https://cashooz.com",
      // Change to your domain
      exclude: ["/dashboard"]
      // Exclude admin pages
    })
  ],
  server: {
    host: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBbWl0NFxcXFxEZXNrdG9wXFxcXGNhc2hvb3pcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEFtaXQ0XFxcXERlc2t0b3BcXFxcY2FzaG9velxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvQW1pdDQvRGVza3RvcC9jYXNob296L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCBQYWdlc1NpdGVtYXAgZnJvbSBcInZpdGUtcGx1Z2luLXBhZ2VzLXNpdGVtYXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgUGFnZXNTaXRlbWFwKHtcbiAgICAgIGhvc3RuYW1lOiBcImh0dHBzOi8vY2FzaG9vei5jb21cIiwgLy8gQ2hhbmdlIHRvIHlvdXIgZG9tYWluXG4gICAgICBleGNsdWRlOiBbXCIvZGFzaGJvYXJkXCJdLCAvLyBFeGNsdWRlIGFkbWluIHBhZ2VzXG4gICAgfSksXG4gIF0sXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IHRydWUsXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1IsU0FBUyxvQkFBb0I7QUFDblQsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sa0JBQWtCO0FBRXpCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxNQUNYLFVBQVU7QUFBQTtBQUFBLE1BQ1YsU0FBUyxDQUFDLFlBQVk7QUFBQTtBQUFBLElBQ3hCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
