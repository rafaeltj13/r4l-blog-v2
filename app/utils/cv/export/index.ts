import type { PdfMake } from "pdfmake/build/pdfmake";

import type { CvDocument } from "../types";
import { fitToOnePage } from "./fit";
import { cvPdfDefinition, type CvSectionLabels } from "./layout";

export type { CvSectionLabels } from "./layout";

let pdfMakePromise: Promise<PdfMake> | null = null;

/** pdfmake + Roboto (~2 MB) load on the first export, not with the page. */
function loadPdfMake(): Promise<PdfMake> {
  pdfMakePromise ??= (async () => {
    const [{ default: pdfMake }, { default: vfs }] = await Promise.all([
      import("pdfmake/build/pdfmake"),
      import("pdfmake/build/vfs_fonts"),
    ]);
    pdfMake.addVirtualFileSystem(vfs);
    return pdfMake;
  })();
  pdfMakePromise.catch(() => (pdfMakePromise = null));
  return pdfMakePromise;
}

/**
 * CV Export: CV Document in, one-page A4 PDF with real text and links
 * saved as `filename`. Applies the One-page fit before saving.
 */
export async function exportCv(
  document: CvDocument,
  filename: string,
  labels: CvSectionLabels,
): Promise<void> {
  const pdfMake = await loadPdfMake();

  const fitted = await fitToOnePage(document, async (doc, fontSize) => {
    let pages = 0;
    await pdfMake
      .createPdf({
        ...cvPdfDefinition(doc, labels, fontSize),
        footer: (_page, pageCount) => {
          pages = pageCount;
          return null;
        },
      })
      .getBuffer();
    return pages;
  });

  await pdfMake
    .createPdf(cvPdfDefinition(fitted.document, labels, fitted.fontSize))
    .download(filename);
}
