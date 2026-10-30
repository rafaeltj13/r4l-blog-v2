import { experiences, skillTaxonomy } from "./data";
import type { CvPresetId, CvSelection } from "./types";

export interface CvPreset extends CvSelection {
  filename: string;
  /** Keep Deprecated entries (page view only, never a download). */
  includeDeprecated?: boolean;
}

/**
 * Hand-written CV Selections. `all` is the full history shown on the page;
 * `front` / `full` sit behind the two classic download buttons. Resolved via
 * `resolveCv()`, the same path AI-tailored output takes.
 */
export const cvPresets: Record<CvPresetId, CvPreset> = {
  all: {
    filename: "Rafael_Maciel_CV.pdf",
    includeDeprecated: true,
    position: "Senior Software Engineer",
    summary:
      "Senior Software Engineer with 8+ years of expertise specializing in web development. Advanced proficiency in modern TypeScript frameworks including React, Vue.js, Next.js, and Node.js. Successfully collaborated with global teams to build scalable solutions, demonstrating effective cross-cultural communication.",
    experienceIds: experiences.map((e) => e.id),
    // Only D2Brain is showcased on the page.
    projectIds: ["d2brain"],
    skills: skillTaxonomy,
  },
  front: {
    filename: "Rafael_Maciel_Frontend_CV.pdf",
    position: "Senior Frontend Engineer",
    summary:
      "Senior Software Engineer with 8+ years of expertise specializing in frontend development. Advanced proficiency in modern TypeScript frameworks including React, Vue.js, Next.js, and React Native. Successfully collaborated with global teams to build scalable solutions, demonstrating effective cross-cultural communication.",
    experienceIds: [
      "trio-studylog-2025",
      "trio-path-mobile-2024",
      "trio-tally-2023",
      "lella-booking-2020",
    ],
    projectIds: ["d2brain"],
    skills: {
      "Frameworks & Libraries": [
        "React",
        "Vue.js",
        "Next.js",
        "Nuxt.js",
        "React Native",
        "Pinia",
        "Storybook",
        "GraphQL",
      ],
      Testing: ["Jest", "Vitest", "Playwright", "Maestro"],
    },
  },
  full: {
    filename: "Rafael_Maciel_Fullstack_CV.pdf",
    position: "Senior Software Engineer",
    summary:
      "Senior Software Engineer with 8+ years of expertise specializing in web development. Advanced proficiency in modern TypeScript frameworks including React, Vue.js, Next.js, and Node.js. Successfully collaborated with global teams to build scalable solutions, demonstrating effective cross-cultural communication.",
    experienceIds: [
      "trio-stamptv-2025",
      "trio-studylog-2025",
      "trio-optel-2021",
      "xtra-social-2020",
      "lella-booking-2020",
    ],
    projectIds: ["d2brain"],
    skills: {
      "Frameworks & Libraries": [
        "React",
        "Vue.js",
        "Next.js",
        "Nuxt.js",
        "Node.js",
        "Express",
        "FastAPI",
        "GraphQL",
      ],
      Testing: ["Jest", "Vitest", "Playwright"],
      "Data & Cloud": [
        "MySQL",
        "MongoDB",
        "PostgreSQL",
        "Google BigQuery",
        "Kubernetes",
      ],
    },
  },
};
