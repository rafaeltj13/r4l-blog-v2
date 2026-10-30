/**
 * Minimal types for the pdfmake 0.3 browser build (the package ships none,
 * and @types/pdfmake targets the 0.2 callback API). Only what CV Export uses.
 */
declare module "pdfmake/build/pdfmake" {
  export type PdfContent =
    | string
    | PdfContent[]
    | { [key: string]: unknown };

  export interface PdfDocDefinition {
    content: PdfContent;
    pageSize?: string;
    pageMargins?: [number, number, number, number];
    defaultStyle?: Record<string, unknown>;
    info?: Record<string, string>;
    language?: string;
    footer?: (currentPage: number, pageCount: number) => PdfContent | null;
  }

  export interface PdfOutput {
    getBuffer(): Promise<Uint8Array>;
    download(filename: string): Promise<void>;
  }

  export interface PdfMake {
    createPdf(definition: PdfDocDefinition): PdfOutput;
    addVirtualFileSystem(vfs: Record<string, string>): void;
  }

  const pdfMake: PdfMake;
  export default pdfMake;
}

declare module "pdfmake/build/vfs_fonts" {
  const vfs: Record<string, string>;
  export default vfs;
}
