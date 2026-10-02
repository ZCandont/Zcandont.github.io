import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Schema for the case-study template documented in CLAUDE.md.
// The five-beat narrative (Spotted / Root cause / Plan / Iterations / Proof it's final)
// lives in the Markdown body as H2 sections; frontmatter is the header block only.
// status 'in-progress' = a current project whose report is still being written: only title,
// category, org and year are required, and the page says the report is in progress.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['complete', 'in-progress']).default('complete'),
    summary: z.string().optional(),
    category: z.enum(['hardware', 'software', 'analysis', 'content']),
    org: z.enum(['space-startup', 'zipline', 'ucsd-research', 'ucsd-team', 'ucsd-course', 'personal']),
    year: z.string(),
    role: z.string().optional(),
    teamSize: z.number().int().min(1).optional(),
    tools: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    // Homepage plate image (a path under /public). coverNegative inverts a white-background chart so it sits on the black page.
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    coverNegative: z.boolean().default(false),
    links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
  }),
});

export const collections = { projects };
