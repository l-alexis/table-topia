import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: [
      'all',
      'c9fc-2a01-cb0d-999-a800-389a-6460-c633-2bd3.ngrok-free.app',
    ]
  },
  build: {
    rollupOptions: {
      external: ['@prisma/client'], // Exclut Prisma
    },
  },
  optimizeDeps: {
    include: ['@dice-roller/rpg-dice-roller']
  }
});
