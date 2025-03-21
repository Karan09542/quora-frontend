import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      "/user": "http://localhost:8000",
      "/question": "http://localhost:8000",
      "/post": "http://localhost:8000",
      "/report": "http://localhost:8000",
      "/preference": "http://localhost:8000",
      "/search-result": "http://localhost:8000",
      "/book-mark": "http://localhost:8000",
      "/comment": "http://localhost:8000",
    },
    // proxy: {
    //   "/user": "https://quora-backend-tawny.vercel.app",
    //   "/question": "https://quora-backend-tawny.vercel.app",
    //   "/post": "https://quora-backend-tawny.vercel.app",
    //   "/report": "https://quora-backend-tawny.vercel.app",
    //   "/preference": "https://quora-backend-tawny.vercel.app",
    //   "/search-result": "https://quora-backend-tawny.vercel.app",
    //   "/book-mark": "https://quora-backend-tawny.vercel.app",
    //   "/comment": "https://quora-backend-tawny.vercel.app",
    // },
  },
  define: {
    global: "globalThis",
  },
});

// {
//   target: "https://quora-backend-tawny.vercel.app",
//   changeOrigin: true,
//   secure: true, // ऑटोमैटिकली सेट करेगा
// },
