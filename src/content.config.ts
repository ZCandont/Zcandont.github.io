import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Schema for the case-study template documented in CLAUDE.md.
// The five-beat narrative (Spotted / Root cause / Plan / Iterations / Proof it's final)
// lives in the Markdown body as H2 sections; frontmatter is the header block only.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(['hardware', 'software', 'analysis', 'content']),
    org: z.enum(['space-startup', 'zipline', 'ucsd-research', 'ucsd-team', 'ucsd-course', 'personal']),
    year: z.string(),
    role: z.string(),
    teamSize: z.number().int().min(1),
    tools: z.array(z.string()),
    featured: z.boolean().default(false),
    links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
  }),
});

export const collections = { projects };
