import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // three + R3F go in their own named chunk, fetched only via the lazy ParticleField import.
    // React is pinned to the entry-side 'react' chunk: otherwise Rollup hoists it into the
    // 'three' chunk (R3F depends on it) and index.html would modulepreload three eagerly.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/[\\/]node_modules[\\/](three|@react-three[\\/]fiber)[\\/]/.test(id)) return 'three';
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react';
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
