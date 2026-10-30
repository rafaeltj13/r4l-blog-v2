import { experiences } from "~/utils/cv/data";
import { ptBRExperienceOverrides } from "~/utils/cv/data.pt-BR";
import type { CvLocale } from "~/utils/cv/types";
import { posts, type Post } from "~/utils/postsData";
import { ptBRPostTranslations } from "~/utils/postsData.pt-BR";
import { projectsData, type Project } from "~/utils/projectsData";
import { ptBRProjectDescriptionOverrides } from "~/utils/projectsData.pt-BR";

/**
 * Localized content layer.
 *
 * English files (`cv/data`, `projectsData`) are the source of truth.
 * When the locale is `pt-BR`, the `*.pt-BR` override deltas are merged on
 * top; every missing field falls back to English automatically.
 *
 * Posts work differently: they are written in English (`postsData`, the
 * original) and translated as a whole in `postsData.pt-BR`. A post is either
 * fully translated or shown in English, never mixed.
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

export interface LocalizedPost extends Post {
  /** Language the title/content/htmlContent fields are written in. */
  locale: CvLocale;
  /** True when the text comes from a translation, not the English original. */
  isTranslation: boolean;
}

function localizePost(post: Post, locale: CvLocale): LocalizedPost {
  const translation = isPtBR(locale) ? ptBRPostTranslations[post.id] : undefined;
  if (!translation) return { ...post, locale: "en", isTranslation: false };
  return { ...post, ...translation, locale, isTranslation: true };
}

/** All posts (oldest first) in the reader's language, English fallback. */
export function useLocalizedPosts(): ComputedRef<LocalizedPost[]> {
  const contentLocale = useContentLocale();
  return computed(() =>
    posts.map((post) => localizePost(post, contentLocale.value)),
  );
}

/**
 * A single post in the reader's language plus its English original, so the
 * page can offer "read the original". Undefined when the id doesn't exist.
 */
export function useLocalizedPost(id: MaybeRefOrGetter<string>) {
  const contentLocale = useContentLocale();
  return computed(() => {
    const original = posts.find((post) => post.id === toValue(id));
    if (!original) return undefined;
    return {
      post: localizePost(original, contentLocale.value),
      original: localizePost(original, "en"),
    };
  });
}
