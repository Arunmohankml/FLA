/**
 * Certificate layout.
 *
 * Coordinates are absolute pixels on public/ourcert/Peter changes.pdf (A4).pdf.
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
  minFontSize?: number;
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

export const certificateLayout: CertificateLayout = {
  "studentName": {
    "fontSize": 27,
    "align": "center",
    "family": "serif",
    "style": "italic",
    "weight": "500",
    "color": "#050505",
    "x": 397,
    "y": 354,
    "maxWidth": 325,
    "minFontSize": 7
  },
  "level": {
    "fontSize": 27,
    "align": "center",
    "family": "serif",
    "style": "italic",
    "weight": "500",
    "color": "#050505",
    "x": 545,
    "y": 388,
    "maxWidth": 54,
    "minFontSize": 8
  },
  "language": {
    "fontSize": 27,
    "align": "center",
    "family": "serif",
    "style": "italic",
    "weight": "500",
    "color": "#009ab8",
    "x": 176,
    "y": 426,
    "maxWidth": 154,
    "minFontSize": 7
  },
  "leftGrade": {
    "fontSize": 26,
    "align": "center",
    "family": "serif",
    "style": "italic",
    "weight": "500",
    "color": "#050505",
    "x": 666,
    "y": 426,
    "maxWidth": 72,
    "minFontSize": 7
  },
  "monthYear": {
    "fontSize": 26,
    "align": "center",
    "family": "serif",
    "style": "italic",
    "weight": "500",
    "color": "#050505",
    "x": 536,
    "y": 464,
    "maxWidth": 165,
    "minFontSize": 7
  },
  "listening": {
    "fontSize": 17,
    "align": "left",
    "color": "#14264b",
    "family": "sans",
    "weight": "700",
    "maxWidth": 120,
    "x": 260,
    "y": 626
  },
  "oral": {
    "fontSize": 17,
    "align": "left",
    "color": "#14264b",
    "family": "sans",
    "weight": "700",
    "maxWidth": 120,
    "x": 260,
    "y": 655
  },
  "reading": {
    "fontSize": 17,
    "align": "left",
    "color": "#14264b",
    "family": "sans",
    "weight": "700",
    "maxWidth": 120,
    "x": 260,
    "y": 685
  },
  "writing": {
    "fontSize": 17,
    "align": "left",
    "color": "#14264b",
    "family": "sans",
    "weight": "700",
    "maxWidth": 120,
    "x": 260,
    "y": 714
  },
  "total": {
    "fontSize": 17,
    "align": "left",
    "color": "#14264b",
    "family": "sans",
    "weight": "700",
    "maxWidth": 120,
    "x": 260,
    "y": 742
  },
  "resultGrade": {
    "fontSize": 17,
    "align": "left",
    "color": "#14264b",
    "family": "sans",
    "weight": "700",
    "maxWidth": 150,
    "x": 260,
    "y": 771,
    "minFontSize": 9
  },
  "issuePlace": {
    "fontSize": 23,
    "align": "center",
    "family": "serif",
    "style": "italic",
    "weight": "500",
    "color": "#050505",
    "x": 181,
    "y": 893,
    "maxWidth": 110,
    "minFontSize": 7
  },
  "issueDate": {
    "fontSize": 19,
    "align": "center",
    "family": "serif",
    "style": "italic",
    "weight": "500",
    "color": "#050505",
    "x": 649,
    "y": 893,
    "maxWidth": 95,
    "minFontSize": 7
  },
  "certificateNumber": {
    "x": 707,
    "y": 1073,
    "fontSize": 9,
    "align": "right",
    "color": "#ffffff",
    "family": "sans",
    "weight": "700",
    "maxWidth": 140
  },
  "qr": {
    "x": 389,
    "y": 954,
    "size": 0
  }
};
