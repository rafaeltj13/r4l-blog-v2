import type {
  CvContact,
  CvEducation,
  Experience,
  PersonalProject,
  SkillMap,
} from "./types";

/**
 * Single source of truth for all CV content.
 * - `experiences`: full work history, each with a stable string id.
 * - `personalProjects`: curated CV-ready subset (NOT the full GitHub list in
 *   `projectsData.ts`, which carries stars/forks metadata the CV doesn't need).
 * - `skillTaxonomy`: every skill the AI is allowed to pick from.
 */

export const FULL_NAME = "Rafael de Araújo Maciel";

export const contactInfo: CvContact = {
  location: "João Pessoa/PB, Brazil (GMT -3)",
  phone: "+55 83 98152-4508",
  email: "rafael.damaciel@proton.me",
  linkedin: {
    label: "linkedin.com/in/rafaeldamaciel",
    url: "https://www.linkedin.com/in/rafaeldamaciel/",
  },
  github: {
    label: "github.com/rafaeltj13",
    url: "https://github.com/rafaeltj13",
  },
};

export const education: CvEducation = {
  institution: "Federal University of Campina Grande - UFCG",
  degree: "Bachelor of Computer Science",
  period: "2015 - 2019",
  details: ["Participation in Monitoring Projects: Programming Laboratory II"],
};

