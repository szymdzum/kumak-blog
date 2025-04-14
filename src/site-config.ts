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
    github: {
      name: "GitHub",
      url: "https://github.com/szymdzum",
      icon: `<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path>`
    },
    linkedin: {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/szymon-dzumak",
      icon: `<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle>`
    },
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
