// Define the site configuration
export const siteConfig = {
  // Site details
  name: 'The Null Hypothesis',
  url: 'https://kumak.dev',
  description: 'A blog about technology, programming, and more',
  tagline: 'Where decade of code meet moments of clarity.',
  image: '/social-image-home.jpg',
  // Author/owner info
  author: 'Kumak',

  // Social media
  socials: {
    twitter: '',
    github: '',
  },

  // Navigation items
  navItems: [
    { title: 'Home', href: '/' },
    { title: 'Projects', href: '/projects' },
    { title: 'Blog', href: '/blog' },
    { title: 'About', href: '/about' },
  ],
} as const;

// Infer the type from the object itself
export type SiteConfig = typeof siteConfig;

// Featured projects data
export const featuredProjects = [
  {
    title: 'Result Monad',
    description: 'TypeScript implementation of the Result monad pattern',
    tags: ['TypeScript', 'Monad', 'Error Handling'],
    githubUrl: 'https://github.com/szymdzum/ts-result-monad',
    demoUrl: 'https://demo-url.com',
    featured: true,
  },
  {
    title: 'Markdown Blog',
    description: 'A static site generator for markdown-based blogs with code syntax highlighting',
    tags: ['JavaScript', 'Node.js', 'Markdown'],
    githubUrl: 'https://github.com/username/markdown-blog',
    featured: true,
  },
  {
    title: 'CLI Task Manager',
    description: 'A command-line interface for managing tasks and projects with Git integration',
    tags: ['Rust', 'CLI', 'Productivity'],
    githubUrl: 'https://github.com/username/cli-task-manager',
    featured: true,
  },
  {
    title: 'Personal Portfolio',
    description: 'A responsive portfolio website built with modern web technologies',
    tags: ['TypeScript', 'React', 'Next.js'],
    githubUrl: 'https://github.com/username/portfolio',
    featured: false,
  },
];
