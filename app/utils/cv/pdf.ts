/**
 * A4 PDF export helpers extracted from `Resume.vue` so the component only
 * worries about rendering a `CvDocument`.
 */

export const A4_WIDTH_PX = 794;
export const A4_HEIGHT_PX = 1123; // ~794px × 297/210

function styleCloneForExport(clone: HTMLElement): void {
  clone.style.position = "absolute";
  clone.style.visibility = "hidden";
  clone.style.top = "-9999px";
  clone.style.left = "-9999px";
  clone.style.width = `${A4_WIDTH_PX}px`;
  clone.style.maxWidth = "none";
  clone.style.padding = "40px 48px";
  clone.style.boxShadow = "none";
  clone.style.margin = "0";
  clone.style.letterSpacing = "0.01px";
  clone
    .querySelectorAll<HTMLElement>("*")
    .forEach((el) => (el.style.letterSpacing = "0.01px"));
}

/** Measure the rendered resume height at A4 width (hidden clone). */
export function measureResumeHeight(
  selector = ".resume-wrapper",
): number {
  const element = document.querySelector(selector) as HTMLElement | null;
  if (!element) return 0;

  const clone = element.cloneNode(true) as HTMLElement;
  styleCloneForExport(clone);
  document.body.appendChild(clone);
  const height = clone.getBoundingClientRect().height;
  document.body.removeChild(clone);
  return height;
}

/**
 * Render the `.resume-wrapper` element to `filename`, slicing into multiple
 * A4 pages when the content overflows.
 */
export async function generateResumePDF(filename: string): Promise<void> {
  const element = document.querySelector(
    ".resume-wrapper",
  ) as HTMLElement | null;
  if (!element) return;

  const { default: jsPDF } = await import("jspdf");
  const { default: html2canvas } = await import("html2canvas-pro");

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
    width: A4_WIDTH_PX,
    windowWidth: A4_WIDTH_PX,
    onclone: (_doc: Document, clonedEl: HTMLElement) => {
      clonedEl.querySelectorAll("button").forEach((btn) => btn.remove());
      clonedEl.style.width = `${A4_WIDTH_PX}px`;
      clonedEl.style.maxWidth = "none";
      clonedEl.style.padding = "40px 48px";
      clonedEl.style.boxShadow = "none";
      clonedEl.style.margin = "0";

      /*
       * Workaround for html2canvas-pro word-spacing bug:
       * html2canvas's fast text path uses ctx.measureText() which returns
       * different widths than CSS layout, causing word collisions. Setting
       * an explicit non-default letter-spacing forces the per-character
       * rendering path that respects real glyph widths.
       */
      clonedEl
        .querySelectorAll<HTMLElement>("*")
        .forEach((el) => (el.style.letterSpacing = "0.01px"));
      clonedEl.style.letterSpacing = "0.01px";
    },
  });

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.98);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;

  const scaledHeight = (imgHeight * pdfWidth) / imgWidth;

  if (scaledHeight <= pdfHeight) {
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, scaledHeight);
  } else {
    // Multi-page: slice the canvas into page-sized chunks
    const pageCanvasHeight = (pdfHeight / pdfWidth) * imgWidth;
    const totalPages = Math.ceil(imgHeight / pageCanvasHeight);

    for (let i = 0; i < totalPages; i++) {
      if (i > 0) pdf.addPage();

      const srcY = i * pageCanvasHeight;
      const srcH = Math.min(pageCanvasHeight, imgHeight - srcY);
      const destH = (srcH * pdfWidth) / imgWidth;

      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = imgWidth;
      pageCanvas.height = srcH;
      const ctx = pageCanvas.getContext("2d")!;
      ctx.drawImage(canvas, 0, srcY, imgWidth, srcH, 0, 0, imgWidth, srcH);

      const pageData = pageCanvas.toDataURL("image/jpeg", 0.98);
      pdf.addImage(pageData, "JPEG", 0, 0, pdfWidth, destH);
    }
  }

  pdf.save(filename);
}
