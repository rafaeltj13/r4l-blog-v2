import { englishDataSource } from "~/utils/cv/document";
import {
  experiences,
  skillTaxonomy,
} from "~/utils/cv/data";
import {
  ptBRContactLocation,
  ptBREducation,
  ptBRExperienceOverrides,
  ptBRPersonalProjectOverrides,
  ptBRPositions,
  ptBRSkillCategories,
  ptBRSummaries,
} from "~/utils/cv/data.pt-BR";
import type {
  CvDataSource,
  CvLocale,
  CvPresetId,
} from "~/utils/cv/types";
import { projectsData, type Project } from "~/utils/projectsData";
import { ptBRProjectDescriptionOverrides } from "~/utils/projectsData.pt-BR";

/**
 * Localized content layer.
 *
 * English files (`cv/data`, `projectsData`) are the source of truth.
 * When the locale is `pt-BR`, the `*.pt-BR` override deltas are merged on
 * top; every missing field falls back to English automatically. Posts are
 * intentionally excluded — they keep their own structure and stay English.
 */

/** Content locale derived from the active i18n locale. */
export function useContentLocale(): ComputedRef<CvLocale> {
  const { locale } = useI18n();
  return computed<CvLocale>(() =>
    locale.value === "pt-BR" ? "pt-BR" : "en",
  );
}

export function isPtBR(locale: CvLocale): boolean {
  return locale === "pt-BR";
}

/** Work history with pt-BR overrides applied (English fallback). */
export function useLocalizedExperiences() {
  const contentLocale = useContentLocale();
  return computed(() => {
    if (!isPtBR(contentLocale.value)) return experiences;
    return experiences.map((experience) => ({
      ...experience,
      ...ptBRExperienceOverrides[experience.id],
    }));
  });
}

/** Personal projects with pt-BR descriptions applied (English fallback). */
export function useLocalizedProjects(): ComputedRef<Project[]> {
  const contentLocale = useContentLocale();
  return computed(() => {
    if (!isPtBR(contentLocale.value)) return projectsData;
    return projectsData.map((project) => {
      const description = ptBRProjectDescriptionOverrides[project.id];
      return description ? { ...project, description } : project;
    });
  });
}

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

/** Full CV content source (experiences, projects, contact, education). */
export function useLocalizedCv(): ComputedRef<LocalizedCv> {
  const contentLocale = useContentLocale();
  return computed<LocalizedCv>(() => {
    if (!isPtBR(contentLocale.value)) {
      return {
        data: englishDataSource,
        skillCategories: undefined,
        position: () => null,
        summary: () => null,
      };
    }

    const localizedExperiences = experiences.map((experience) => ({
      ...experience,
      ...ptBRExperienceOverrides[experience.id],
    }));
    const localizedProjects = englishDataSource.personalProjects.map(
      (project) => ({
        ...project,
        ...ptBRPersonalProjectOverrides[project.id],
      }),
    );

    return {
      data: {
        experiences: localizedExperiences,
        experienceById: new Map(
          localizedExperiences.map((e) => [e.id, e]),
        ),
        personalProjects: localizedProjects,
        personalProjectById: new Map(
          localizedProjects.map((p) => [p.id, p]),
        ),
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
  });
}

/** Skill taxonomy for the "show everything" Resume view. */
export function useLocalizedSkillTaxonomy() {
  const contentLocale = useContentLocale();
  return computed(() => {
    if (!isPtBR(contentLocale.value)) return skillTaxonomy;
    const result: Record<string, string[]> = {};
    for (const [category, skills] of Object.entries(skillTaxonomy)) {
      result[ptBRSkillCategories[category] ?? category] = skills;
    }
    return result;
  });
}
