import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import embed from 'astro-embed';

export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    mdx(),
    embed(),
  ],
});
