// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react() , tailwindcss(),],
  base: '',
  build: {
    sourcemap: false,       
    minify: true,     
    outDir: path.resolve(__dirname, '../Jobbyfy extension/sidebar'),
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'injected_bundle.js',        // JS bundle name
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name && chunkInfo.name.endsWith('.css')) return 'injected_style.css';
          return 'assets/[name].[ext]';
        }
      }
    }
  }
});
