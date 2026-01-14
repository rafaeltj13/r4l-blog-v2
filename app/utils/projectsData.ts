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
  visibility?: 'Public' | 'Private';
}

export const projectsData: Project[] = [
  {
    id: "r4l-blog-v2",
    name: "R4L Blog v2",
    description: `This is the second version of my blog, initially created with the intent to finally have a project that I can finish and be proud of. Since most of the work
    was already done in the first version, I decided to use it as a starting point and improve it with new features and use other tecnologies.`,
    technologies: ["Vue.js", "Nuxt.js", "TypeScript", "Tailwind CSS", "DaisyUI", "OpenAI"],
    githubUrl: "https://github.com/rafaeltj13/r4l-blog-v2",
    homepage: "https://r4l-blog-v2.vercel.app",
    createdAt: "2026-01-05",
    language: "Nuxt",
    stargazers_count: 0,
    forks_count: 0,
    open_issues_count: 0,
    updated_at: "2026-01-12T14:16:46Z",
    visibility: "Public"
  },
  {
    id: "hooperz",
    name: "Hooperz",
    description: `Hooperz is a browser game inspired in the TJGoal project I've worked some years prior, but with a different context. A basketball 
      game where the player needs to score to contribute with the team community to win games.`,
    technologies: ["Vue.js", "Nuxt.js", "TypeScript", "Tailwind CSS", "Shadcn-vue", "Supabase"],
    githubUrl: "https://github.com/rafaeltj13/hooperz",
    homepage: "https://hooperz.vercel.app",
    createdAt: "2024-12-01",
    language: "Nuxt",
    stargazers_count: 0,
    forks_count: 0,
    open_issues_count: 0,
    updated_at: "2025-10-01T14:16:46Z",
    visibility: "Private"
  },
  {
    id: "blog",
    name: "R4L Blog",
    description: `The main idea to create a blog was simple: Work on a project start to finish. I've been working in big side projects that eventually
    got too big and hard to finish. I wanted to create something with a clear goal and archive it.`,
    technologies: ["TypeScript", "Next.js", "React", "Tailwind CSS"],
    githubUrl: "https://github.com/rafaeltj13/blog",
    homepage: "https://blog-weld-two-55.vercel.app",
    createdAt: "2025-01-26",
    language: "Next",
    stargazers_count: 0,
    forks_count: 0,
    open_issues_count: 0,
    updated_at: "2025-06-04T12:51:23Z",
    visibility: "Public"
  },
  {
    id: "dota2brain",
    name: "Dota 2 Brain",
    description: `Dota 2 Brain is a project with the main goal of extracting ideas from the game into a text base format. There's a lot of video content
    related to this game but when playing it gets really hard to watch something. Text can be helpful to have a better understanding of the game and 
    its mechanics and timings.`,
    technologies: ["Vue.js", "Nuxt.js", "Supabase"],
    githubUrl: "https://github.com/rafaeltj13/dota2brain",
    createdAt: "2024-10-04",
    language: "Nuxt",
    stargazers_count: 0,
    forks_count: 0,
    open_issues_count: 0,
    updated_at: "2024-10-28T12:40:30Z",
    visibility: "Public"
  },
  {
    id: "rpg",
    name: "RPG",
    description: `This is a attempt of a RPG game in a browser using only web dev concepts. I always wanted to create games but I still felt like
    I can improve as a web developer, so I tried to match both concepts.`,
    technologies: ["Vue.js", "Nuxt.js", "TypeScript", "Supabase"],
    githubUrl: "https://github.com/rafaeltj13/rpg",
    createdAt: "2024-04-21",
    language: "Nuxt",
    stargazers_count: 0,
    forks_count: 0,
    open_issues_count: 0,
    updated_at: "2024-08-29T22:38:02Z",
    visibility: "Public"
  },
  {
    id: "luana-beauty",
    name: "Luana Beauty",
    description: `This is a project created for my girlfriend Luana. It's a beauty service landing page and appointment management system.`,
    technologies: ["Vue.js", "Nuxt.js", "Tailwind CSS"],
    githubUrl: "https://github.com/rafaeltj13/LuanaBeauty",
    homepage: "https://luana-beauty.vercel.app",
    createdAt: "2023-12-06",
    language: "Nuxt",
    stargazers_count: 0,
    forks_count: 0,
    open_issues_count: 0,
    updated_at: "2024-07-09T14:52:57Z",
    visibility: "Public"
  },
  {
    id: "tj-goal",
    name: "TJGoal",
    description: `This is a browser game where the player needs to score to contribute with the team community to win games. It is heavily inspired by the game BRGol, a game
    I've played when I was a kid.`,
    technologies: ["Vue.js", "Nuxt.js", "Supabase", "Tailwind CSS"],
    githubUrl: "https://github.com/rafaeltj13/TJGoal",
    homepage: "https://tj-goal.vercel.app",
    createdAt: "2023-04-18",
    language: "Nuxt",
    stargazers_count: 0,
    forks_count: 0,
    open_issues_count: 1,
    updated_at: "2023-12-14T16:42:45Z",
    visibility: "Public"
  }
];
