import React, { useEffect, useMemo, useRef } from "react";

/* -------------------------------------------------------------------------- */
/*                               Fish geometry                                */
/* -------------------------------------------------------------------------- */

const N = 18;
const SEG_LEN = 8.8;
const TAIL_START = 7; // The flowing tail begins around the middle of the body.

const TOP = [
  4.2, 6.8, 8.8, 10.3, 11.2, 11.4, 10.8, 10.2, 9.1,
  7.8, 6.5, 5.3, 4.3, 3.4, 2.7, 2.0, 1.4, 0.8,
];

const BOTTOM = [
  5.2, 9.2, 12.7, 15.8, 17.6, 17.4, 15.8, 13.6, 11.5,
  9.6, 8.0, 6.5, 5.1, 4.0, 3.0, 2.2, 1.5, 0.9,
];

const VB_W = 600;
const VB_H = 500;

const BOWL_PATH =
  "M 235 95 C 160 100 130 190 130 270 C 130 360 210 405 300 405 C 390 405 470 360 470 270 C 470 190 440 100 365 95 C 340 85 260 85 235 95 Z";

const WATERLINE_Y = 140;
const WATER_CX = 300;
const WATER_CY = 292;
const WATER_RX = 148;
const WATER_RY = 96;

type Point = { x: number; y: number };

type TailPoint = {
  u: number;
  v: number;
  phase: number;
};

/*
  Local tail outline.
  u = distance backwards from the body.
  v = distance above/below the body centre line.

  The little in-and-out changes create the soft petal-like betta tail edge.
*/
const TAIL_OUTLINE: TailPoint[] = [
  { u: 9, v: 17, phase: 0.0 },
  { u: 18, v: 29, phase: 0.5 },
  { u: 30, v: 40, phase: 1.0 },
  { u: 43, v: 51, phase: 1.5 },
  { u: 55, v: 44, phase: 2.0 },
  { u: 62, v: 52, phase: 2.5 },
  { u: 73, v: 42, phase: 3.0 },
  { u: 80, v: 30, phase: 3.5 },
  { u: 89, v: 35, phase: 4.0 },
  { u: 98, v: 23, phase: 4.5 },
  { u: 91, v: 12, phase: 5.0 },
  { u: 102, v: 7, phase: 5.5 },
  { u: 96, v: 1, phase: 6.0 },
  { u: 102, v: -7, phase: 6.5 },
  { u: 91, v: -13, phase: 7.0 },
  { u: 98, v: -25, phase: 7.5 },
  { u: 87, v: -35, phase: 8.0 },
  { u: 75, v: -30, phase: 8.5 },
  { u: 68, v: -43, phase: 9.0 },
  { u: 56, v: -51, phase: 9.5 },
  { u: 45, v: -43, phase: 10.0 },
  { u: 35, v: -54, phase: 10.5 },
  { u: 24, v: -44, phase: 11.0 },
  { u: 15, v: -30, phase: 11.5 },
  { u: 8, v: -18, phase: 12.0 },
];

function clampToWater(x: number, y: number): Point {
  const dx = (x - WATER_CX) / WATER_RX;
  const dy = (y - WATER_CY) / WATER_RY;
  const distance = Math.hypot(dx, dy);

  if (distance > 1) {
    return {
      x: WATER_CX + (dx / distance) * WATER_RX,
      y: WATER_CY + (dy / distance) * WATER_RY,
    };
  }

  return { x, y };
}

function smoothClosedPath(points: Point[]): string {
  if (points.length < 3) return "";

  const last = points[points.length - 1];
  const first = points[0];
  const startX = (last.x + first.x) / 2;
  const startY = (last.y + first.y) / 2;

  let d = `M ${startX.toFixed(2)} ${startY.toFixed(2)}`;

  for (let i = 0; i < points.length; i += 1) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    const midX = (current.x + next.x) / 2;
    const midY = (current.y + next.y) / 2;

    d += ` Q ${current.x.toFixed(2)} ${current.y.toFixed(2)} ${midX.toFixed(
      2,
    )} ${midY.toFixed(2)}`;
  }

  return `${d} Z`;
}

function localPoint(
  origin: Point,
  alongX: number,
  alongY: number,
  perpX: number,
  perpY: number,
  u: number,
  v: number,
): Point {
  return {
    x: origin.x + alongX * u + perpX * v,
    y: origin.y + alongY * u + perpY * v,
  };
}

