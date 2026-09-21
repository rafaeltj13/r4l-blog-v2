import type { Experience } from "./cv/types";
import { experiences } from "./cv/data";

/**
 * Backwards-compatible re-export.
 * New code should import from `~/utils/cv/data` (typed `experiences`,
 * `personalProjects`, `skillTaxonomy`) and resolve selections with
 * `buildCvDocument()` from `~/utils/cv/document`.
 */
export type { Experience };
export const experienceData: Experience[] = experiences;
