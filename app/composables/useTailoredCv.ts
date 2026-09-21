import {
  sanitizeTailoredPayload,
  type TailoredCvPayload,
} from "~/utils/cv/schema";
import type { CvSelection } from "~/utils/cv/types";

/**
 * State + fetching for the "Generate a tailored CV" dialog.
 * The server returns a `TailoredCvPayload` validated by `generateObject`
 * against `TailoredCvSchema`, i.e. the same structure the PDF resolves via
 * `buildCvDocument()`. We re-sanitize client-side as a cheap guard against
 * data drift (unknown ids / skills).
 */
export function useTailoredCv() {
  const jobDescription = ref("");
  const isGenerating = ref(false);
  const optimizeError = ref<string | null>(null);
  const tailoredSelection = ref<CvSelection | null>(null);

  const generate = async (): Promise<CvSelection | null> => {
    const description = jobDescription.value.trim();
    if (!description) return null;

    isGenerating.value = true;
    optimizeError.value = null;

    try {
      const payload = await $fetch<TailoredCvPayload>("/api/cv/optimize", {
        method: "POST",
        body: { jobDescription: description },
      });

      const sanitized = sanitizeTailoredPayload(payload);

      if (sanitized.experienceIds.length === 0) {
        throw new Error(
          "AI returned an empty experience list. Please try again.",
        );
      }

      const selection: CvSelection = {
        position: sanitized.position,
        summary: sanitized.summary,
        experienceIds: sanitized.experienceIds,
        projectIds: sanitized.projectIds,
        skills: sanitized.skills,
        bulletOverrides: sanitized.bulletOverrides,
      };
      tailoredSelection.value = selection;
      return selection;
    } catch (err: unknown) {
      console.error("Tailored CV error:", err);
      optimizeError.value =
        err instanceof Error
          ? err.message
          : "Failed to generate tailored CV. Please try again.";
      return null;
    } finally {
      isGenerating.value = false;
    }
  };

  const reset = () => {
    tailoredSelection.value = null;
    jobDescription.value = "";
    optimizeError.value = null;
  };

  return {
    jobDescription,
    isGenerating,
    optimizeError,
    tailoredSelection,
    generateTailoredSelection: generate,
    resetTailored: reset,
  };
}
