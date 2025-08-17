import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  // ...other configs
  base: mode === 'production' ? '/playwhe-probmasterpro/' : '/',
  plugins: [
    react(),
    // add other plugins if necessary
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
    hmr: {
      port: 8080,
    },
  },
}));