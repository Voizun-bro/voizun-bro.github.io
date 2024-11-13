// @ts-check
import { defineConfig } from 'astro/config';
import embeds from 'astro-embed/integration';

import sitemap from '@astrojs/sitemap';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: 'https://voizun-bro.github.io/',
    integrations: [sitemap(), tailwind(), embeds(), react()],
});