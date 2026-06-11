import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// Base path. Defaults to the GitHub Pages project subpath (/exin/); the Docker
// build sets VITE_BASE=/ to serve the SPA at the container root. Both `base` and
// the PWA navigateFallback derive from this single value so they never drift.
const base = process.env.VITE_BASE ?? "/exin/";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base,
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "pwa-192x192.png",
        "pwa-512x512.png",
      ],
      manifest: {
        name: "Tu App",
        short_name: "TuApp",
        description: "Descripción de tu app",
        start_url: ".",
        scope: ".",
        display: "standalone",
        theme_color: "#0b0b0b",
        background_color: "#0b0b0b",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        // Para SPAs: sirve index.html en navegación (respeta el base path)
        navigateFallback: `${base}index.html`,
      },
    }),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
}));
