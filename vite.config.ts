import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['lucide-react', 'node-fetch'],
  },
  resolve: {
    alias: {
      'node-fetch': false,
    },
  },
  build: {
    rollupOptions: {
      external: (id) => {
        // Exclude node-fetch and its dependencies from browser bundle
        if (id === 'node-fetch' || id.startsWith('node-fetch/') || id.startsWith('node:')) {
          return true;
        }
        // Exclude Node.js built-in modules
        if (id.startsWith('node:') || ['fs', 'path', 'crypto', 'http', 'https', 'stream', 'util', 'buffer', 'net', 'worker_threads'].includes(id)) {
          return true;
        }
        return false;
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          ui: ['lucide-react'],
          utils: ['date-fns', 'uuid']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    target: 'esnext',
    minify: 'esbuild',
    commonjsOptions: {
      exclude: ['node-fetch'],
    },
  },
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  }
});
