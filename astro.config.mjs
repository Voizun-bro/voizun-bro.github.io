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
    plugins: [
      nodePolyfills({include: ['crypto','child_process','os','events','path','stream','util',]}),
    ]
  }
});

