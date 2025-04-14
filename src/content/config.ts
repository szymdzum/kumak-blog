import { glob } from 'astro/loaders';
import { defineCollection, z as schema } from 'astro:content';

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: schema.object({
    title: schema.string(),
    description: schema.string(),
    // Transform string to Date object
    pubDate: schema.coerce.date(),
    updatedDate: schema.coerce.date().optional(),
    heroImage: schema.string().optional(),
  }),
});

export const collections = { blog };
