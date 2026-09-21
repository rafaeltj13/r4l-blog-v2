import type { CvPresetId, CvSelection } from "./types";

/**
 * Static presets behind the two classic download buttons.
 * Keeping them as data (instead of filter logic inside Resume.vue) means the
 * PDF path is identical for presets and AI-tailored output: selection in,
 * `CvDocument` out.
 */
export const cvPresets: Record<
  CvPresetId,
  CvSelection & { filename: string }
> = {
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
    projectIds: ["r4l-blog-v2", "hooperz"],
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
      "splab-web-2019",
    ],
    projectIds: ["r4l-blog-v2", "dota2brain"],
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
