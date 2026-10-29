/**
 * CV context for the free-text `/api/chat` endpoint. Fed from the same typed
 * source as Tailoring (`tailorCv`): `~/utils/cv/data`. Adding an experience
 * or personal project there automatically flows into both features.
 */
import { experiences, personalProjects } from "~/utils/cv/data";

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