export default function BettaFishAquarium() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // One silhouette path contains both the body and the complete caudal tail.
  const fishPathRef = useRef<SVGPathElement | null>(null);
  const fishSheenPathRef = useRef<SVGPathElement | null>(null);
  const tailRaysRef = useRef<SVGPathElement | null>(null);
  const bodyAccentRef = useRef<SVGPathElement | null>(null);

  const pectoralRef = useRef<SVGPathElement | null>(null);
  const eyeRef = useRef<SVGCircleElement | null>(null);
  const eyeGlowRef = useRef<SVGCircleElement | null>(null);
  const gillRef = useRef<SVGPathElement | null>(null);
  const shadowRef = useRef<SVGEllipseElement | null>(null);
  const fishGradientRef = useRef<SVGLinearGradientElement | null>(null);

  const pointsRef = useRef<Point[]>(
    Array.from({ length: N }, (_, index) => ({
      x: WATER_CX - index * SEG_LEN,
      y: WATER_CY,
    })),
  );

  const targetRef = useRef<Point>({ x: WATER_CX, y: WATER_CY });
  const hoverRef = useRef(false);
  const lastHeadRef = useRef<Point>({ x: WATER_CX, y: WATER_CY });
  const speedRef = useRef(0);
  const timeRef = useRef(0);

  const bubbles = useMemo(
    () =>
      Array.from({ length: 7 }, () => ({
        cx: WATER_CX - 100 + Math.random() * 200,
        r: 2 + Math.random() * 3.5,
        duration: 4 + Math.random() * 4,
        begin: Math.random() * 6,
      })),
    [],
  );

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;

    function toLocal(clientX: number, clientY: number): Point {
      const rect = svg.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * VB_W;
      const y = ((clientY - rect.top) / rect.height) * VB_H;
      return clampToWater(x, y);
    }

    function handleMove(event: MouseEvent | TouchEvent) {
      hoverRef.current = true;

      const pointer =
        "touches" in event && event.touches.length > 0
          ? event.touches[0]
          : (event as MouseEvent);

      targetRef.current = toLocal(pointer.clientX, pointer.clientY);
    }

    function handleLeave() {
      hoverRef.current = false;
    }

    svg.addEventListener("mousemove", handleMove);
    svg.addEventListener("mouseleave", handleLeave);
    svg.addEventListener("touchmove", handleMove, { passive: true });
    svg.addEventListener("touchend", handleLeave);

    let animationFrame = 0;
    let lastFrame = performance.now();

    function renderFish(points: Point[]) {
      const top: Point[] = [];
      const bottom: Point[] = [];

      for (let i = 0; i < N; i += 1) {
        const point = points[i];
        const previous = points[Math.max(0, i - 1)];
        const next = points[Math.min(N - 1, i + 1)];
        const direction = Math.atan2(next.y - previous.y, next.x - previous.x);
        const perpendicular = direction + Math.PI / 2;

        top.push({
          x: point.x + Math.cos(perpendicular) * TOP[i],
          y: point.y + Math.sin(perpendicular) * TOP[i],
        });

        bottom.push({
          x: point.x - Math.cos(perpendicular) * BOTTOM[i],
          y: point.y - Math.sin(perpendicular) * BOTTOM[i],
        });
      }

      const headDirection = Math.atan2(
        points[0].y - points[1].y,
        points[0].x - points[1].x,
      );

      const nose: Point = {
        x: points[0].x + Math.cos(headDirection) * 3.5,
        y: points[0].y + Math.sin(headDirection) * 3.5,
      };

      /* ----------------------- One-piece body + tail mesh ---------------------- */

      const tailAnchor = points[TAIL_START];
      const tailEnd = points[N - 1];
      const tailVectorX = tailEnd.x - tailAnchor.x;
      const tailVectorY = tailEnd.y - tailAnchor.y;
      const tailVectorLength = Math.max(1, Math.hypot(tailVectorX, tailVectorY));

      const alongX = tailVectorX / tailVectorLength;
      const alongY = tailVectorY / tailVectorLength;
      const perpX = -alongY;
      const perpY = alongX;

      const speed = Math.min(speedRef.current, 3.2);
      const fanBreathing = 1 + Math.sin(timeRef.current * 2.2) * 0.025;
      const speedStretch = 1 + speed * 0.025;

      const tailOuter = TAIL_OUTLINE.map((point, index) => {
        const normalizedLength = point.u / 102;
        const flutter =
          Math.sin(timeRef.current * 5.2 - point.phase) *
          (1.2 + normalizedLength * 4.2);
        const trailingPull =
          Math.cos(timeRef.current * 3.8 - index * 0.42) *
          normalizedLength *
          2.2;

        return localPoint(
          tailAnchor,
          alongX,
          alongY,
          perpX,
          perpY,
          point.u * speedStretch + trailingPull,
          point.v * fanBreathing + flutter,
        );
      });

      const silhouettePoints: Point[] = [
        nose,
        ...top.slice(0, TAIL_START + 1),
        ...tailOuter,
        ...bottom.slice(0, TAIL_START + 1).reverse(),
      ];

      const unifiedPath = smoothClosedPath(silhouettePoints);
      fishPathRef.current?.setAttribute("d", unifiedPath);
      fishSheenPathRef.current?.setAttribute("d", unifiedPath);

      /* ------------------------- Tail rays / flowing folds ---------------------- */

      const upperRayTargets = [2, 4, 6, 8, 10];
      const lowerRayTargets = [14, 16, 18, 20, 22];
      const rayTargets = [...upperRayTargets, ...lowerRayTargets];

      let rayPath = "";

      rayTargets.forEach((targetIndex, index) => {
        const target = tailOuter[targetIndex];
        const side = index < upperRayTargets.length ? 1 : -1;
        const sideIndex =
          index < upperRayTargets.length
            ? index
            : index - upperRayTargets.length;

        const start = localPoint(
          tailAnchor,
          alongX,
          alongY,
          perpX,
          perpY,
          2 + sideIndex * 1.7,
          side * (2.4 + sideIndex * 1.25),
        );

        const control = {
          x: start.x * 0.38 + target.x * 0.62 + perpX * side * 3,
          y: start.y * 0.38 + target.y * 0.62 + perpY * side * 3,
        };

        rayPath += `M ${start.x.toFixed(2)} ${start.y.toFixed(
          2,
        )} Q ${control.x.toFixed(2)} ${control.y.toFixed(2)} ${target.x.toFixed(
          2,
        )} ${target.y.toFixed(2)} `;
      });

      tailRaysRef.current?.setAttribute("d", rayPath);

      /* ------------------------------ Body sheen ------------------------------- */

      const accentStart = {
        x: top[1].x * 0.75 + points[1].x * 0.25,
        y: top[1].y * 0.75 + points[1].y * 0.25,
      };
      const accentMiddle = {
        x: top[4].x * 0.8 + points[4].x * 0.2,
        y: top[4].y * 0.8 + points[4].y * 0.2,
      };
      const accentEnd = {
        x: top[TAIL_START].x * 0.55 + tailOuter[3].x * 0.45,
        y: top[TAIL_START].y * 0.55 + tailOuter[3].y * 0.45,
      };

      bodyAccentRef.current?.setAttribute(
        "d",
        `M ${accentStart.x.toFixed(2)} ${accentStart.y.toFixed(2)} Q ${accentMiddle.x.toFixed(
          2,
        )} ${accentMiddle.y.toFixed(2)} ${accentEnd.x.toFixed(2)} ${accentEnd.y.toFixed(
          2,
        )}`,
      );

      /* ---------------------- Gradient follows fish direction ------------------ */

      const gradientEnd = localPoint(
        tailAnchor,
        alongX,
        alongY,
        perpX,
        perpY,
        100,
        0,
      );

      if (fishGradientRef.current) {
        fishGradientRef.current.setAttribute("x1", nose.x.toFixed(2));
        fishGradientRef.current.setAttribute("y1", nose.y.toFixed(2));
        fishGradientRef.current.setAttribute("x2", gradientEnd.x.toFixed(2));
        fishGradientRef.current.setAttribute("y2", gradientEnd.y.toFixed(2));
      }

      /* --------------------------- Pectoral side fin --------------------------- */

      const pectoralBase = {
        x: points[3].x * 0.58 + bottom[3].x * 0.42,
        y: points[3].y * 0.58 + bottom[3].y * 0.42,
      };
      const pectoralDirection = Math.atan2(
        points[4].y - points[2].y,
        points[4].x - points[2].x,
      );
      const flap = Math.sin(timeRef.current * 5.2) * 0.24;
      const pectoralAngle = pectoralDirection - Math.PI / 2 - 0.48 - flap;
      const pectoralLength = 19 + speed * 1.2;

      const pectoralOut = {
        x: pectoralBase.x + Math.cos(pectoralAngle) * pectoralLength,
        y: pectoralBase.y + Math.sin(pectoralAngle) * pectoralLength,
      };

      const pectoralTip = {
        x: pectoralBase.x + Math.cos(pectoralDirection) * 15,
        y: pectoralBase.y + Math.sin(pectoralDirection) * 15,
      };

      pectoralRef.current?.setAttribute(
        "d",
        `M ${pectoralBase.x.toFixed(2)} ${pectoralBase.y.toFixed(
          2,
        )} Q ${pectoralOut.x.toFixed(2)} ${pectoralOut.y.toFixed(
          2,
        )} ${pectoralTip.x.toFixed(2)} ${pectoralTip.y.toFixed(2)} Z`,
      );

      /* --------------------------------- Gill --------------------------------- */

      const headPerpendicular = headDirection + Math.PI / 2;
      const gillTop = {
        x: points[2].x + Math.cos(headPerpendicular) * TOP[2] * 0.82,
        y: points[2].y + Math.sin(headPerpendicular) * TOP[2] * 0.82,
      };
      const gillBottom = {
        x: points[2].x - Math.cos(headPerpendicular) * BOTTOM[2] * 0.8,
        y: points[2].y - Math.sin(headPerpendicular) * BOTTOM[2] * 0.8,
      };
      const gillControl = {
        x: points[2].x + Math.cos(headDirection) * 3,
        y: points[2].y + Math.sin(headDirection) * 3,
      };

      gillRef.current?.setAttribute(
        "d",
        `M ${gillTop.x.toFixed(2)} ${gillTop.y.toFixed(2)} Q ${gillControl.x.toFixed(
          2,
        )} ${gillControl.y.toFixed(2)} ${gillBottom.x.toFixed(2)} ${gillBottom.y.toFixed(
          2,
        )}`,
      );

      /* --------------------------------- Eye ---------------------------------- */

      const eyeBase = {
        x: points[0].x * 0.42 + points[1].x * 0.58,
        y: points[0].y * 0.42 + points[1].y * 0.58,
      };

      const eye = {
        x:
          eyeBase.x +
          Math.cos(headPerpendicular) * 3.4 +
          Math.cos(headDirection) * 1.2,
        y:
          eyeBase.y +
          Math.sin(headPerpendicular) * 3.4 +
          Math.sin(headDirection) * 1.2,
      };

      eyeRef.current?.setAttribute("cx", eye.x.toFixed(2));
      eyeRef.current?.setAttribute("cy", eye.y.toFixed(2));
      eyeGlowRef.current?.setAttribute(
        "cx",
        (eye.x - Math.cos(headDirection) * 0.8).toFixed(2),
      );
      eyeGlowRef.current?.setAttribute(
        "cy",
        (eye.y - Math.sin(headDirection) * 0.8).toFixed(2),
      );

      /* -------------------------------- Shadow -------------------------------- */

      if (shadowRef.current) {
        shadowRef.current.setAttribute("cx", points[5].x.toFixed(2));
        shadowRef.current.setAttribute(
          "cy",
          (WATER_CY + WATER_RY - 6).toFixed(2),
        );
        shadowRef.current.setAttribute(
          "rx",
          (44 + Math.min(speed, 3) * 2).toFixed(2),
        );
      }
    }

    function loop(now: number) {
      const delta = Math.min((now - lastFrame) / 16.67, 2.5);
      lastFrame = now;
      timeRef.current += delta * 0.016;

      if (!hoverRef.current) {
        const t = timeRef.current;
        targetRef.current = {
          x: WATER_CX + Math.cos(t * 0.35) * WATER_RX * 0.58,
          y: WATER_CY + Math.sin(t * 0.5) * WATER_RY * 0.58,
        };
      }

      const points = pointsRef.current;
      const head = points[0];
      const targetDx = targetRef.current.x - head.x;
      const targetDy = targetRef.current.y - head.y;
      const easing = 0.045 * delta;

      head.x += targetDx * easing;
      head.y += targetDy * easing;

      const clampedHead = clampToWater(head.x, head.y);
      head.x = clampedHead.x;
      head.y = clampedHead.y;

      const moved = Math.hypot(
        head.x - lastHeadRef.current.x,
        head.y - lastHeadRef.current.y,
      );

      speedRef.current += (moved - speedRef.current) * 0.1;
      lastHeadRef.current = { x: head.x, y: head.y };

      for (let i = 1; i < N; i += 1) {
        const previous = points[i - 1];
        const current = points[i];
        const dx = previous.x - current.x;
        const dy = previous.y - current.y;
        const angle = Math.atan2(dy, dx);

        current.x = previous.x - Math.cos(angle) * SEG_LEN;
        current.y = previous.y - Math.sin(angle) * SEG_LEN;
      }

      const speed = Math.max(speedRef.current, 0.35);
      const frequency = 0.12 + speed * 0.03;
      const animatedPoints = points.map((point) => ({ ...point }));

      for (let i = 1; i < N; i += 1) {
        const previous = animatedPoints[i - 1];
        const current = animatedPoints[i];
        const segmentAngle = Math.atan2(
          current.y - previous.y,
          current.x - previous.x,
        );
        const perpendicular = segmentAngle + Math.PI / 2;
        const normalized = i / (N - 1);
        const amplitude = Math.pow(normalized, 1.7) * (2.6 + speed * 2.05);
        const wave =
          Math.sin(timeRef.current * (4.2 + frequency * 19) - i * 0.82) *
          amplitude;

        current.x += Math.cos(perpendicular) * wave;
        current.y += Math.sin(perpendicular) * wave;
      }

      renderFish(animatedPoints);
      animationFrame = requestAnimationFrame(loop);
    }

    animationFrame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrame);
      svg.removeEventListener("mousemove", handleMove);
      svg.removeEventListener("mouseleave", handleLeave);
      svg.removeEventListener("touchmove", handleMove);
      svg.removeEventListener("touchend", handleLeave);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "40px 20px",
        background:
          "radial-gradient(circle at 30% 10%, #2a2f38 0%, #14171d 55%, #0a0b0e 100%)",
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <div
        style={{
          width: "min(92vw, 760px)",
          aspectRatio: `${VB_W} / ${VB_H}`,
          borderRadius: "16px",
          overflow: "hidden",
          position: "relative",
          boxShadow:
            "0 30px 70px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            touchAction: "none",
            cursor: "crosshair",
          }}
        >
          <defs>
            <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d8dee2" />
              <stop offset="70%" stopColor="#c3ccd2" />
              <stop offset="100%" stopColor="#aab4bb" />
            </linearGradient>

            <linearGradient id="tableGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8a5a38" />
              <stop offset="100%" stopColor="#5e3a22" />
            </linearGradient>

            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bfe8ec" stopOpacity="0.55" />
              <stop offset="30%" stopColor="#5fb2c4" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#1c5b6e" stopOpacity="0.85" />
            </linearGradient>

            {/* Dynamic user-space gradient: head, body and tail share one colour field. */}
            <linearGradient
              ref={fishGradientRef}
              id="bettaFishGradient"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#ffd9e2" />
              <stop offset="16%" stopColor="#ff8da4" />
              <stop offset="34%" stopColor="#f13858" />
              <stop offset="50%" stopColor="#dc082f" />
              <stop offset="64%" stopColor="#7a001b" />
              <stop offset="78%" stopColor="#c9082e" />
              <stop offset="91%" stopColor="#ff6987" />
              <stop offset="100%" stopColor="#ffc3d0" />
            </linearGradient>

            <linearGradient id="fishSheen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.26" />
              <stop offset="42%" stopColor="#ffffff" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#4b0010" stopOpacity="0.24" />
            </linearGradient>

            <linearGradient id="pectoralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffb5c5" stopOpacity="0.92" />
              <stop offset="50%" stopColor="#ef244b" stopOpacity="0.86" />
              <stop offset="100%" stopColor="#810019" stopOpacity="0.72" />
            </linearGradient>

            <linearGradient id="rayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5b0014" stopOpacity="0.82" />
              <stop offset="72%" stopColor="#7b001b" stopOpacity="0.48" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.14" />
            </linearGradient>

            <filter id="softBlur">
              <feGaussianBlur stdDeviation="4" />
            </filter>

            <filter id="fishSoftShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="2.4"
                floodColor="#33000b"
                floodOpacity="0.38"
              />
            </filter>

            <clipPath id="bowlClip">
              <path d={BOWL_PATH} />
            </clipPath>

            <clipPath id="waterClip">
              <rect x="0" y={WATERLINE_Y} width={VB_W} height={VB_H - WATERLINE_Y} />
            </clipPath>
          </defs>

          <rect x="0" y="0" width={VB_W} height="410" fill="url(#wallGrad)" />
          <rect x="0" y="405" width={VB_W} height={VB_H - 405} fill="url(#tableGrad)" />
          <rect x="0" y="405" width={VB_W} height="6" fill="rgba(0,0,0,0.18)" />

          <ellipse
            cx="300"
            cy="414"
            rx="150"
            ry="14"
            fill="rgba(0,0,0,0.32)"
            filter="url(#softBlur)"
          />

          <g clipPath="url(#bowlClip)">
            <g clipPath="url(#waterClip)">
              <rect x="0" y="0" width={VB_W} height={VB_H} fill="url(#waterGrad)" />

              <ellipse cx="300" cy="400" rx="175" ry="24" fill="#4a3a28" opacity="0.6" />

              {bubbles.map((bubble, index) => (
                <circle
                  key={index}
                  cx={bubble.cx}
                  r={bubble.r}
                  fill="rgba(255,255,255,0.55)"
                >
                  <animate
                    attributeName="cy"
                    values={`398;${WATERLINE_Y + 5}`}
                    dur={`${bubble.duration}s`}
                    begin={`${bubble.begin}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.7;0"
                    dur={`${bubble.duration}s`}
                    begin={`${bubble.begin}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}

              <ellipse
                ref={shadowRef}
                rx="44"
                ry="10"
                fill="rgba(0,0,0,0.25)"
                filter="url(#softBlur)"
              />

              {/* This is the only filled body/tail silhouette. */}
              <path
                ref={fishPathRef}
                fill="url(#bettaFishGradient)"
                stroke="#4d0011"
                strokeWidth="0.95"
                strokeLinejoin="round"
                filter="url(#fishSoftShadow)"
              />

              {/* Same exact silhouette, only a transparent light layer. */}
              <path
                ref={fishSheenPathRef}
                fill="url(#fishSheen)"
                pointerEvents="none"
              />

              <path
                ref={tailRaysRef}
                fill="none"
                stroke="url(#rayGradient)"
                strokeWidth="1.25"
                strokeLinecap="round"
                opacity="0.88"
                pointerEvents="none"
              />

              <path
                ref={bodyAccentRef}
                fill="none"
                stroke="rgba(255,255,255,0.34)"
                strokeWidth="2.4"
                strokeLinecap="round"
                opacity="0.8"
                pointerEvents="none"
              />

              <path
                ref={pectoralRef}
                fill="url(#pectoralGradient)"
                stroke="rgba(75,0,16,0.55)"
                strokeWidth="0.7"
              />

              <path
                ref={gillRef}
                stroke="rgba(74,0,17,0.56)"
                strokeWidth="1.15"
                fill="none"
                strokeLinecap="round"
              />

              <circle
                ref={eyeRef}
                r="3.15"
                fill="#160006"
                stroke="#fff4f7"
                strokeWidth="0.75"
              />
              <circle ref={eyeGlowRef} r="0.9" fill="#ffffff" />
            </g>
          </g>

          <path
            d={BOWL_PATH}
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="2.5"
          />
          <path
            d={BOWL_PATH}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="9"
          />

          <path
            d="M 165 150 C 155 210 158 280 190 340"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
          />

          <path
            d="M 415 140 C 430 190 428 250 405 300"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />

          <ellipse
            cx="300"
            cy="97"
            rx="65"
            ry="13"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2.5"
          />

          <ellipse
            cx="300"
            cy={WATERLINE_Y}
            rx="147"
            ry="14"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
          />
        </svg>
      </div>

      <p
        style={{
          color: "rgba(220,224,228,0.5)",
          fontSize: "14px",
          letterSpacing: "0.03em",
          fontStyle: "italic",
          margin: 0,
          textAlign: "center",
        }}
      >
        Move your cursor near the bowl — the betta follows with a soft flowing tail.
      </p>
    </div>
  );
}
