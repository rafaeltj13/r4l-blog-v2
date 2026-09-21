import {
  contactInfo,
  education,
  experienceById,
  experiences,
  personalProjectById,
} from "./data";
import type {
  CvDocument,
  CvSelection,
  Experience,
  PersonalProject,
} from "./types";

/** Split a multi-paragraph description into trimmed bullet strings. */
export function splitDescription(description: string): string[] {
  return description
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

export function formatPeriod(dateStart: string, dateEnd?: string | null): string {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  if (!dateEnd || new Date(dateEnd) > new Date()) return `${fmt(dateStart)} - Present`;
  return `${fmt(dateStart)} - ${fmt(dateEnd)}`;
}

/**
 * Resolve a `CvSelection` (preset or AI payload) into the exact `CvDocument`
 * the PDF renders. Unknown ids are dropped; order is preserved.
 */
export function buildCvDocument(selection: CvSelection): CvDocument {
  const resolvedExperiences: Experience[] = selection.experienceIds
    .map((id) => experienceById.get(id))
    .filter((e): e is Experience => Boolean(e));

  const resolvedProjects: PersonalProject[] = selection.projectIds
    .map((id) => personalProjectById.get(id))
    .filter((p): p is PersonalProject => Boolean(p));

  const bullets: Record<string, string[]> = {};
  for (const exp of resolvedExperiences) {
    const override = selection.bulletOverrides?.[exp.id];
    bullets[exp.id] =
      override && override.length > 0
        ? override
        : splitDescription(exp.description);
  }

  return {
    position: selection.position,
    summary: selection.summary,
    experiences: resolvedExperiences,
    projects: resolvedProjects,
    skills: selection.skills,
    bullets,
    contact: contactInfo,
    education,
  };
}

/** Group experiences by company for the PDF company-header layout. */
export interface GroupedExperience {
  name: string;
  title: string;
  location?: string;
  period: string;
  items: Experience[];
}

export function groupByCompany(items: Experience[]): GroupedExperience[] {
  const groups = new Map<string, GroupedExperience & { items: Experience[] }>();

  for (const item of items) {
    const existing = groups.get(item.companyName);
    if (existing) {
      existing.items.push(item);
    } else {
      groups.set(item.companyName, {
        name: item.companyName,
        title: item.title,
        location: item.location,
        period: "",
        items: [item],
      });
    }
  }

  return [...groups.values()].map((group) => {
    const latest = group.items[0];
    const earliest = group.items[group.items.length - 1];
    let period = formatPeriod(earliest.dateStart, latest.dateEnd);
    // Trio is ongoing employment shown as a range on the CV.
    if (group.name === "Trio") {
      const latestEnd = latest.dateEnd ? new Date(latest.dateEnd) : new Date();
      if (latestEnd > new Date() || latest.dateEnd?.startsWith("2026")) {
        period = "Jul 2021 - Present";
      }
    }
    return { ...group, period };
  });
}

/** All known technologies across work + personal projects (chat context). */
export function getAllTechnologies(extra: PersonalProject[] = []): string[] {
  const set = new Set<string>();
  experiences.forEach((e) => e.technologies.forEach((t) => set.add(t)));
  extra.forEach((p) => p.technologies.forEach((t) => set.add(t)));
  return [...set].sort();
}
