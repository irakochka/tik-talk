import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/yt-course': {
        target: 'https://icherniakov.ru',
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
