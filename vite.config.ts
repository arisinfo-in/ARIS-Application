import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Plugin to handle Node.js built-in module imports
const nodeBuiltinsPlugin = () => {
  return {
    name: 'node-builtins',
    resolveId(id: string) {
      // Handle Node.js built-in modules and their subpaths
      if (id === 'fs' || id === 'fs/promises' || id.startsWith('fs/') || 
          id === 'node:fs' || id === 'node:fs/promises' || id.startsWith('node:fs/')) {
        return '\0node-builtin:fs';
      }
      if (id === 'path' || id.startsWith('path/') || 
          id === 'node:path' || id.startsWith('node:path/')) {
        return '\0node-builtin:path';
      }
      if (id === 'crypto' || id.startsWith('crypto/') || 
          id === 'node:crypto' || id.startsWith('node:crypto/')) {
        return '\0node-builtin:crypto';
      }
      if (id === 'http' || id.startsWith('http/') || 
          id === 'node:http' || id.startsWith('node:http/')) {
        return '\0node-builtin:http';
      }
      if (id === 'https' || id.startsWith('https/') || 
          id === 'node:https' || id.startsWith('node:https/')) {
        return '\0node-builtin:https';
      }
      if (id === 'stream' || id.startsWith('stream/') || 
          id === 'node:stream' || id.startsWith('node:stream/')) {
        return '\0node-builtin:stream';
      }
      if (id === 'util' || id.startsWith('util/') || 
          id === 'node:util' || id.startsWith('node:util/')) {
        return '\0node-builtin:util';
      }
      if (id === 'buffer' || id.startsWith('buffer/') || 
          id === 'node:buffer' || id.startsWith('node:buffer/')) {
        return '\0node-builtin:buffer';
      }
      if (id === 'net' || id.startsWith('net/') || 
          id === 'node:net' || id.startsWith('node:net/')) {
        return '\0node-builtin:net';
      }
      if (id === 'worker_threads' || id.startsWith('worker_threads/') || 
          id === 'node:worker_threads' || id.startsWith('node:worker_threads/')) {
        return '\0node-builtin:worker_threads';
      }
      if (id === 'zlib' || id.startsWith('zlib/') || 
          id === 'node:zlib' || id.startsWith('node:zlib/')) {
        return '\0node-builtin:zlib';
      }
      return null;
    },
    load(id: string) {
      // Return empty module for all Node.js built-ins
      if (id.startsWith('\0node-builtin:')) {
        return 'export default {};';
      }
      return null;
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodeBuiltinsPlugin()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['lucide-react', 'node-fetch'],
  },
  resolve: {
    alias: {
      // Prevent node-fetch from being bundled - redirect to empty stub
      'node-fetch': path.resolve(__dirname, 'src/utils/node-fetch-stub.ts'),
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
