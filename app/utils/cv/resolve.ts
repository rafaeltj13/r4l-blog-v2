import { buildCvDocument } from "./document";
import { localizedCvContent } from "./localize";
import { cvPresets } from "./presets";
import type { CvDocument, CvLocale, CvPresetId, CvSelection } from "./types";

export interface ResolvedCv {
  document: CvDocument;
  filename: string;
}

/**
 * The single path from "which CV" to what gets rendered and downloaded.
 * `choice` is a Preset id or a Tailored CV's `CvSelection`. Localization
 * (content, Preset position/summary, skill category names) and Deprecated
 * filtering all happen here.
 */
export function resolveCv(
  choice: CvPresetId | CvSelection,
  locale: CvLocale,
): ResolvedCv {
  const content = localizedCvContent(locale);
  const documentOpts = {
    data: content.data,
    skillCategories: content.skillCategories,
    locale,
  };

  if (typeof choice !== "string") {
    return {
      document: buildCvDocument(choice, documentOpts),
      filename: tailoredFilename(choice.position),
    };
  }

  const preset = cvPresets[choice];
  const selection: CvSelection = {
    ...preset,
    position: content.position(choice) ?? preset.position,
    summary: content.summary(choice) ?? preset.summary,
  };
  return {
    document: buildCvDocument(selection, {
      ...documentOpts,
      includeDeprecated: preset.includeDeprecated,
    }),
    filename: preset.filename,
  };
}

/** "Senior Back-end Engenheiro" -> "Rafael_Maciel_CV_Senior_Back_end_Engenheiro.pdf" */
function tailoredFilename(position: string): string {
  const slug = position
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Za-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 60);
  return slug ? `Rafael_Maciel_CV_${slug}.pdf` : "Rafael_Maciel_Tailored_CV.pdf";
}
