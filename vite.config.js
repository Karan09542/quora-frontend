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
        target: "https://quora-backend-rosy.vercel.app",
        changeOrigin: true,
        secure: process.env.VITE_BASE_URL?.startsWith("https"), // ऑटोमैटिकली सेट करेगा
      },
      "/question": {
        target: "https://quora-backend-rosy.vercel.app",
        changeOrigin: true,
        secure: process.env.VITE_BASE_URL?.startsWith("https"), // ऑटोमैटिकली सेट करेगा
      },
      "/post": {
        target: "https://quora-backend-rosy.vercel.app",
        changeOrigin: true,
        secure: process.env.VITE_BASE_URL?.startsWith("https"), // ऑटोमैटिकली सेट करेगा
      },
      "/report": {
        target: "https://quora-backend-rosy.vercel.app",
        changeOrigin: true,
        secure: process.env.VITE_BASE_URL?.startsWith("https"), // ऑटोमैटिकली सेट करेगा
      },
      "/preference": {
        target: "https://quora-backend-rosy.vercel.app",
        changeOrigin: true,
        secure: process.env.VITE_BASE_URL?.startsWith("https"), // ऑटोमैटिकली सेट करेगा
      },
      "/search-result": {
        target: "https://quora-backend-rosy.vercel.app",
        changeOrigin: true,
        secure: process.env.VITE_BASE_URL?.startsWith("https"), // ऑटोमैटिकली सेट करेगा
      },
      "/book-mark": {
        target: "https://quora-backend-rosy.vercel.app",
        changeOrigin: true,
        secure: process.env.VITE_BASE_URL?.startsWith("https"), // ऑटोमैटिकली सेट करेगा
      },
      "/comment": {
        target: "https://quora-backend-rosy.vercel.app",
        changeOrigin: true,
        secure: process.env.VITE_BASE_URL?.startsWith("https"), // ऑटोमैटिकली सेट करेगा
      },
    },
  },
  define: {
    global: "globalThis",
  },
});
