import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],

  build: {
    transpile: ['bootstrap'],
  },

  head: {
    script: [
      {
        src: '/_nuxt/assets/js/bootstrap.bundle.min.js',
        type: 'text/javascript',
      },
    ],
  },

  vite: {
    server: {
      allowedHosts: [
        'all',
        'c9fc-2a01-cb0d-999-a800-389a-6460-c633-2bd3.ngrok-free.app',
      ]
    },
  },

  compatibilityDate: '2025-01-27',
})