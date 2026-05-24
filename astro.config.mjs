import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  // В Astro 5 режим 'static' (по умолчанию) автоматически поддерживает API Routes на Vercel
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
