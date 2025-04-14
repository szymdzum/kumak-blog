// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import deno from '@astrojs/deno';
import { rehypePrettyCode } from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';
import moonlightTheme from './public/theme/moonlight-ii.json';

// https://astro.build/config
export default defineConfig({
  site: 'https://kumak.dev',
  output: 'server',
  adapter: deno(),
  integrations: [mdx(), sitemap()],
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: moonlightTheme,
          keepBackground: true,
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node) {
            // Add highlighting styles
            node.properties.className.push('highlighted-line');
          },
          onVisitHighlightedWord(node) {
            // Add word highlighting styles
            node.properties.className = ['highlighted-word'];
          },
          transformers: [
            transformerCopyButton({
              visibility: 'hover',
              feedbackDuration: 2000,
            }),
          ],
        },
      ],
    ],
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
