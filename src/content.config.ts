import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const memorias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/memorias' }),
  schema: z
    .object({
      title: z.string(),
      slug: z.string(),
      summary: z.string().optional(),
      publishedAt: z.coerce.date(),
      category: z.string().default('crianza'),
      published: z.boolean().default(true),
      tags: z.array(z.string()).default([]),
      ogImage: z.string().optional(),
      series: z.string().optional(),
      part: z.string().optional(),
    })
    .refine((data) => !data.part || data.series, {
      message: 'part requires series to be set',
      path: ['part'],
    }),
});

export const collections = { memorias };
