import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite config
    define: {
      __APP_ENV__: env.APP_ENV
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@@': path.resolve(__dirname, './')
      }
    },
    plugins: [vue()],
    preview: {
      open: true
    }
  }
})
