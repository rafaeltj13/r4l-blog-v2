import { generateText } from "ai";
import { createDeepSeek } from "@ai-sdk/deepseek";

// Note: buildChatSystemPrompt / checkRateLimit come from server/utils
// (auto-imported) — no explicit import, Nitro can't resolve relative
// directory imports at bundle time.

export default defineEventHandler(async (event) => {
  try {
    // Rate limiting by IP (shared with the CV endpoint)
    const ip = getRequestIP(event, { xForwardedFor: true }) || "unknown";
    if (!checkRateLimit(ip)) {
      throw createError({
        statusCode: 429,
        statusMessage: "Rate limit exceeded. Please try again later.",
      });
    }

    const body = await readBody(event);
    const { message } = body;

    if (!message || typeof message !== "string") {
      throw createError({
        statusCode: 400,
        statusMessage: "Message is required and must be a string",
      });
    }

    // Limit message length
    if (message.length > 500) {
      throw createError({
        statusCode: 400,
        statusMessage: "Message too long. Please keep it under 500 characters.",
      });
    }

    const config = useRuntimeConfig();
    const apiKey =
      config.deepseekApiKey || process.env.NUXT_DEEPSEEK_API_KEY;

    if (!apiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: "Deepseek API key is not configured",
      });
    }

    const deepseek = createDeepSeek({
      apiKey: apiKey,
    });

    const { text } = await generateText({
      model: deepseek("deepseek-v4-flash"),
      system: buildChatSystemPrompt(),
      prompt: message,
      maxOutputTokens: 200,
      temperature: 0.7,
    });

    return {
      message: {
        role: "assistant",
        content: text,
      },
    };
  } catch (error: unknown) {
    console.error("Chat API Error:", error);

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
