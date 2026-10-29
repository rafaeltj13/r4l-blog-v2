/**
 * Tailoring: job description + content locale -> finished `CvSelection`.
 *
 * Owns the whole AI contract: prompt, structured-output schema, one-page
 * budget, and the clamp that drops hallucinated ids / skills. The client
 * receives the returned `CvSelection` as-is and resolves it with
 * `buildCvDocument()`. The model is injected so the endpoint picks the
 * provider and tests can pass a mock.
 */
import { generateObject, type LanguageModel } from "ai";
import { z } from "zod";

import { activeSkillTaxonomy } from "~/utils/cv/data";
import { localizedCvContent } from "~/utils/cv/localize";
import type {
  CvDataSource,
  CvLocale,
  CvSelection,
  Experience,
  PersonalProject,
  SkillMap,
} from "~/utils/cv/types";

/** One-page budget shared by the schema, the prompt, and the clamp. */
const CV_CONSTRAINTS = {
  minExperiences: 2,
  maxExperiences: 4,
  defaultExperiences: 4,
  maxProjects: 2,
  minSkillsTotal: 8,
  maxSkillsTotal: 12,
  maxPositionChars: 80,
  maxSummaryChars: 400,
  maxBulletsPerExperience: 4,
  maxBulletChars: 220,
} as const;

const C = CV_CONSTRAINTS;

/**
 * Shape only. DeepSeek has no native structured output (the provider injects
 * the schema into the system prompt as text), so length / count limits here
 * would reject an otherwise usable answer. The prompt states the budget and
 * `clampToContract` enforces it.
 */
const TailoredCvSchema = z.object({
  position: z.string().min(1),
  summary: z.string().min(1),
  experienceIds: z.array(z.string()),
  projectIds: z.array(z.string()).default([]),
  selectedSkills: z.record(z.string(), z.array(z.string())).default({}),
  bulletOverrides: z.record(z.string(), z.array(z.string())).default({}),
});

type TailoredCvPayload = z.infer<typeof TailoredCvSchema>;

export const CV_LOCALES = ["en", "pt-BR"] as const satisfies readonly CvLocale[];

export interface TailorCvInput {
  jobDescription: string;
  locale: CvLocale;
}

export async function tailorCv(
  input: TailorCvInput,
  model: LanguageModel,
): Promise<CvSelection> {
  const content = downloadableContent(input.locale);

  const { object } = await generateObject({
    model,
    schema: TailoredCvSchema,
    system: buildSystemPrompt(input.locale),
    prompt: buildUserPrompt(input.jobDescription, content),
    maxOutputTokens: 1200,
    temperature: 0.5,
    // DeepSeek V4 thinks by default; reasoning tokens count against
    // maxOutputTokens and can exhaust it before any JSON is emitted.
    // Other providers ignore this key.
    providerOptions: { deepseek: { thinking: { type: "disabled" } } },
  });

  const selection = clampToContract(object, content);
  if (selection.experienceIds.length === 0) {
    throw new Error(
      `AI returned no valid experiences (got ${JSON.stringify(object.experienceIds).slice(0, 200)}).`,
    );
  }
  return selection;
}

/** Localized content minus deprecated entries, plus the pickable skills. */
interface DownloadableContent {
  experiences: Experience[];
  experienceById: Map<string, Experience>;
  projects: PersonalProject[];
  projectIds: Set<string>;
  skills: SkillMap;
}

function downloadableContent(locale: CvLocale): DownloadableContent {
  const data: CvDataSource = localizedCvContent(locale).data;
  const experiences = data.experiences.filter((e) => !e.deprecated);
  const projects = data.personalProjects.filter((p) => !p.deprecated);
  return {
    experiences,
    experienceById: new Map(experiences.map((e) => [e.id, e])),
    projects,
    projectIds: new Set(projects.map((p) => p.id)),
    // Skill and category names stay English; `buildCvDocument` renames
    // categories for display.
    skills: activeSkillTaxonomy(),
  };
}

const LANGUAGE_RULES: Record<CvLocale, string> = {
  en: "- Write the position, summary, and bullet overrides in English.",
  "pt-BR":
    "- Write the position, summary, and bullet overrides in Brazilian Portuguese, matching the tone of the provided Portuguese descriptions. Copy skill names and skill category names exactly as listed in AVAILABLE SKILLS (do not translate them).",
};

function buildSystemPrompt(locale: CvLocale): string {
  return `You are an expert CV optimizer. Your task is to tailor a one-page CV for a specific job description.

You will receive:
1. A job description.
2. The candidate's full work history (reference entries by their [ID ...] markers).
3. The candidate's personal projects (reference by their [ID ...] markers).
4. A list of available skills grouped by category.

Rules:
- Analyze the job description to determine whether the role is frontend-focused, full-stack, backend-focused, mobile, etc.
- Select the MOST RELEVANT experiences. Default to ${C.defaultExperiences} experiences. Only reduce to ${C.minExperiences} if the selected descriptions are exceptionally long and would overflow one page.
- Optionally select up to ${C.maxProjects} personal projects that strengthen the application for this role. Omit them when nothing is relevant.
- Rewrite ONLY the professional summary (2-3 sentences, max ${C.maxSummaryChars} chars) and the position/title (max ${C.maxPositionChars} chars) to match the job description.
- You may ALSO tighten individual experience bullets for relevance (max ${C.maxBulletsPerExperience} bullets per experience, each max ${C.maxBulletChars} chars). Never invent employers, dates, technologies, or metrics — only rephrase what is already there. Omit bulletOverrides for an experience to keep its original text.
- Select skills that are both in the provided list and relevant to the job description. Aim for ${C.minSkillsTotal}-${C.maxSkillsTotal} skills total to fill the page well.
- Respect the existing category names. Only include categories that have selected skills.
${LANGUAGE_RULES[locale]}`;
}

