/**
 * Central type-safe domain for the CV / experience feature.
 *
 * The PDF (`Resume.vue`) renders a single `CvDocument`. All three CV modes
 * (frontend preset, full-stack preset, AI-tailored) go through
 * `buildCvDocument()` so the rendered shape is always identical to what the
 * AI is asked to return.
 */

export interface Experience {
  /** Stable slug id — never an array index. Safe to send to / receive from AI. */
  id: string;
  title: string;
  companyName: string;
  /** Client / partner the work was done for (e.g. "Stamp.tv"). */
  partner?: string;
  location?: string;
  /** ISO date strings. `dateEnd: null` means "Present". */
  dateStart: string;
  dateEnd?: string | null;
  technologies: string[];
  /** Raw multi-paragraph description. Paragraphs split on blank lines. */
  description: string;
  /**
   * Deprecated entries still render on the experience timeline page, but
   * are excluded from everything download-related: presets, AI selection,
   * skill taxonomy offered to the AI, and `buildCvDocument()`.
   */
  deprecated?: boolean;
}

export interface PersonalProject {
  /** Stable slug id. */
  id: string;
  name: string;
  /** One-liner shown in bold on the CV. */
  tagline: string;
  description: string;
  technologies: string[];
  url?: string;
}

export interface CvContact {
  location: string;
  phone: string;
  email: string;
  linkedin: { label: string; url: string };
  github: { label: string; url: string };
}

export interface CvEducation {
  institution: string;
  degree: string;
  period: string;
  details: string[];
}

/** Skills grouped by display category, e.g. { "Testing": ["Jest"] } */
export type SkillMap = Record<string, string[]>;

/**
 * What the user (or the AI) selects. IDs always reference `experiences` /
 * `personalProjects` below. The PDF never renders this directly — it renders
 * the resolved `CvDocument` from `buildCvDocument()`.
 */
export interface CvSelection {
  position: string;
  summary: string;
  experienceIds: string[];
  projectIds: string[];
  skills: SkillMap;
  /**
   * Optional AI-tailored bullet overrides keyed by experience id.
   * When present they replace `splitDescription(experience.description)`.
   */
  bulletOverrides?: Record<string, string[]>;
}

/** The exact shape the PDF renders. */
export interface CvDocument {
  position: string;
  summary: string;
  experiences: Experience[];
  projects: PersonalProject[];
  skills: SkillMap;
  /** Resolved bullets per experience id (overrides applied). */
  bullets: Record<string, string[]>;
  contact: CvContact;
  education: CvEducation;
}

export type CvPresetId = "front" | "full";
