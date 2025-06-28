import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// import { visualizer } from 'rollup-plugin-visualizer'; // Commented out

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // visualizer({ // Commented out visualizer plugin
    //   open: true, // Automatically open the report in your browser
    //   filename: 'dist/stats.html', // Specify the output file
    //   gzipSize: true, // Show gzipped size
    //   brotliSize: true, // Show brotli size
    // }),
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
  },
  build: {
    sourcemap: true, // Optional: helps with mapping code back to source
    rollupOptions: {
      output: {
        // Keep your manualChunks if you added them earlier
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Example: create a chunk for each top-level dependency
            const parts = id.split('/');
            const packageName = parts[parts.indexOf('node_modules') + 1];
            return `vendor/${packageName}`;
          }
        },
      },
    },
  },
})
