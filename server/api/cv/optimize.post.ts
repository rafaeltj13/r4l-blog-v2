import { generateObject } from "ai";
import { createDeepSeek } from "@ai-sdk/deepseek";

import { TailoredCvSchema, sanitizeTailoredPayload } from "~/utils/cv/schema";

// Note: buildCvSystemPrompt / buildCvUserPrompt / checkRateLimit come from
// server/utils (auto-imported) — no explicit import, Nitro can't resolve
// relative directory imports at bundle time.

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
        statusMessage:
          "Job description is too long. Please keep it under 12000 characters.",
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

    /**
     * Structured output: the model MUST conform to `TailoredCvSchema` —
     * the same contract `buildCvDocument()` resolves into the `CvDocument`
     * the PDF renders. No JSON scraping, no index-based ids.
     */
    const { object } = await generateObject({
      model: deepseek("deepseek-v4-pro"),
      schema: TailoredCvSchema,
      system: buildCvSystemPrompt(),
      prompt: buildCvUserPrompt(jobDescription),
      maxOutputTokens: 1200,
      temperature: 0.5,
    });

    // Defense in depth: drop unknown ids / skills a model might hallucinate.
    const sanitized = sanitizeTailoredPayload(object);

    if (sanitized.experienceIds.length === 0) {
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
