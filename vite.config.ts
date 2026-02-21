import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Relatief in productie zodat assets altijd laden op GitHub Pages
  base: process.env.NODE_ENV === "production" ? "./" : "/",
  plugins: [react(), tailwindcss()],
})
