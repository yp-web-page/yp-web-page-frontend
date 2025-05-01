import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    hmr: {
      overlay: true
    },
    port: 5173,
    // Active this if you want to use ngrok to expose your local server
    /*host: true,
    port: 5173,
    allowedHosts: [
      'e476-191-102-198-89.ngrok-free.app' // ← replace with your actual ngrok URL
    ],*/
  }
})
