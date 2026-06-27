import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/pixel-gate/',
  plugins: [react()],
  server: {
    proxy: {
      '/Games': {
        target: 'http://localhost:5162',
        changeOrigin: true,
      },
    },
  },
})
