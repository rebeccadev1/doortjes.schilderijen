import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Rootpad: custom domain (doortjes-schilderijen.nl) en GitHub Pages dienen dezelfde build.
  // Voor alleen username.github.io/REPO zonder custom domain: zet base op '/REPO/'.
  base: "/",
  plugins: [react(), tailwindcss()],
})
