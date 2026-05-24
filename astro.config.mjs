import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  output: 'hybrid', // Vercel автоматически обработает это как Serverless Functions
  integrations: [
    tailwind(),
    react()
  ],
  vite: {
    optimizeDeps: {
      include: ['three']
    },
    ssr: {
      noExternal: ['three'] // Важно для корректной работы Three.js в SSR
    }
  }
});
