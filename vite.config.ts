import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // three.js ships in its own lazy ParticleField chunk (~880 kB min, ~240 kB gzip), off the critical path
  build: { chunkSizeWarningLimit: 1000 },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
