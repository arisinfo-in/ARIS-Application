import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['lucide-react', 'node-fetch'],
  },
  resolve: {
    alias: {
      // Prevent node-fetch from being bundled - redirect to empty stub
      'node-fetch': path.resolve(__dirname, 'src/utils/node-fetch-stub.ts'),
      // Stub Node.js built-in modules for browser compatibility
      'fs': path.resolve(__dirname, 'src/utils/node-stubs.ts'),
      'path': path.resolve(__dirname, 'src/utils/node-stubs.ts'),
      'crypto': path.resolve(__dirname, 'src/utils/node-stubs.ts'),
      'http': path.resolve(__dirname, 'src/utils/node-stubs.ts'),
      'https': path.resolve(__dirname, 'src/utils/node-stubs.ts'),
      'stream': path.resolve(__dirname, 'src/utils/node-stubs.ts'),
      'util': path.resolve(__dirname, 'src/utils/node-stubs.ts'),
      'buffer': path.resolve(__dirname, 'src/utils/node-stubs.ts'),
      'net': path.resolve(__dirname, 'src/utils/node-stubs.ts'),
      'worker_threads': path.resolve(__dirname, 'src/utils/node-stubs.ts'),
      'zlib': path.resolve(__dirname, 'src/utils/node-stubs.ts'),
      // Also handle node: prefixed imports
      'node:fs': path.resolve(__dirname, 'src/utils/node-stubs.ts'),
      'node:path': path.resolve(__dirname, 'src/utils/node-stubs.ts'),
      'node:crypto': path.resolve(__dirname, 'src/utils/node-stubs.ts'),
      'node:http': path.resolve(__dirname, 'src/utils/node-stubs.ts'),
      'node:https': path.resolve(__dirname, 'src/utils/node-stubs.ts'),
      'node:stream': path.resolve(__dirname, 'src/utils/node-stubs.ts'),
      'node:util': path.resolve(__dirname, 'src/utils/node-stubs.ts'),
      'node:buffer': path.resolve(__dirname, 'src/utils/node-stubs.ts'),
      'node:net': path.resolve(__dirname, 'src/utils/node-stubs.ts'),
      'node:zlib': path.resolve(__dirname, 'src/utils/node-stubs.ts'),
    },
  },
  build: {
    rollupOptions: {
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
