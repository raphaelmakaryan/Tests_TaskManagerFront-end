import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 8081,
    proxy: {
      '/tasks': { // Redirige les appels commençant par /api vers le serveur Spring Boot
        target: 'http://localhost:8080', // Adresse de l'API Spring Boot
        changeOrigin: true, // Requis pour les environnements multi-domaine
      }
    }
  }
})
