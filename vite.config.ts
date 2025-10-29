import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src'),
      '~bootstrap': resolve(dirname(fileURLToPath(import.meta.url)), 'node_modules/bootstrap'),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
     }
  }
})
