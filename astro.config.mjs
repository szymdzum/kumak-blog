// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import deno from '@astrojs/deno';

// https://astro.build/config
export default defineConfig({
  site: 'https://kumak.dev',
  output: 'server',
  adapter: deno(),
  integrations: [mdx(), sitemap()],
  // Configure image optimization
  image: {
    // Use the built-in Deno-compatible image service
    service: {
      entrypoint: 'astro/assets/services/noop',
    },
  },
  markdown: {
    syntaxHighlight: false,
    // rehypePlugins removed
  },
});
