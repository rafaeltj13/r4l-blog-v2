import type {
  PdfContent,
  PdfDocDefinition,
} from "pdfmake/build/pdfmake";

import { FULL_NAME } from "../data";
import { groupByCompany } from "../document";
import type { CvDocument } from "../types";

/** Translated section headings, passed in by the caller (vue-i18n). */
export interface CvSectionLabels {
  summary: string;
  skills: string;
  professionalExperience: string;
  personalProjects: string;
  education: string;
}

/** Fixed CV accent: the PDF never follows the site's daisyUI theme. */
const ACCENT = "#1e3a5f";
const TEXT = "#1e293b";
const MUTED = "#475569";
const FAINT = "#64748b";
const RULE = "#cbd5e1";

const PAGE_MARGINS: [number, number, number, number] = [42, 34, 42, 30];
/** A4 width (595pt) minus horizontal margins. */
const CONTENT_WIDTH = 595 - PAGE_MARGINS[0] - PAGE_MARGINS[2];

/**
 * Lay a CV Document out as an A4 pdfmake definition. Pure: the same document
 * and font size always produce the same layout, which is what lets the
 * One-page fit measure by rendering.
 */
export function cvPdfDefinition(
  document: CvDocument,
  labels: CvSectionLabels,
  fontSize: number,
): PdfDocDefinition {
  const f = fontSize;

  const sectionHeading = (label: string): PdfContent => ({
    stack: [
      {
        text: label.toUpperCase(),
        fontSize: f - 1,
        bold: true,
        color: ACCENT,
      },
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 2,
            x2: CONTENT_WIDTH,
            y2: 2,
            lineWidth: 0.5,
            lineColor: RULE,
          },
        ],
      },
    ],
    margin: [0, 9, 0, 4],
  });

  const bullets = (items: string[]): PdfContent => ({
    ul: items,
    markerColor: ACCENT,
    margin: [4, 1, 0, 0],
  });

  const techLine = (technologies: string[]): PdfContent[] =>
    technologies.length > 0
      ? [
          {
            text: technologies.join(" · "),
            fontSize: f - 1.5,
            color: FAINT,
            margin: [12, 1, 0, 0],
          },
        ]
      : [];

  const sep = { text: "  |  ", color: RULE };
  const { contact } = document;

  const header: PdfContent = [
    {
      text: FULL_NAME,
      fontSize: f + 7,
      bold: true,
      color: ACCENT,
      alignment: "center",
    },
    {
      text: document.position,
      fontSize: f + 0.5,
      color: MUTED,
      alignment: "center",
      margin: [0, 2, 0, 4],
    },
    {
      text: [
        contact.location,
        sep,
        { text: contact.phone, link: `tel:${contact.phone.replace(/\s/g, "")}` },
        sep,
        { text: contact.email, link: `mailto:${contact.email}` },
      ],
      fontSize: f - 1,
      color: MUTED,
      alignment: "center",
    },
    {
      text: [
        { text: contact.linkedin.label, link: contact.linkedin.url },
        sep,
        { text: contact.github.label, link: contact.github.url },
      ],
      fontSize: f - 1,
      color: ACCENT,
      alignment: "center",
      margin: [0, 1, 0, 0],
    },
  ];

  const skills: PdfContent = {
    table: {
      widths: [120, "*"],
      body: Object.entries(document.skills).map(([category, list]) => [
        { text: category, bold: true },
        { text: list.join(" · "), color: MUTED },
      ]),
    },
    layout: {
      hLineWidth: () => 0,
      vLineWidth: () => 0,
      paddingLeft: () => 0,
      paddingRight: () => 6,
      paddingTop: () => 1,
      paddingBottom: () => 1,
    },
  };

  const experience: PdfContent = groupByCompany(document.experiences, {
    locale: document.locale,
  }).map((group, index) => ({
    stack: [
      {
        columns: [
          {
            width: "*",
            text: [
              { text: group.title, bold: true },
              { text: ` @ ${group.name}`, color: MUTED },
            ],
            fontSize: f + 0.5,
          },
          {
            width: "auto",
            text: group.period,
            fontSize: f - 1,
            color: FAINT,
          },
        ],
      },
      // Optional lines are spread in, never "": pdfmake renders an empty
      // string as a blank line.
      ...(group.location
        ? [{ text: group.location, fontSize: f - 1.5, color: FAINT }]
        : []),
      ...group.items.map((item) => ({
        stack: [
          ...(item.partner
            ? [{ text: item.partner, bold: true, margin: [0, 3, 0, 0] }]
            : []),
          bullets(document.bullets[item.id] ?? []),
          ...techLine(item.technologies),
        ],
        margin: [0, item.partner ? 0 : 2, 0, 0],
      })),
    ],
    margin: [0, index === 0 ? 0 : 6, 0, 0],
  }));

  const projects: PdfContent = document.projects.map((project) => ({
    stack: [
      {
        text: [
          project.url
            ? { text: project.name, bold: true, link: project.url }
            : { text: project.name, bold: true },
          { text: ` — ${project.tagline}`, color: MUTED },
        ],
      },
      bullets([project.description]),
      ...techLine(project.technologies),
    ],
    margin: [0, 0, 0, 3],
  }));

  const { education } = document;

  return {
    pageSize: "A4",
    pageMargins: PAGE_MARGINS,
    language: document.locale,
    info: { title: `${FULL_NAME} — CV`, author: FULL_NAME },
    defaultStyle: { font: "Roboto", fontSize: f, lineHeight: 1.2, color: TEXT },
    content: [
      header,
      sectionHeading(labels.summary),
      { text: document.summary, color: MUTED },
      sectionHeading(labels.skills),
      skills,
      sectionHeading(labels.professionalExperience),
      experience,
      ...(document.projects.length > 0
        ? [sectionHeading(labels.personalProjects), projects]
        : []),
      sectionHeading(labels.education),
      {
        columns: [
          { width: "*", text: education.institution, bold: true },
          {
            width: "auto",
            text: education.period,
            fontSize: f - 1,
            color: FAINT,
          },
        ],
      },
      { text: education.degree, color: MUTED },
      bullets(education.details),
    ],
  };
}
