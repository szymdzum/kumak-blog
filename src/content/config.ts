import { glob } from 'astro/loaders';
import { defineCollection, z as schema } from 'astro:content';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: schema.object({
    title: schema.string(),
    description: schema.string(),
    heroImage: schema.string().optional(),
    pubDate: schema.coerce.date(),
    updatedDate: schema.coerce.date().optional(),
  }),
});

export const collections = { blog };
