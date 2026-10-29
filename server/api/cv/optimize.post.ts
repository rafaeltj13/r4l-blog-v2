import { createDeepSeek } from "@ai-sdk/deepseek";
import { z } from "zod";

// Note: tailorCv / CV_LOCALES / checkRateLimit come from server/utils
// (auto-imported) — no explicit import, Nitro can't resolve relative
// directory imports at bundle time.

const MAX_JOB_DESCRIPTION_CHARS = 12000;

export default defineEventHandler(async (event) => {
  try {
    const ip = getRequestIP(event, { xForwardedFor: true }) || "unknown";
    if (!checkRateLimit(ip)) {
      throw createError({
        statusCode: 429,
        statusMessage: "Rate limit exceeded. Please try again later.",
      });
    }

    const body = z
      .object({
        jobDescription: z.string().trim().min(1),
        locale: z.enum(CV_LOCALES).default("en"),
      })
      .safeParse(await readBody(event));

    if (!body.success) {
      throw createError({
        statusCode: 400,
        statusMessage:
          "Job description is required and locale must be 'en' or 'pt-BR'",
      });
    }

    if (body.data.jobDescription.length > MAX_JOB_DESCRIPTION_CHARS) {
      throw createError({
        statusCode: 400,
        statusMessage: `Job description is too long. Please keep it under ${MAX_JOB_DESCRIPTION_CHARS} characters.`,
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

    const deepseek = createDeepSeek({ apiKey });
    return await tailorCv(body.data, deepseek("deepseek-v4-pro"));
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
