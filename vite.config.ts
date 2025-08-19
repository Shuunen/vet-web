import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// oxlint-disable-next-line no-anonymous-default-export, no-default-export
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react')) return 'react'
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
  plugins: [tanstackRouter({ autoCodeSplitting: true, target: 'react' }), react(), tailwindcss()],
  resolve: {
    alias: {
      // oxlint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
})
