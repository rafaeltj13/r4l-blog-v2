import {
  contactInfo,
  deprecatedOnlyTechnologies,
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
  // UTC getters: plain "YYYY-MM-DD" strings parse as UTC midnight, and
  // toLocaleDateString would shift them into the previous month west of GMT.
  const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const fmt = (d: string) => {
    const dt = new Date(d);
    return `${MONTHS[dt.getUTCMonth()]} ${dt.getUTCFullYear()}`;
  };
  if (!dateEnd || new Date(dateEnd) > new Date()) return `${fmt(dateStart)} - Present`;
  return `${fmt(dateStart)} - ${fmt(dateEnd)}`;
}

/**
 * Resolve a `CvSelection` (preset or AI payload) into the exact `CvDocument`
 * the PDF renders. Unknown ids are dropped; order is preserved.
 * Deprecated experiences (and their exclusive skills) never reach the
 * document, even if a stale preset or AI payload references them.
 */
export function buildCvDocument(
  selection: CvSelection,
  opts: { includeDeprecated?: boolean } = {},
): CvDocument {
  const excludedSkills = opts.includeDeprecated
    ? new Set<string>()
    : deprecatedOnlyTechnologies();

  const resolvedExperiences: Experience[] = selection.experienceIds
    .map((id) => experienceById.get(id))
    .filter(
      (e): e is Experience =>
        Boolean(e) && (opts.includeDeprecated || !e.deprecated),
    );

  const resolvedProjects: PersonalProject[] = selection.projectIds
    .map((id) => personalProjectById.get(id))
    .filter(
      (p): p is PersonalProject =>
        Boolean(p) && (opts.includeDeprecated || !p.deprecated),
    );

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
    skills: filterDeprecatedSkills(selection.skills, excludedSkills),
    bullets,
    contact: contactInfo,
    education,
  };
}

/** Strip deprecated-only technologies from a skill map (keeps categories). */
function filterDeprecatedSkills(
  skills: CvSelection["skills"],
  excluded: Set<string>,
): CvSelection["skills"] {
  if (excluded.size === 0) return skills;
  const result: CvSelection["skills"] = {};
  for (const [category, list] of Object.entries(skills)) {
    const kept = list.filter((s) => !excluded.has(s));
    if (kept.length > 0) result[category] = kept;
  }
  return result;
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
    // Tenure spans the ENTIRE history at the company (full dataset,
    // including non-selected and deprecated entries) — not just the
    // experiences picked for this download.
    const fullHistory = experiences.filter(
      (e) => e.companyName === group.name,
    );
    const earliest = fullHistory.reduce((a, b) =>
      b.dateStart < a.dateStart ? b : a,
    );
    // A missing end date (ongoing) always wins over dated entries.
    const latest = fullHistory.reduce((a, b) => {
      if (!b.dateEnd) return b;
      if (!a.dateEnd) return a;
      return b.dateEnd > a.dateEnd ? b : a;
    });

    let period = formatPeriod(earliest.dateStart, latest.dateEnd);
    // Trio is ongoing employment shown as a range on the CV.
    if (
      group.name === "Trio" &&
      (!latest.dateEnd ||
        new Date(latest.dateEnd) > new Date() ||
        latest.dateEnd.startsWith("2026"))
    ) {
      period = formatPeriod(earliest.dateStart, null);
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
