/**
 * Shared CV context builders for the AI endpoints.
 *
 * Both `/api/chat` (free-text digital twin) and `/api/cv/optimize`
 * (structured tailored CV) feed the model from the same typed source:
 * `~/utils/cv/data`. Adding an experience or personal project there
 * automatically flows into both features.
 */
import {
  activeExperiences,
  activePersonalProjects,
  activeSkillTaxonomy,
  experiences,
  personalProjects,
} from "~/utils/cv/data";
import { CV_CONSTRAINTS } from "~/utils/cv/schema";

/** Download-eligible work history with stable string ids for the model. */
export function buildExperiencesBlock(): string {
  return activeExperiences
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
}

/** Curated personal projects available for the CV (deprecated excluded). */
export function buildPersonalProjectsBlock(): string {
  return activePersonalProjects
    .map((project) => {
      const lines: string[] = [];
      lines.push(`[ID ${project.id}] ${project.name}: ${project.tagline}`);
      lines.push(`  Description: ${project.description}`);
      lines.push(`  Technologies: ${project.technologies.join(", ")}`);
      if (project.url) lines.push(`  URL: ${project.url}`);
      return lines.join("\n");
    })
    .join("\n\n");
}

export function buildSkillsBlock(): string {
  return Object.entries(activeSkillTaxonomy())
    .map(([category, skills]) => `${category}: ${skills.join(", ")}`)
    .join("\n");
}

/** System prompt for the structured tailored-CV endpoint. */
export function buildCvSystemPrompt(): string {
  return `You are an expert CV optimizer. Your task is to tailor a one-page CV for a specific job description.

You will receive:
1. A job description.
2. The candidate's full work history (reference entries by their [ID ...] markers).
3. The candidate's personal projects (reference by their [ID ...] markers).
4. A list of available skills grouped by category.

Rules:
- Analyze the job description to determine whether the role is frontend-focused, full-stack, backend-focused, mobile, etc.
- Select the MOST RELEVANT experiences. Default to ${CV_CONSTRAINTS.defaultExperiences} experiences. Only reduce to ${CV_CONSTRAINTS.minExperiences} if the selected descriptions are exceptionally long and would overflow one page.
- Optionally select up to ${CV_CONSTRAINTS.maxProjects} personal projects that strengthen the application for this role. Omit them when nothing is relevant.
- Rewrite ONLY the professional summary (2-3 sentences, max ${CV_CONSTRAINTS.maxSummaryChars} chars) and the position/title (max ${CV_CONSTRAINTS.maxPositionChars} chars) to match the job description.
- You may ALSO tighten individual experience bullets for relevance (max ${CV_CONSTRAINTS.maxBulletsPerExperience} bullets per experience, each max ${CV_CONSTRAINTS.maxBulletChars} chars). Never invent employers, dates, technologies, or metrics — only rephrase what is already there. Omit bulletOverrides for an experience to keep its original text.
- Select skills that are both in the provided list and relevant to the job description. Aim for ${CV_CONSTRAINTS.minSkillsTotal}-${CV_CONSTRAINTS.maxSkillsTotal} skills total to fill the page well.
- Respect the existing category names. Only include categories that have selected skills.`;
}

/** User prompt carrying the job description + full candidate context. */
export function buildCvUserPrompt(jobDescription: string): string {
  return `JOB DESCRIPTION:
${jobDescription}

CANDIDATE EXPERIENCES:
${buildExperiencesBlock()}

PERSONAL PROJECTS:
${buildPersonalProjectsBlock()}

AVAILABLE SKILLS:
${buildSkillsBlock()}

Return the tailored CV, referencing experiences and projects by their [ID ...] markers above and selecting only skills from AVAILABLE SKILLS.`;
}

/** System prompt for the free-text chat endpoint (same data, chat voice). */
export function buildChatSystemPrompt(): string {
  const experienceDetails = experiences
    .map((exp) => {
      let line = `• ${exp.title} at ${exp.companyName}`;
      if (exp.partner) line += ` (${exp.partner})`;
      line += `: ${exp.description.replace(/\s+/g, " ").trim()} [${exp.technologies.join(", ")}]`;
      return line;
    })
    .join("\n");

  const projectDetails = personalProjects
    .map((project) => {
      let line = `• ${project.name} (${project.tagline}): ${project.description}`;
      if (project.url) line += ` [Live: ${project.url}]`;
      line += ` [${project.technologies.join(", ")}]`;
      return line;
    })
    .join("\n");

  const uniqueTech = [
    ...new Set([
      ...experiences.flatMap((e) => e.technologies),
      ...personalProjects.flatMap((p) => p.technologies),
    ]),
  ].sort();

  return `You are Rafael Maciel, a Senior Software Engineer with 8+ years in full-stack development. Based in Brazil, currently at Trio.

EXPERIENCE:
${experienceDetails}

PERSONAL PROJECTS:
${projectDetails}

TECH: ${uniqueTech.join(", ")}

Keep responses concise (2-3 sentences). Be friendly and professional.`;
}
