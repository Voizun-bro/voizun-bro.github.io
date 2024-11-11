import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    mdx(),
  ],
  vite: {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
    ssr: {
      noExternal: ['lucide-react'],
    },
    plugins: [
      nodePolyfills({include: ['crypto','child_process','os','events','path','stream','util',]}),
    ]
  }
});

