export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  homepage?: string;
  createdAt: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
}

export const projectsData: Project[] = [
  {
    id: "r4l-blog-v2",
    name: "r4l-blog-v2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A personal blog and portfolio website built with modern web technologies, featuring an AI-powered chatbot, dynamic theming, and responsive design.",
    technologies: ["Vue.js", "Nuxt.js", "TypeScript", "Tailwind CSS", "DaisyUI", "OpenAI"],
    githubUrl: "https://github.com/rafaeltj13/r4l-blog-v2",
    homepage: "https://r4l-blog-v2.vercel.app",
    createdAt: "2026-01-05",
    language: "Vue",
    stargazers_count: 0,
    forks_count: 0,
    open_issues_count: 0,
    updated_at: "2026-01-12T14:16:46Z"
  },
  {
    id: "blog",
    name: "blog",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. The first version of my personal blog, exploring SSR concepts and modern frontend development practices.",
    technologies: ["TypeScript", "Next.js", "React", "Tailwind CSS"],
    githubUrl: "https://github.com/rafaeltj13/blog",
    homepage: "https://blog-weld-two-55.vercel.app",
    createdAt: "2025-01-26",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    open_issues_count: 0,
    updated_at: "2025-06-04T12:51:23Z"
  },
  {
    id: "dota2brain",
    name: "dota2brain",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore. A project related to Dota 2 game, exploring game data analysis and visualization.",
    technologies: ["Vue.js", "Nuxt.js", "Supabase"],
    githubUrl: "https://github.com/rafaeltj13/dota2brain",
    createdAt: "2024-10-04",
    language: "Vue",
    stargazers_count: 0,
    forks_count: 0,
    open_issues_count: 0,
    updated_at: "2024-10-28T12:40:30Z"
  },
  {
    id: "rpg",
    name: "rpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit. A 2D RPG game project exploring game development fundamentals with custom engine features.",
    technologies: ["Vue.js", "TypeScript", "Canvas API"],
    githubUrl: "https://github.com/rafaeltj13/rpg",
    createdAt: "2024-04-21",
    language: "Vue",
    stargazers_count: 0,
    forks_count: 0,
    open_issues_count: 0,
    updated_at: "2024-08-29T22:38:02Z"
  },
  {
    id: "luana-beauty",
    name: "LuanaBeauty",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium. A beauty service landing page and appointment management system.",
    technologies: ["Vue.js", "Nuxt.js", "Tailwind CSS"],
    githubUrl: "https://github.com/rafaeltj13/LuanaBeauty",
    homepage: "https://luana-beauty.vercel.app",
    createdAt: "2023-12-06",
    language: "Vue",
    stargazers_count: 0,
    forks_count: 0,
    open_issues_count: 0,
    updated_at: "2024-07-09T14:52:57Z"
  },
  {
    id: "tj-goal",
    name: "TJGoal",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur. A goal tracking application to help manage and visualize personal objectives and progress.",
    technologies: ["Vue.js", "Nuxt.js", "Supabase", "Tailwind CSS"],
    githubUrl: "https://github.com/rafaeltj13/TJGoal",
    homepage: "https://tj-goal.vercel.app",
    createdAt: "2023-04-18",
    language: "Vue",
    stargazers_count: 0,
    forks_count: 0,
    open_issues_count: 1,
    updated_at: "2023-12-14T16:42:45Z"
  }
];
