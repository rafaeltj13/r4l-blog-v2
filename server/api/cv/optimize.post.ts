import { generateText } from "ai";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { z } from "zod";

import { experienceData } from "~/utils/experienceData";

interface ExperienceItem {
  title: string;
  companyName: string;
  technologies: string[];
  dateStart: string;
  dateEnd: string;
  description: string;
  partner?: string;
}

// Simple in-memory rate limiting (resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // Max requests per window
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
};

const AVAILABLE_SKILL_CATEGORIES: Record<string, string[]> = {
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

const buildExperiencesBlock = (): string => {
  return experienceData
    .map((exp: ExperienceItem, index: number) => {
      const lines: string[] = [];
      lines.push(`[ID ${index}] ${exp.title} @ ${exp.companyName}`);
      if (exp.partner) lines.push(`  Partner/Project: ${exp.partner}`);
      lines.push(`  Period: ${exp.dateStart} to ${exp.dateEnd}`);
      lines.push(`  Technologies: ${exp.technologies.join(", ")}`);
      lines.push(`  Description: ${exp.description.replace(/\n\s*\n/g, " ").trim()}`);
      return lines.join("\n");
    })
    .join("\n\n");
};

const buildSkillsBlock = (): string => {
  return Object.entries(AVAILABLE_SKILL_CATEGORIES)
    .map(([category, skills]) => `${category}: ${skills.join(", ")}`)
    .join("\n");
};

const buildSystemPrompt = (): string => {
  return `You are an expert CV optimizer. Your task is to tailor a one-page CV for a specific job description.

You will receive:
1. A job description.
2. The candidate's full work history.
3. A list of available skills grouped by category.

Rules:
- Analyze the job description to determine whether the role is frontend-focused, full-stack, backend-focused, mobile, etc.
- Select the MOST RELEVANT experiences for the job description. Default to 4 experiences. Only reduce to 3 if the selected descriptions are exceptionally long and would overflow one page.
- Do NOT rewrite experience bullet points. Only select which experiences to include.
- Rewrite ONLY the professional summary (2-3 sentences) and the position/title to match the job description.
- Select skills that are both in the provided list and relevant to the job description. Aim for 8-12 skills total to fill the page well.
- Respect the existing category names ("Frameworks & Libraries", "Testing", "Data & Cloud"). Only include categories that have selected skills.
- If the job description leans frontend, emphasize React/Vue/Next/Nuxt/React Native and relevant frontend work.
- If it leans full-stack/backend, emphasize Node.js, databases, cloud, and backend work.
- Return only valid JSON. Do not include markdown code blocks or explanations.`;
};

const buildUserPrompt = (jobDescription: string): string => {
  return `JOB DESCRIPTION:
${jobDescription}

CANDIDATE EXPERIENCES:
${buildExperiencesBlock()}

AVAILABLE SKILLS:
${buildSkillsBlock()}

Based on the job description, determine the best focus (frontend, full-stack, backend, etc.) and return a JSON object exactly matching this structure:
{
  "position": "Tailored job title (max 80 chars)",
  "summary": "Concise 2-3 sentence professional summary (max 350 chars)",
  "selectedExperienceIds": [0, 2, 5, 7],
  "selectedSkills": {
    "Frameworks & Libraries": ["React.js", "Next.js", "Node.js", "TypeScript"],
    "Testing": ["Jest", "Vitest"],
    "Data & Cloud": ["PostgreSQL", "MongoDB"]
  }
}

selectedExperienceIds must contain 4 IDs from the [ID X] markers above by default. Use 3 only if the selected descriptions are exceptionally long.
selectedSkills must only include skills listed in AVAILABLE SKILLS, with 8-12 skills total across all categories.`;
};

const OptimizeCvSchema = z.object({
  position: z.string().max(80).default("Senior Software Engineer"),
  summary: z.string().max(350).default(""),
  selectedExperienceIds: z.array(z.coerce.number().int()).max(4).default([]),
  selectedSkills: z.record(z.array(z.string())).default({}),
});

const extractJson = (text: string): unknown => {
  // Try to find JSON in markdown code blocks first
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (codeBlockMatch) {
    return JSON.parse(codeBlockMatch[1]);
  }

  // Otherwise look for the first JSON object in the text
  const objectMatch = text.match(/\{[\s\S]*\}/);
  if (objectMatch) {
    return JSON.parse(objectMatch[0]);
  }

  return JSON.parse(text);
};

const sanitizeResponse = (raw: unknown) => {
  // Normalize the raw input: accept an object, or the first object in an array
  let data = raw;
  if (Array.isArray(data) && data.length > 0) {
    data = data[0];
  }
  if (!data || typeof data !== "object") {
    throw new Error("AI returned invalid data structure (not an object)");
  }

  const obj = data as Record<string, unknown>;

  // Extract position / title
  let position = "Senior Software Engineer";
  if (typeof obj.position === "string") position = obj.position;
  else if (typeof obj.title === "string") position = obj.title;

  // Extract summary
  let summary = "";
  if (typeof obj.summary === "string") summary = obj.summary;

  // Extract experience IDs, accepting several possible key names and value types
  const allAvailableSkills = new Set(Object.values(AVAILABLE_SKILL_CATEGORIES).flat());
  const experienceIdKeys = ["selectedExperienceIds", "experienceIds", "selectedExperiences", "experiences"];
  let validExperienceIds: number[] = [];

  for (const key of experienceIdKeys) {
    const value = obj[key];
    if (!Array.isArray(value)) continue;

    const ids = value
      .map((item) => {
        if (typeof item === "number") return item;
        if (typeof item === "string") {
          const parsed = parseInt(item, 10);
          return Number.isNaN(parsed) ? null : parsed;
        }
        if (item && typeof item === "object" && "id" in item && typeof item.id === "number") return item.id;
        return null;
      })
      .filter((id): id is number => id !== null && Number.isInteger(id) && id >= 0 && id < experienceData.length);

    if (ids.length > 0) {
      validExperienceIds = ids;
      break;
    }
  }

  // Extract skills, accepting several possible key names
  const skillKeys = ["selectedSkills", "skills"];
  const selectedSkills: Record<string, string[]> = {};

  for (const key of skillKeys) {
    const value = obj[key];
    if (!value || typeof value !== "object" || Array.isArray(value)) continue;

    Object.entries(value).forEach(([category, skills]) => {
      if (!Array.isArray(skills)) return;
      const validSkills = skills
        .filter((skill): skill is string => typeof skill === "string")
        .filter((skill) => allAvailableSkills.has(skill));
      if (validSkills.length > 0) {
        selectedSkills[category] = validSkills;
      }
    });

    if (Object.keys(selectedSkills).length > 0) break;
  }

  return {
    position: position.slice(0, 80),
    summary: summary.slice(0, 350),
    selectedExperienceIds: validExperienceIds.slice(0, 4),
    selectedSkills,
  };
};

export default defineEventHandler(async (event) => {
  try {
    const ip = getRequestIP(event, { xForwardedFor: true }) || "unknown";
    if (!checkRateLimit(ip)) {
      throw createError({
        statusCode: 429,
        statusMessage: "Rate limit exceeded. Please try again later.",
      });
    }

    const body = await readBody(event);
    const { jobDescription } = body;

    if (!jobDescription || typeof jobDescription !== "string") {
      throw createError({
        statusCode: 400,
        statusMessage: "Job description is required and must be a string",
      });
    }

    if (jobDescription.length > 12000) {
      throw createError({
        statusCode: 400,
        statusMessage: "Job description is too long. Please keep it under 12000 characters.",
      });
    }

    const config = useRuntimeConfig();
    const apiKey = config.deepseekApiKey || process.env.NUXT_DEEPSEEK_API_KEY;

    if (!apiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: "Deepseek API key is not configured",
      });
    }

    const deepseek = createDeepSeek({
      apiKey,
    });

    const { text } = await generateText({
      model: deepseek("deepseek-v4-pro"),
      system: buildSystemPrompt(),
      prompt: buildUserPrompt(jobDescription),
      maxTokens: 1000,
      temperature: 0.5,
    });

    const rawObject = extractJson(text);
    console.log("CV optimize raw AI response:", JSON.stringify({ text: text.slice(0, 2000), parsed: rawObject }));
    const sanitized = sanitizeResponse(rawObject);

    if (sanitized.selectedExperienceIds.length === 0) {
      throw createError({
        statusCode: 500,
        statusMessage: "AI returned no valid experiences. Please try again.",
      });
    }

    return sanitized;
  } catch (error: unknown) {
    console.error("CV Optimize API Error:", error);

    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
});