export const experiences: Experience[] = [
  {
    id: "trio-stamptv-2025",
    title: "Senior Software Engineer",
    companyName: "Trio",
    partner: "Stamp.tv",
    location: "Boston, US | Remote",
    technologies: ["Next.js", "FastAPI", "Google ADK", "MySQL", "Kubernetes"],
    dateStart: "2025-04-01",
    dateEnd: "2026-02-01",
    description:
      "Developed a cloud-native programmatic advertising platform for CTV and digital media, enabling end-to-end campaign management, creative workflows, audience targeting, and real-time analytics.",
  },
  {
    id: "trio-studylog-2025",
    title: "Senior Software Engineer",
    companyName: "Trio",
    partner: "Studylog",
    location: "Boston, US | Remote",
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "GraphQL",
      "TypeScript",
      "PostgreSQL",
      "Apollo GraphQL",
    ],
    dateStart: "2025-02-01",
    dateEnd: "2025-06-01",
    description: `Developed full-stack platform for animal study workflows (desktop, web, backend) using React, Next.js, Electron, NestJS, TypeScript, GraphQL, Prisma, SQL/PostgreSQL, Docker, and AWS Cognito;

    Built GraphQL APIs, authentication flows, shared logic, and frontend integrations across multiple services.
    Improved maintainability and development speed with reusable components, shared schemas, and code generation;

    Enhanced reliability and deployment efficiency via automated testing, CI/CD pipelines, and structured logging.
    Contributed to multi-repo, modular architecture separating UI, API orchestration, and authentication responsibilities;

    Collaborated across frontend and backend teams, conducted code reviews, and upheld coding standards and testing practices.`,
  },
  {
    id: "trio-path-mobile-2024",
    title: "Senior Software Engineer",
    companyName: "Trio",
    partner: "Path",
    location: "Boston, US | Remote",
    technologies: ["React Native", "Node.js", "Maestro", "Jest"],
    dateStart: "2024-02-01",
    dateEnd: "2025-02-01",
    description: `Built and maintained a React Native (TypeScript) fintech mobile app for cryptocurrency portfolio management and trading, supporting self-directed and AI-managed portfolios, multi-token swaps, real-time balances, and bank/exchange integrations (Plaid, Gemini, MoonPay).

    Led the migration to React Native's New Architecture (Fabric + TurboModules) on RN 0.76, enabling synchronous native rendering, concurrent features, and improved JavaScript-to-native interop across both iOS and Android. This was critical for a fintech app relying on high-performance charting, real-time balance updates, and fluid gesture-driven interactions (Reanimated 3).;

    Delivered key user-facing features including biometric login, two-factor authentication, risk assessment (Nitrogen), KYC/compliance workflows, recurring payments, and a referral program, while integrating analytics (Amplitude, Firebase, AppsFlyer) and engagement tools (Braze, Intercom) to drive user retention and support data-driven product decisions.`,
  },
  {
    id: "trio-tally-2023",
    title: "Senior Software Engineer",
    companyName: "Trio",
    partner: "Tally",
    location: "Boston, US | Remote",
    technologies: [
      "Vue.js",
      "Pinia",
      "React.js",
      "Next.js",
      "Playwright",
      "Vitest",
      "Jest",
      "Storybook",
    ],
    dateStart: "2023-01-01",
    dateEnd: "2024-01-01",
    description: `Maintained and improved a platform for users manage their credit cards and their payments, creating line of credits and implementing other strategies to help customers get out of debt;

      Built a SDK platform to encapsulate the payment feature to be integrated with partner websites;

      Worked on a internal tool for employees to improve customer support and easily integrate our main functionality and create a better user experience.`,
  },
  {
    id: "trio-path-web-2022",
    title: "Software Engineer",
    companyName: "Trio",
    partner: "Path",
    location: "Boston, US | Remote",
    technologies: ["Vue.js", "Storybook", "Playwright"],
    dateStart: "2022-03-01",
    dateEnd: "2022-12-01",
    description: `Built and maintained a Vue.js fintech web app for cryptocurrency portfolio management and trading, supporting self-directed and AI-managed portfolios, multi-token swaps, real-time balances, and bank/exchange integrations (Plaid, Gemini, MoonPay).

    Delivered key user-facing features including two-factor authentication, risk assessment (Nitrogen), KYC/compliance workflows, recurring payments, and a referral program, while integrating analytics (Amplitude, Firebase, AppsFlyer) and engagement tools (Braze, Intercom) to drive user retention and support data-driven product decisions.`,
  },
  {
    id: "trio-optel-2021",
    title: "Software Engineer",
    companyName: "Trio",
    partner: "Optel Group",
    location: "Boston, US | Remote",
    technologies: ["Vue.js", "Node.js", "Google BigQuery"],
    dateStart: "2021-07-01",
    dateEnd: "2022-03-01",
    description: `Built a traceability system that tracks beers all the way to their raw materials, creating a system that generates spreadsheets to replace manually work by the customer employees;

    Automated all the tracking internal systems into a single platform to help identify problems during the process and increase the control of the customer with their own products.`,
  },
  {
    id: "xtra-social-2020",
    title: "Software Engineer",
    companyName: "Xtra Holdings LLC",
    location: "Sarasota, US | Remote",
    technologies: ["Vue.js", "Express", "Node.js", "MongoDB"],
    dateStart: "2020-11-01",
    dateEnd: "2021-06-01",
    description: `Improved a private social network using Vue, Node, Express, and MongoDB;

    Developed from scratch the social platform using new frameworks and libraries using Vue 3;

    Helped define and refine requirements for this new enhanced social network`,
  },
  {
    id: "lella-booking-2020",
    title: "Software Engineer",
    companyName: "Lella.co",
    location: "Poland | Remote",
    technologies: [
      "React.js",
      "Stripe (Software)",
      "Express",
      "Node.js",
      "MongoDB",
    ],
    dateStart: "2020-02-01",
    dateEnd: "2020-12-01",
    description: `Developed a mobile application to book, manage and offer appointments to the client;

      Built a web application for data visualization for the mobile app.`,
  },
  {
    id: "splab-analyst-2020",
    title: "Junior System Analyst",
    companyName: "Software Practices Laboratory",
    location: "Brazil",
    technologies: ["React.js", "Node.js", "Sequelize", "SQL Server"],
    dateStart: "2020-01-01",
    dateEnd: "2020-02-01",
    description:
      "Worked on a web application for data management and visualization for the other projects of the company.",
  },
  {
    id: "splab-web-2019",
    title: "Web Developer",
    companyName: "Software Practices Laboratory",
    location: "Brazil",
    technologies: ["React.js", "Node.js", "Sequelize", "SQL Server"],
    dateStart: "2019-01-01",
    dateEnd: "2019-12-01",
    description:
      "Worked on several projects: TCoM Desktop, a desktop application to test, load, clean and verify company's credit card machines; TCoM Loader, a new platform that extracted the load feature from TCoM Desktop; LiTT, a web application for data management and visualization for TCoM Desktop and TCoM Loader.",
    deprecated: true,
  },
  {
    id: "splab-efinance-2017",
    title: "Web Developer",
    companyName: "Software Practices Laboratory",
    location: "Brazil",
    technologies: ["Angular.js", "ASP.NET", "SQL Server"],
    dateStart: "2017-12-01",
    dateEnd: "2018-11-01",
    description:
      "E-Finance: Web application to provide finance management to ensure companies.",
    deprecated: true,
  },
  {
    id: "embedded-themes-2016",
    title: "Student Software Developer",
    companyName: "Embedded Lab",
    location: "Brazil",
    technologies: ["MIML"],
    dateStart: "2016-05-01",
    dateEnd: "2017-03-01",
    description: "Created android themes for the client OS.",
    deprecated: true,
  },
];

