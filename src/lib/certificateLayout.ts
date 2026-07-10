/**
 * Certificate layout.
 *
 * Coordinates are absolute pixels on public/ourcert/fla-certificate.pdf.
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
    "y": 361,
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
    "y": 399,
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
    "y": 437,
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
    "y": 437,
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
    "y": 475,
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
    "x": 410,
    "y": 610
  },
  "oral": {
    "fontSize": 17,
    "align": "left",
    "color": "#14264b",
    "family": "sans",
    "weight": "700",
    "maxWidth": 120,
    "x": 410,
    "y": 647
  },
  "reading": {
    "fontSize": 17,
    "align": "left",
    "color": "#14264b",
    "family": "sans",
    "weight": "700",
    "maxWidth": 120,
    "x": 410,
    "y": 685
  },
  "writing": {
    "fontSize": 17,
    "align": "left",
    "color": "#14264b",
    "family": "sans",
    "weight": "700",
    "maxWidth": 120,
    "x": 410,
    "y": 721
  },
  "total": {
    "fontSize": 17,
    "align": "left",
    "color": "#14264b",
    "family": "sans",
    "weight": "700",
    "maxWidth": 120,
    "x": 410,
    "y": 759
  },
  "resultGrade": {
    "fontSize": 17,
    "align": "left",
    "color": "#14264b",
    "family": "sans",
    "weight": "700",
    "maxWidth": 150,
    "x": 410,
    "y": 795,
    "minFontSize": 9
  },
  "issuePlace": {
    "fontSize": 17,
    "align": "center",
    "family": "serif",
    "style": "italic",
    "weight": "500",
    "color": "#050505",
    "x": 179,
    "y": 888,
    "maxWidth": 78,
    "minFontSize": 7
  },
  "issueDate": {
    "fontSize": 17,
    "align": "center",
    "family": "serif",
    "style": "italic",
    "weight": "500",
    "color": "#050505",
    "x": 655,
    "y": 888,
    "maxWidth": 78,
    "minFontSize": 7
  },
  "certificateNumber": {
    "x": 767,
    "y": 1100,
    "fontSize": 9,
    "align": "right",
    "color": "#000000",
    "family": "sans",
    "weight": "700",
    "maxWidth": 140
  },
  "qr": {
    "x": 709,
    "y": 1034,
    "size": 56
  }
};
