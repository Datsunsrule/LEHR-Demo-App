import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base defaults to the GitHub Pages project path but can be overridden for other
// hosts (e.g. VITE_BASE=/ for root deploys or local previews).
export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: process.env.VITE_BASE || '/LEHR-Demo-App/',
})
