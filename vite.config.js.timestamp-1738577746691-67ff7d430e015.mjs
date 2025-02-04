// vite.config.js
import { defineConfig } from "file:///C:/Users/Amit4/Desktop/cashooz-client-main/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Amit4/Desktop/cashooz-client-main/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    generateSitemap({
      hostname: "https://cashooz.com/",
      // Change to your domain
      dynamicRoutes: ["/dashboard/offers/:networkId", "/dashboard/edit-category/:id"],
      // Add dynamic routes
      exclude: ["/dashboard"]
      // Exclude admin pages if needed
    })
  ],
  server: {
    host: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBbWl0NFxcXFxEZXNrdG9wXFxcXGNhc2hvb3otY2xpZW50LW1haW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEFtaXQ0XFxcXERlc2t0b3BcXFxcY2FzaG9vei1jbGllbnQtbWFpblxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvQW1pdDQvRGVza3RvcC9jYXNob296LWNsaWVudC1tYWluL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIGdlbmVyYXRlU2l0ZW1hcCh7XG4gICAgICBob3N0bmFtZTogXCJodHRwczovL2Nhc2hvb3ouY29tL1wiLCAvLyBDaGFuZ2UgdG8geW91ciBkb21haW5cbiAgICAgIGR5bmFtaWNSb3V0ZXM6IFtcIi9kYXNoYm9hcmQvb2ZmZXJzLzpuZXR3b3JrSWRcIiwgXCIvZGFzaGJvYXJkL2VkaXQtY2F0ZWdvcnkvOmlkXCJdLCAvLyBBZGQgZHluYW1pYyByb3V0ZXNcbiAgICAgIGV4Y2x1ZGU6IFtcIi9kYXNoYm9hcmRcIl0sIC8vIEV4Y2x1ZGUgYWRtaW4gcGFnZXMgaWYgbmVlZGVkXG4gICAgfSksXG4gIF0sXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IHRydWUsXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFQsU0FBUyxvQkFBb0I7QUFDdlYsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLGdCQUFnQjtBQUFBLE1BQ2QsVUFBVTtBQUFBO0FBQUEsTUFDVixlQUFlLENBQUMsZ0NBQWdDLDhCQUE4QjtBQUFBO0FBQUEsTUFDOUUsU0FBUyxDQUFDLFlBQVk7QUFBQTtBQUFBLElBQ3hCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
