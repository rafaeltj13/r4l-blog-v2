import type { CvDocument } from "../types";

export const BASE_FONT_SIZE = 9;
const MIN_FONT_SIZE = 8;
const FONT_STEP = 0.25;
const MIN_EXPERIENCES = 2;
const MIN_BULLETS = 2;

/** Pages a document renders to at a given body font size. */
export type PageCounter = (
  document: CvDocument,
  fontSize: number,
) => Promise<number>;

export interface FittedCv {
  document: CvDocument;
  fontSize: number;
}

/**
 * One-page fit: trim the CV Document in small steps until it renders to one
 * page, then fall back to smaller type, then allow a second page.
 *
 * Trim order, least relevant first (experiences and projects are ordered
 * most to least relevant):
 *   1. last bullet of the last experience with more than 2 bullets
 *   2. personal projects, last first
 *   3. the last experience, never below 2
 *
 * Trimming only ever shortens the document, so the trim sequence is
 * monotonic and binary-searched: ~5 renders instead of one per step.
 * The first fitting step can be a big one (a whole experience), so
 * `refill` then puts smaller trimmed items back while the page still fits.
 */
export async function fitToOnePage(
  document: CvDocument,
  countPages: PageCounter,
): Promise<FittedCv> {
  const candidates = [document];
  for (let next = trimOnce(document); next; next = trimOnce(next)) {
    candidates.push(next);
  }

  const fits = async (doc: CvDocument, fontSize: number) =>
    (await countPages(doc, fontSize)) <= 1;

  if (await fits(document, BASE_FONT_SIZE)) {
    return { document, fontSize: BASE_FONT_SIZE };
  }

  const smallest = candidates[candidates.length - 1]!;
  if (await fits(smallest, BASE_FONT_SIZE)) {
    // Invariant: candidates[lo] overflows, candidates[hi] fits.
    let lo = 0;
    let hi = candidates.length - 1;
    while (hi - lo > 1) {
      const mid = Math.floor((lo + hi) / 2);
      if (await fits(candidates[mid]!, BASE_FONT_SIZE)) hi = mid;
      else lo = mid;
    }
    const fitted = await refill(document, candidates[hi]!, (doc) =>
      fits(doc, BASE_FONT_SIZE),
    );
    return { document: fitted, fontSize: BASE_FONT_SIZE };
  }

  for (
    let fontSize = BASE_FONT_SIZE - FONT_STEP;
    fontSize >= MIN_FONT_SIZE;
    fontSize -= FONT_STEP
  ) {
    if (await fits(smallest, fontSize)) return { document: smallest, fontSize };
  }
  // Nothing fits on one page: keep the minimum font and spill onto page 2.
  return { document: smallest, fontSize: MIN_FONT_SIZE };
}

/** Renders `refill` may spend; each is one pdfmake layout. */
const MAX_REFILL_ATTEMPTS = 8;

/**
 * Restore trimmed projects, then trimmed bullets of the most relevant
 * remaining experiences, keeping each only if the page still fits.
 * Dropped experiences stay dropped.
 */
async function refill(
  original: CvDocument,
  fitted: CvDocument,
  fits: (document: CvDocument) => Promise<boolean>,
): Promise<CvDocument> {
  let current = fitted;
  let attempts = 0;
  const tryKeep = async (next: CvDocument) => {
    attempts++;
    if (!(await fits(next))) return false;
    current = next;
    return true;
  };

  while (
    attempts < MAX_REFILL_ATTEMPTS &&
    current.projects.length < original.projects.length
  ) {
    const restored = {
      ...current,
      projects: original.projects.slice(0, current.projects.length + 1),
    };
    if (!(await tryKeep(restored))) break;
  }

  for (const experience of current.experiences) {
    const all = original.bullets[experience.id] ?? [];
    while (attempts < MAX_REFILL_ATTEMPTS) {
      const shown = current.bullets[experience.id]?.length ?? 0;
      if (shown >= all.length) break;
      const restored = {
        ...current,
        bullets: { ...current.bullets, [experience.id]: all.slice(0, shown + 1) },
      };
      if (!(await tryKeep(restored))) break;
    }
  }

  return current;
}

/** One trim step, or null when nothing more may be removed. */
function trimOnce(document: CvDocument): CvDocument | null {
  for (let i = document.experiences.length - 1; i >= 0; i--) {
    const id = document.experiences[i]!.id;
    const list = document.bullets[id] ?? [];
    if (list.length > MIN_BULLETS) {
      return {
        ...document,
        bullets: { ...document.bullets, [id]: list.slice(0, -1) },
      };
    }
  }

  if (document.projects.length > 0) {
    return { ...document, projects: document.projects.slice(0, -1) };
  }

  if (document.experiences.length > MIN_EXPERIENCES) {
    const dropped = document.experiences[document.experiences.length - 1]!;
    const bullets = Object.fromEntries(
      Object.entries(document.bullets).filter(([id]) => id !== dropped.id),
    );
    return {
      ...document,
      experiences: document.experiences.slice(0, -1),
      bullets,
    };
  }

  return null;
}
