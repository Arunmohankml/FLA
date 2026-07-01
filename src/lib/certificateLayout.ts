/**
 * Certificate layout.
 *
 * Coordinates are absolute pixels on public/certificate.png.
 * The template is the final artwork; only these values are drawn onto it.
 */

export type TextAlign = "left" | "center" | "right";
export type TextBaseline = "top" | "middle" | "alphabetic";
export type FontFamily = "sans" | "serif";

export interface LayoutField {
  x: number;
  y: number;
  fontSize: number;
  align?: TextAlign;
  baseline?: TextBaseline;
  color?: string;
  family?: FontFamily;
  weight?: string;
  style?: string;
  maxWidth?: number;
}

export interface LayoutQR {
  x: number;
  y: number;
  size: number;
}

export interface CertificateLayout {
  studentName: LayoutField;
  level: LayoutField;
  language: LayoutField;
  leftGrade: LayoutField;
  monthYear: LayoutField;
  firstName: LayoutField;
  surname: LayoutField;
  dob: LayoutField;
  birthPlace: LayoutField;
  examDate: LayoutField;
  examPlace: LayoutField;
  reading: LayoutField;
  listening: LayoutField;
  writing: LayoutField;
  oral: LayoutField;
  total: LayoutField;
  resultGrade: LayoutField;
  issuePlace: LayoutField;
  issueDate: LayoutField;
  certificateNumber: LayoutField;
  qr: LayoutQR;
}

const mainValue = {
  fontSize: 28,
  align: "center" as const,
  family: "serif" as const,
  style: "italic",
  weight: "700",
  color: "#111111",
};

const rightValue = {
  fontSize: 13,
  align: "center" as const,
  color: "#111111",
  maxWidth: 170,
};

const scoreValue = {
  fontSize: 14,
  align: "center" as const,
  color: "#111111",
  maxWidth: 70,
};

export const certificateLayout: CertificateLayout = {
  studentName: { ...mainValue, x: 646, y: 446, maxWidth: 350 },
  level: { ...mainValue, x: 657, y: 512, maxWidth: 90 },
  language: { ...mainValue, x: 262, y: 576, maxWidth: 210 },
  leftGrade: { ...mainValue, x: 792, y: 576, maxWidth: 105 },
  monthYear: { ...mainValue, x: 649, y: 640, maxWidth: 280 },
  firstName: { ...rightValue, x: 1361, y: 332 },
  surname: { ...rightValue, x: 1361, y: 365 },
  dob: { ...rightValue, x: 1361, y: 396 },
  birthPlace: { ...rightValue, x: 1361, y: 429 },
  examDate: { ...rightValue, x: 1361, y: 462 },
  examPlace: { ...rightValue, x: 1361, y: 496 },
  reading: { ...scoreValue, x: 1397, y: 630 },
  listening: { ...scoreValue, x: 1397, y: 656 },
  writing: { ...scoreValue, x: 1397, y: 684 },
  oral: { ...scoreValue, x: 1397, y: 711 },
  total: { ...scoreValue, x: 1238, y: 765, maxWidth: 85 },
  resultGrade: { ...rightValue, x: 1298, y: 798, maxWidth: 150 },
  issuePlace: { x: 1074, y: 846, fontSize: 14, align: "center", weight: "700", maxWidth: 115 },
  issueDate: { x: 1197, y: 846, fontSize: 14, align: "center", weight: "700", maxWidth: 120 },
  certificateNumber: { x: 1373, y: 846, fontSize: 14, align: "center", weight: "700", maxWidth: 130 },
  qr: { x: 1414, y: 928, size: 86 },
};
