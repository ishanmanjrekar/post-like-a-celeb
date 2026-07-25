import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { stripCrossoriginPlugin } from './src/utils/vite-plugin-crossorigin'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), stripCrossoriginPlugin()],
})