function buildUserPrompt(
  jobDescription: string,
  content: DownloadableContent,
): string {
  const experiences = content.experiences
    .map((exp) => {
      const lines: string[] = [];
      lines.push(`[ID ${exp.id}] ${exp.title} @ ${exp.companyName}`);
      if (exp.partner) lines.push(`  Partner/Project: ${exp.partner}`);
      lines.push(`  Period: ${exp.dateStart} to ${exp.dateEnd ?? "Present"}`);
      lines.push(`  Technologies: ${exp.technologies.join(", ")}`);
      lines.push(
        `  Description: ${exp.description.replace(/\s+/g, " ").trim()}`,
      );
      return lines.join("\n");
    })
    .join("\n\n");

  const projects = content.projects
    .map((project) => {
      const lines: string[] = [];
      lines.push(`[ID ${project.id}] ${project.name}: ${project.tagline}`);
      lines.push(`  Description: ${project.description}`);
      lines.push(`  Technologies: ${project.technologies.join(", ")}`);
      if (project.url) lines.push(`  URL: ${project.url}`);
      return lines.join("\n");
    })
    .join("\n\n");

  const skills = Object.entries(content.skills)
    .map(([category, list]) => `${category}: ${list.join(", ")}`)
    .join("\n");

  return `JOB DESCRIPTION:
${jobDescription}

CANDIDATE EXPERIENCES:
${experiences}

PERSONAL PROJECTS:
${projects}

AVAILABLE SKILLS:
${skills}

Return the tailored CV. In experienceIds, projectIds, and bulletOverrides keys use only the bare id from the [ID ...] markers above (e.g. "${content.experiences[0]?.id}", not "[ID ${content.experiences[0]?.id}]"). Select only skills from AVAILABLE SKILLS.`;
}

/**
 * Clamp model output to the contract the PDF expects: drop unknown or
 * deprecated ids and skills, trim text to the budget, and top up skills
 * from the selected experiences when the model picked too few.
 */
function clampToContract(
  payload: TailoredCvPayload,
  content: DownloadableContent,
): CvSelection {
  const experienceIds = [...new Set(payload.experienceIds.map(normalizeId))]
    .filter((id) => content.experienceById.has(id))
    .slice(0, C.maxExperiences);
  const projectIds = [...new Set(payload.projectIds.map(normalizeId))]
    .filter((id) => content.projectIds.has(id))
    .slice(0, C.maxProjects);

  const categoryOf = new Map<string, string>();
  for (const [category, list] of Object.entries(content.skills)) {
    for (const skill of list) {
      if (!categoryOf.has(skill)) categoryOf.set(skill, category);
    }
  }

  // Keep the model's picks that exist under the category it named.
  const picked: Array<[category: string, skill: string]> = [];
  const seen = new Set<string>();
  for (const [category, list] of Object.entries(payload.selectedSkills)) {
    const allowed = content.skills[category];
    if (!allowed) continue;
    for (const skill of list) {
      if (allowed.includes(skill) && !seen.has(skill)) {
        seen.add(skill);
        picked.push([category, skill]);
      }
    }
  }

  // Top up from the selected experiences, in selection order.
  for (const id of experienceIds) {
    if (picked.length >= C.minSkillsTotal) break;
    for (const tech of content.experienceById.get(id)!.technologies) {
      if (picked.length >= C.minSkillsTotal) break;
      const category = categoryOf.get(tech);
      if (category && !seen.has(tech)) {
        seen.add(tech);
        picked.push([category, tech]);
      }
    }
  }

  const skills: SkillMap = {};
  for (const [category, skill] of picked.slice(0, C.maxSkillsTotal)) {
    (skills[category] ??= []).push(skill);
  }

  const overridesById = new Map(
    Object.entries(payload.bulletOverrides).map(([id, list]) => [
      normalizeId(id),
      list,
    ]),
  );
  const bulletOverrides: Record<string, string[]> = {};
  for (const id of experienceIds) {
    const clean = (overridesById.get(id) ?? [])
      .map((b) => truncate(b, C.maxBulletChars))
      .filter(Boolean)
      .slice(0, C.maxBulletsPerExperience);
    if (clean.length > 0) bulletOverrides[id] = clean;
  }

  return {
    position: truncate(payload.position, C.maxPositionChars),
    summary: truncate(payload.summary, C.maxSummaryChars),
    experienceIds,
    projectIds,
    skills,
    bulletOverrides,
  };
}

/**
 * Models often echo the prompt's marker back (`[ID foo]`, `ID: foo`) instead
 * of the bare slug; reduce any of those to `foo`.
 */
function normalizeId(raw: string): string {
  return raw
    .trim()
    .replace(/^\[|\]$/g, "")
    .replace(/^id\s*[:#]?\s*/i, "")
    .trim()
    .toLowerCase();
}

/**
 * Collapse whitespace and fit `max` chars, cutting at the last sentence end
 * when one exists in the second half, else at a word boundary with "…".
 */
function truncate(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const sentenceEnd = cut.lastIndexOf(". ");
  if (sentenceEnd >= max / 2) return cut.slice(0, sentenceEnd + 1);
  const wordEnd = cut.lastIndexOf(" ", max - 1);
  return `${cut.slice(0, wordEnd > 0 ? wordEnd : max - 1).trimEnd()}…`;
}
