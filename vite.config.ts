import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Convert to async config to handle dynamic imports
export default defineConfig(async () => {
  // Conditionally load cartographer plugin
  const cartographerPlugin = process.env.NODE_ENV !== "production" && 
                            process.env.REPL_ID !== undefined
    ? [(await import("@replit/vite-plugin-cartographer")).cartographer()]
    : [];

  return {
    plugins: [
      react(),
      runtimeErrorOverlay(),
      themePlugin(),
      ...cartographerPlugin, // Spread conditional plugins
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
        "@tanstack/react-query": path.resolve(__dirname, "node_modules/@tanstack/react-query")
      },
    },
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true,
    },
  };
});