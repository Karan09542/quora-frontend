import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      "/user": "https://quora-backend-rosy.vercel.app",
      "/question": "https://quora-backend-rosy.vercel.app",
      "/post": "https://quora-backend-rosy.vercel.app",
      "/report": "https://quora-backend-rosy.vercel.app",
      "/preference": "https://quora-backend-rosy.vercel.app",
      "/search-result": "https://quora-backend-rosy.vercel.app",
      "/book-mark": "https://quora-backend-rosy.vercel.app",
      "/comment": "https://quora-backend-rosy.vercel.app",
    },
  },
  define: {
    global: "globalThis",
  },
});

// {
//   target: "https://quora-backend-rosy.vercel.app",
//   changeOrigin: true,
//   secure: true, // ऑटोमैटिकली सेट करेगा
// },
