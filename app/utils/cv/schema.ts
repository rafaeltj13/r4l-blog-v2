import { z } from "zod";
import { activeAllowedSkills, activeExperienceById, personalProjectById, skillTaxonomy } from "./data";

/**
 * THE contract between the AI and the PDF.
 *
 * `generateObject()` validates the model output against this schema, so the
 * frontend can trust the shape without fragile JSON-extraction or index-based
 * lookups. `buildCvDocument()` then resolves the ids into full objects.
 *
 * Constraints (kept from the previous implementation):
 * - 2–4 experiences (default 4, fewer only when content is long)
 * - 0–2 personal projects
 * - 8–12 skills total, only from the taxonomy
 * - position ≤ 80 chars, summary ≤ 400 chars
 * - bullet overrides: ≤ 4 bullets / experience, each ≤ 220 chars
 */
export const TailoredCvSchema = z.object({
  position: z.string().min(1).max(80),
  summary: z.string().min(1).max(400),
  experienceIds: z.array(z.string()).min(2).max(4),
  projectIds: z.array(z.string()).max(2).default([]),
  selectedSkills: z.record(z.string(), z.array(z.string())),
  bulletOverrides: z
    .record(z.string(), z.array(z.string().min(1).max(220)).min(1).max(4))
    .default({}),
});

export type TailoredCvPayload = z.infer<typeof TailoredCvSchema>;

/** One-page budget guardrails shared by prompt + client validation. */
export const CV_CONSTRAINTS = {
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

const KNOWN_CATEGORIES = new Set(Object.keys(skillTaxonomy));

/**
 * Clamp AI output to the contract the PDF expects. `generateObject` already
 * enforces the shape; this additionally drops unknown ids / skills so a
 * hallucinating model can never break the render. Deprecated experiences
 * (and their exclusive skills) are rejected here so the AI can never pull
 * page-only history into a download.
 */
export function sanitizeTailoredPayload(payload: TailoredCvPayload): {
  position: string;
  summary: string;
  experienceIds: string[];
  projectIds: string[];
  skills: Record<string, string[]>;
  bulletOverrides: Record<string, string[]>;
} {
  const validExperienceIds = payload.experienceIds.filter((id) =>
    activeExperienceById.has(id),
  );
  const validProjectIds = (payload.projectIds ?? []).filter((id) =>
    personalProjectById.has(id),
  );

  const skills: Record<string, string[]> = {};
  const downloadableSkills = activeAllowedSkills();
  for (const [category, list] of Object.entries(payload.selectedSkills ?? {})) {
    if (!KNOWN_CATEGORIES.has(category) || !Array.isArray(list)) continue;
    const valid = [...new Set(list)].filter((s) => downloadableSkills.has(s));
    if (valid.length > 0) skills[category] = valid;
  }

  const bulletOverrides: Record<string, string[]> = {};
  for (const [id, bullets] of Object.entries(payload.bulletOverrides ?? {})) {
    if (!activeExperienceById.has(id) || !Array.isArray(bullets)) continue;
    const clean = bullets
      .filter((b) => typeof b === "string" && b.trim().length > 0)
      .map((b) => b.replace(/\s+/g, " ").trim().slice(0, 220))
      .slice(0, 4);
    if (clean.length > 0) bulletOverrides[id] = clean;
  }

  return {
    position: payload.position.slice(0, 80),
    summary: payload.summary.slice(0, 400),
    experienceIds: validExperienceIds.slice(0, 4),
    projectIds: validProjectIds.slice(0, 2),
    skills,
    bulletOverrides,
  };
}
