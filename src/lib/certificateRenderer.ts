import type { CanvasRenderingContext2D, Image } from "canvas";
import QRCode from "qrcode";
import { loadImage } from "canvas";
import { certificateLayout, CertificateLayout, LayoutField } from "@/lib/certificateLayout";

export type CertificateValues = Record<string, string>;

type RenderMode = "values" | "calibration";

const FIELD_KEYS: Array<keyof Omit<CertificateLayout, "qr">> = [
  "studentName",
  "level",
  "language",
  "leftGrade",
  "monthYear",
  "firstName",
  "surname",
  "dob",
  "birthPlace",
  "examDate",
  "examPlace",
  "reading",
  "listening",
  "writing",
  "oral",
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
  monthYear: (values) => values.monthYear || formatMonthYear(values.dateOfExam) || formatMonthYear(values.issueDate),
  firstName: "firstName",
  surname: "surname",
  dob: "dateOfBirth",
  birthPlace: "placeOfBirth",
  examDate: "dateOfExam",
  examPlace: "placeOfExam",
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

function fontFor(field: LayoutField) {
  const family = field.family === "serif" ? 'Georgia, "Times New Roman", serif' : "Arial, sans-serif";
  const style = field.style ? `${field.style} ` : "";
  const weight = field.weight ? `${field.weight} ` : "";
  return `${style}${weight}${field.fontSize}px ${family}`;
}

function shrinkToFit(ctx: CanvasRenderingContext2D, value: string, field: LayoutField) {
  if (!field.maxWidth) return;

  let size = field.fontSize;
  while (size > 8) {
    ctx.font = fontFor({ ...field, fontSize: size });
    if (ctx.measureText(value).width <= field.maxWidth) break;
    size -= 1;
  }
}

function drawValue(ctx: CanvasRenderingContext2D, field: LayoutField, value: string) {
  if (!value) return;

  ctx.save();
  ctx.fillStyle = field.color ?? "#111111";
  ctx.textAlign = field.align ?? "left";
  ctx.textBaseline = field.baseline ?? "alphabetic";
  ctx.font = fontFor(field);
  shrinkToFit(ctx, value, field);
  ctx.fillText(value, field.x, field.y);
  ctx.restore();
}

function drawCalibrationMark(ctx: CanvasRenderingContext2D, name: string, x: number, y: number) {
  ctx.save();
  ctx.fillStyle = "#dc2626";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.font = "700 14px Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#ffffff";
  ctx.strokeText(name, x + 9, y);
  ctx.fillText(name, x + 9, y);
  ctx.restore();
}

export async function drawCertificate({
  ctx,
  template,
  values,
  verifyUrl,
  mode = "values",
}: {
  ctx: CanvasRenderingContext2D;
  template: Image;
  values: CertificateValues;
  verifyUrl: string;
  mode?: RenderMode;
}) {
  ctx.clearRect(0, 0, template.width, template.height);
  ctx.drawImage(template, 0, 0, template.width, template.height);

  if (mode === "calibration") {
    for (const key of FIELD_KEYS) {
      const field = certificateLayout[key];
      drawCalibrationMark(ctx, key, field.x, field.y);
    }
    drawCalibrationMark(ctx, "qr", certificateLayout.qr.x, certificateLayout.qr.y);
    ctx.save();
    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      certificateLayout.qr.x,
      certificateLayout.qr.y,
      certificateLayout.qr.size,
      certificateLayout.qr.size
    );
    ctx.restore();
    return;
  }

  for (const key of FIELD_KEYS) {
    drawValue(ctx, certificateLayout[key], resolveValue(values, key));
  }

  const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
    width: certificateLayout.qr.size * 2,
    margin: 1,
    color: { dark: "#111111", light: "#ffffff" },
  });
  const qrImg = await loadImage(qrDataUrl);
  ctx.drawImage(
    qrImg,
    certificateLayout.qr.x,
    certificateLayout.qr.y,
    certificateLayout.qr.size,
    certificateLayout.qr.size
  );
}
