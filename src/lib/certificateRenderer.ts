import {
  PDFDocument,
  PDFFont,
  PDFPage,
  StandardFonts,
  rgb,
} from "pdf-lib";
import { certificateLayout, CertificateLayout, LayoutField } from "@/lib/certificateLayout";

export type CertificateValues = Record<string, string>;

const FIELD_KEYS: Array<keyof Omit<CertificateLayout, "qr">> = [
  "studentName",
  "level",
  "language",
  "leftGrade",
  "monthYear",
  "listening",
  "oral",
  "reading",
  "writing",
  "total",
  "resultGrade",
  "issuePlace",
  "issueDate",
  "certificateNumber",
];

const VALUE_MAP: Record<keyof Omit<CertificateLayout, "qr">, string | ((values: CertificateValues) => string)> = {
  studentName: "studentFullName",
  level: "courseLevel",
  language: (values) => cleanLanguage(values.courseName),
  leftGrade: "grade",
  monthYear: (values) =>
    values.monthYear ||
    formatMonthYear(values.dateOfExam) ||
    formatMonthYear(values.issueDate),
  reading: "readingScore",
  listening: "listeningScore",
  writing: "writtenExpressionScore",
  oral: "oralTestScore",
  total: "totalScore",
  resultGrade: "grade",
  issuePlace: "issuePlace",
  issueDate: "issueDate",
  certificateNumber: "certificateNumber",
};

const SAMPLE_VALUES: CertificateValues = {
  studentFullName: "Arun mohan k",
  courseLevel: "A1",
  courseName: "German Language",
  grade: "Very good",
  monthYear: "March 2025",
  listeningScore: "32",
  oralTestScore: "56",
  readingScore: "76",
  writtenExpressionScore: "33",
  totalScore: "197",
  issuePlace: "Chennai",
  issueDate: "22/03/2025",
  certificateNumber: "FLA-251-23913",
};

type FontSet = {
  sans: PDFFont;
  sansBold: PDFFont;
  serif: PDFFont;
  serifBold: PDFFont;
  serifItalic: PDFFont;
  serifBoldItalic: PDFFont;
};

function resolveValue(values: CertificateValues, key: keyof Omit<CertificateLayout, "qr">) {
  const resolver = VALUE_MAP[key];
  return typeof resolver === "function" ? resolver(values) : values[resolver] ?? "";
}

function cleanLanguage(value = "") {
  return value
    .replace(/\s+language\s+course$/i, "")
    .replace(/\s+language$/i, "")
    .trim();
}

function formatMonthYear(value = "") {
  const trimmed = value.trim();
  if (!trimmed) return "";

  const match = trimmed.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
  if (!match) return trimmed;

  const monthIndex = Number(match[2]) - 1;
  const year = match[3].length === 2 ? `20${match[3]}` : match[3];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months[monthIndex] ? `${months[monthIndex]} ${year}` : trimmed;
}

function colorToRgb(color = "#111111") {
  const hex = color.replace("#", "");
  const normalized = hex.length === 3
    ? hex.split("").map((char) => `${char}${char}`).join("")
    : hex;

  const value = Number.parseInt(normalized, 16);
  return rgb(
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255
  );
}

function fontFor(field: LayoutField, fonts: FontSet) {
  const numericWeight = Number(field.weight ?? "400");
  const isBold = Number.isFinite(numericWeight)
    ? numericWeight >= 700
    : field.weight === "bold";

  if (field.family === "serif") {
    if (field.style === "italic" && isBold) {
      return fonts.serifBoldItalic;
    }
    return field.style === "italic" ? fonts.serifItalic : fonts.serif;
  }

  return isBold ? fonts.sansBold : fonts.sans;
}

function fittedSize(font: PDFFont, value: string, field: LayoutField, scaleX: number) {
  if (!field.maxWidth) return field.fontSize * scaleX;

  let size = field.fontSize * scaleX;
  const minSize = (field.minFontSize ?? 5) * scaleX;
  const maxWidth = field.maxWidth * scaleX;

  while (size > minSize && font.widthOfTextAtSize(value, size) > maxWidth) {
    size -= 0.5;
  }

  return size;
}

function drawValue({
  page,
  fonts,
  sourceWidth,
  sourceHeight,
  field,
  value,
}: {
  page: PDFPage;
  fonts: FontSet;
  sourceWidth: number;
  sourceHeight: number;
  field: LayoutField;
  value: string;
}) {
  if (!value) return;

  const { width, height } = page.getSize();
  const scaleX = width / sourceWidth;
  const scaleY = height / sourceHeight;
  const font = fontFor(field, fonts);
  const size = fittedSize(font, value, field, scaleX);
  const textWidth = font.widthOfTextAtSize(value, size);

  let x = field.x * scaleX;
  if (field.align === "center") x -= textWidth / 2;
  if (field.align === "right") x -= textWidth;

  const y = height - field.y * scaleY;

  page.drawText(value, {
    x,
    y,
    size,
    font,
    color: colorToRgb(field.color),
  });
}

async function embedFonts(pdfDoc: PDFDocument): Promise<FontSet> {
  const [sans, sansBold, serif, serifBold, serifItalic, serifBoldItalic] =
    await Promise.all([
      pdfDoc.embedFont(StandardFonts.Helvetica),
      pdfDoc.embedFont(StandardFonts.HelveticaBold),
      pdfDoc.embedFont(StandardFonts.TimesRoman),
      pdfDoc.embedFont(StandardFonts.TimesRomanBold),
      pdfDoc.embedFont(StandardFonts.TimesRomanItalic),
      pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic),
    ]);

  return { sans, sansBold, serif, serifBold, serifItalic, serifBoldItalic };
}

export async function renderCertificatePdf(
  templatePdf: ArrayBuffer | Uint8Array,
  values: CertificateValues
) {
  const pdfDoc = await PDFDocument.load(templatePdf);
  const page = pdfDoc.getPage(0);
  const fonts = await embedFonts(pdfDoc);

  const sourceWidth = 794;
  const sourceHeight = 1123;

  for (const key of FIELD_KEYS) {
    drawValue({
      page,
      fonts,
      sourceWidth,
      sourceHeight,
      field: certificateLayout[key],
      value: resolveValue(values, key),
    });
  }

  return pdfDoc.save();
}

export async function renderSampleCertificatePdf(templatePdf: ArrayBuffer | Uint8Array) {
  return renderCertificatePdf(templatePdf, SAMPLE_VALUES);
}
