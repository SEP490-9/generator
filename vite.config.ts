import { resolve } from 'path'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        input_generator: resolve(__dirname, 'input_generator.html')
      }
    }
  },
  plugins: [svelte()]
})