export const experienceById: Map<string, Experience> = new Map(
  experiences.map((e) => [e.id, e]),
);

/**
 * Curated personal projects for the CV. Kept short on purpose: each entry
 * renders as a single compact block so the CV stays on one page.
 */
export const personalProjects: PersonalProject[] = [
  {
    id: "r4l-blog-v2",
    name: "R4L Blog v2",
    tagline: "AI-powered personal blog platform",
    description:
      "Nuxt blog with an AI digital twin answering questions about my work, plus tailored-CV generation from job descriptions.",
    technologies: ["Vue.js", "Nuxt.js", "TypeScript", "Tailwind CSS", "AI SDK"],
    url: "https://github.com/rafaeltj13/r4l-blog-v2",
  },
  {
    id: "hooperz",
    name: "Hooperz",
    tagline: "Realtime multiplayer browser basketball game",
    description:
      "Team-based scoring game with live state, communities and game history backed by Supabase realtime.",
    technologies: ["Vue.js", "Nuxt.js", "TypeScript", "Supabase"],
    url: "https://github.com/rafaeltj13/hooperz",
  },
  {
    id: "dota2brain",
    name: "Dota 2 Brain",
    tagline: "Text-first game knowledge base",
    description:
      "Distills video-heavy Dota 2 knowledge into skimmable text guides for in-game reference.",
    technologies: ["Vue.js", "Nuxt.js", "Supabase"],
    url: "https://github.com/rafaeltj13/dota2brain",
  },
  {
    id: "tjgoal",
    name: "TJGoal",
    tagline: "Community-driven browser football game",
    description:
      "Score-to-win community game inspired by BRGol, with seasons, teams and live standings.",
    technologies: ["Vue.js", "Nuxt.js", "Supabase", "Tailwind CSS"],
    url: "https://github.com/rafaeltj13/TJGoal",
  },
];

export const personalProjectById: Map<string, PersonalProject> = new Map(
  personalProjects.map((p) => [p.id, p]),
);

/** Every skill the AI may select, grouped by CV display category. */
export const skillTaxonomy: SkillMap = {
  "Frameworks & Libraries": [
    "React.js",
    "React",
    "Vue.js",
    "Next.js",
    "Nuxt.js",
    "React Native",
    "Node.js",
    "Express",
    "FastAPI",
    "NestJS",
    "Angular.js",
    "ASP.NET",
    "Pinia",
    "Storybook",
    "Apollo GraphQL",
    "GraphQL",
  ],
  Testing: ["Jest", "Vitest", "Playwright", "Maestro"],
  "Data & Cloud": [
    "MySQL",
    "MongoDB",
    "PostgreSQL",
    "SQL Server",
    "Google BigQuery",
    "Google ADK",
    "AWS",
    "Kubernetes",
    "Sequelize",
    "Stripe (Software)",
  ],
};

/** Flat allow-list derived from the taxonomy (single source of truth). */
export const allowedSkills: Set<string> = new Set(
  Object.values(skillTaxonomy).flat(),
);

/** Experiences eligible for CV downloads (deprecated ones are page-only). */
export const activeExperiences: Experience[] = experiences.filter(
  (e) => !e.deprecated,
);

export const activeExperienceById: Map<string, Experience> = new Map(
  activeExperiences.map((e) => [e.id, e]),
);

/**
 * Technologies that appear ONLY in deprecated experiences. These are dropped
 * from the skills offered to the AI and from downloaded documents, while
 * every other taxonomy skill is kept as-is.
 */
export function deprecatedOnlyTechnologies(): Set<string> {
  const activeTechs = new Set(activeExperiences.flatMap((e) => e.technologies));
  const deprecatedTechs = new Set(
    experiences.filter((e) => e.deprecated).flatMap((e) => e.technologies),
  );
  return new Set([...deprecatedTechs].filter((t) => !activeTechs.has(t)));
}

/** Skill taxonomy minus deprecated-only technologies (what the AI may pick). */
export function activeSkillTaxonomy(): SkillMap {
  const excluded = deprecatedOnlyTechnologies();
  const result: SkillMap = {};
  for (const [category, skills] of Object.entries(skillTaxonomy)) {
    const kept = skills.filter((s) => !excluded.has(s));
    if (kept.length > 0) result[category] = kept;
  }
  return result;
}

/** Flat allow-list for downloaded CVs (excludes deprecated-only tech). */
export function activeAllowedSkills(): Set<string> {
  return new Set(Object.values(activeSkillTaxonomy()).flat());
}
