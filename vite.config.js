import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      "/user": {
        target: process.env.VITE_BASE_URL || "http://localhost:8000",
        changeOrigin: true,
        secure: process.env.VITE_BASE_URL?.startsWith("https"), // ऑटोमैटिकली सेट करेगा
      },
      "/question": {
        target: process.env.VITE_BASE_URL || "http://localhost:8000",
        changeOrigin: true,
        secure: process.env.VITE_BASE_URL?.startsWith("https"), // ऑटोमैटिकली सेट करेगा
      },
      "/post": {
        target: process.env.VITE_BASE_URL || "http://localhost:8000",
        changeOrigin: true,
        secure: process.env.VITE_BASE_URL?.startsWith("https"), // ऑटोमैटिकली सेट करेगा
      },
      "/report": {
        target: process.env.VITE_BASE_URL || "http://localhost:8000",
        changeOrigin: true,
        secure: process.env.VITE_BASE_URL?.startsWith("https"), // ऑटोमैटिकली सेट करेगा
      },
      "/preference": {
        target: process.env.VITE_BASE_URL || "http://localhost:8000",
        changeOrigin: true,
        secure: process.env.VITE_BASE_URL?.startsWith("https"), // ऑटोमैटिकली सेट करेगा
      },
      "/search-result": {
        target: process.env.VITE_BASE_URL || "http://localhost:8000",
        changeOrigin: true,
        secure: process.env.VITE_BASE_URL?.startsWith("https"), // ऑटोमैटिकली सेट करेगा
      },
      "/book-mark": {
        target: process.env.VITE_BASE_URL || "http://localhost:8000",
        changeOrigin: true,
        secure: process.env.VITE_BASE_URL?.startsWith("https"), // ऑटोमैटिकली सेट करेगा
      },
      "/comment": {
        target: process.env.VITE_BASE_URL || "http://localhost:8000",
        changeOrigin: true,
        secure: process.env.VITE_BASE_URL?.startsWith("https"), // ऑटोमैटिकली सेट करेगा
      },
    },
  },
  define: {
    global: "globalThis",
  },
});
