import { getCollection } from 'astro:content';

// Project lists shared by the homepage and /portfolio.
export const orgLabel = {
  'space-startup': 'Space startup',
  zipline: 'Zipline',
  'ucsd-research': 'UCSD research',
  'ucsd-team': 'UCSD team',
  'ucsd-course': 'UCSD course',
  personal: 'Personal',
} as const;

export interface Item {
  title: string;
  code: string[];
  text?: string;
  href?: string;
  featured?: boolean;
  cover?: string;
  coverAlt?: string;
  negative?: boolean;
}

export async function getProjects() {
  const all = await getCollection('projects');
  const toItem = (p: (typeof all)[number]): Item => ({
    title: p.data.title,
    code: [p.data.category, p.data.year, orgLabel[p.data.org]],
    text: p.data.summary,
    href: `/projects/${p.id}/`,
    featured: p.data.featured,
    cover: p.data.cover,
    coverAlt: p.data.coverAlt,
    negative: p.data.coverNegative,
  });

  // Case studies: featured first, then image-led ones (so a text-only study closes the set), then newest first.
  const caseStudies = all
    .filter((p) => p.data.status === 'complete')
    .sort(
      (a, b) =>
        Number(b.data.featured) - Number(a.data.featured) ||
        Number(!!b.data.cover) - Number(!!a.data.cover) ||
        Number(b.data.year) - Number(a.data.year),
    )
    .map(toItem);

  // Current projects: reports still being written. Order is the order Zach listed them.
  const order = ['quant-trading-api', 'ai-structural-optimizing-agent', 'formula-1-wing-design', 'camera-gimbal-mount', 'catan-ai-player'];
  const inProgress = all
    .filter((p) => p.data.status === 'in-progress')
    .sort((a, b) => (order.indexOf(a.id) + 1 || 99) - (order.indexOf(b.id) + 1 || 99))
    .map(toItem);

  // Earlier work: shell copy until each gets its own case-study page.
  const earlier: Item[] = [
    { title: 'Stepped-lap repair patch', code: ['hardware', '2023', 'Composite NDE and Repair Lab'], text: 'Designed a fiberglass repair joint, modeled its load path with a Volkersen analysis, and tested it past 10 kN in tension.' },
    { title: 'Ultrasonic C-scan', code: ['hardware', '2023', 'Structural Health Monitoring Lab'], text: 'Built an immersion C-scan setup and analysis code that maps disbond defects in a composite wing skin.' },
    { title: 'FSAE rear wing', code: ['hardware', '2022', 'Triton Racing'], text: 'Designed a multi-element rear wing for low-speed downforce. The car finished 8th overall and 8th in efficiency.' },
  ];

  return { all, caseStudies, inProgress, earlier };
}
