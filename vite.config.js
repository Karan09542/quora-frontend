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
  },
  define: {
    global: "globalThis",
  },
});
