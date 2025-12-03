import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ВАЖНО: Эта строчка говорит сайту, что он лежит в папке /pizza-site/
  base: '/pizza-site/',
})