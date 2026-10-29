import type { CvSelection } from "~/utils/cv/types";

/**
 * State + fetching for the "Generate a tailored CV" dialog.
 * The server (`tailorCv`) returns a finished `CvSelection` in the current
 * content locale; it is used as-is and resolved via `buildCvDocument()`.
 */
export function useTailoredCv() {
  const { t } = useI18n();
  const contentLocale = useContentLocale();
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
      const selection = await $fetch<CvSelection>("/api/cv/optimize", {
        method: "POST",
        body: { jobDescription: description, locale: contentLocale.value },
      });
      tailoredSelection.value = selection;
      return selection;
    } catch (err: unknown) {
      console.error("Tailored CV error:", err);
      const status =
        err && typeof err === "object" && "statusCode" in err
          ? err.statusCode
          : undefined;
      optimizeError.value =
        status === 429 ? t("resume.rateLimited") : t("resume.generateError");
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
