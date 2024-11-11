import { defineConfig } from 'astro/config';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [
    nodePolyfills(),
    tailwind(),
    react(),
    mdx(),
  ],
});

