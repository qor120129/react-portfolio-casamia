import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    // find에는 별칭, replacement에는 절대 경로
    alias: {
      "@": path.resolve(__dirname, "src"),
      "pages": path.resolve(__dirname, "src/pages"),
      "components": path.resolve(__dirname, "src/components"),
      "layout": path.resolve(__dirname, "src/layout"),
      "assets": path.resolve(__dirname, "src/assets"),
      "firebaseApp": path.resolve(__dirname, "firebaseApp"),
    }
  },
})
