import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import type { Plugin } from "vite";
import { defineConfig } from "vite";

/**
 * GitHub Pages serveert bij een onbekend pad (bijv. /schilderijen) de inhoud van 404.html.
 * Zonder dit bestand krijg je de standaard GitHub-404 en werkt herladen op subroutes niet.
 */
function githubPagesSpaFallback(): Plugin {
  let outDir = "";
  return {
    name: "github-pages-spa-fallback",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const indexHtml = resolve(outDir, "index.html");
      const notFoundHtml = resolve(outDir, "404.html");
      if (existsSync(indexHtml)) {
        copyFileSync(indexHtml, notFoundHtml);
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  // Rootpad: custom domain (doortjes-schilderijen.nl) en GitHub Pages dienen dezelfde build.
  // Voor alleen username.github.io/REPO zonder custom domain: zet base op '/REPO/'.
  base: "/",
  plugins: [react(), tailwindcss(), githubPagesSpaFallback()],
})
