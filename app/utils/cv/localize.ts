import { englishDataSource } from "./document";
import {
  ptBRContactLocation,
  ptBREducation,
  ptBRExperienceOverrides,
  ptBRPersonalProjectOverrides,
  ptBRPositions,
  ptBRSkillCategories,
  ptBRSummaries,
} from "./data.pt-BR";
import type { CvDataSource, CvLocale, CvPresetId } from "./types";

export interface LocalizedCv {
  data: CvDataSource;
  /** Category renames for `buildCvDocument`, or undefined for English. */
  skillCategories?: Record<string, string>;
  /**
   * Localized position/summary, or null when English so callers keep
   * their own source-of-truth strings (presets, FULL_SUMMARY).
   */
  position: (preset: CvPresetId | "all") => string | null;
  summary: (preset: CvPresetId | "all") => string | null;
}

/**
 * Full CV content in `locale`: English source of truth with the pt-BR
 * override deltas merged on top (English fallback per field). Plain function
 * so both the page (`useLocalizedCv`) and the server (`tailorCv`) use the
 * same merge.
 */
export function localizedCvContent(locale: CvLocale): LocalizedCv {
  if (locale !== "pt-BR") {
    return {
      data: englishDataSource,
      skillCategories: undefined,
      position: () => null,
      summary: () => null,
    };
  }

  const localizedExperiences = englishDataSource.experiences.map(
    (experience) => ({
      ...experience,
      ...ptBRExperienceOverrides[experience.id],
    }),
  );
  const localizedProjects = englishDataSource.personalProjects.map(
    (project) => ({
      ...project,
      ...ptBRPersonalProjectOverrides[project.id],
    }),
  );

  return {
    data: {
      experiences: localizedExperiences,
      experienceById: new Map(localizedExperiences.map((e) => [e.id, e])),
      personalProjects: localizedProjects,
      personalProjectById: new Map(localizedProjects.map((p) => [p.id, p])),
      contact: {
        ...englishDataSource.contact,
        location: ptBRContactLocation,
      },
      education: ptBREducation,
    },
    skillCategories: ptBRSkillCategories,
    position: (preset) => ptBRPositions[preset],
    summary: (preset) => ptBRSummaries[preset],
  };
}
