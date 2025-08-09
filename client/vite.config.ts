import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/r': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },  
      '/shorten': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});