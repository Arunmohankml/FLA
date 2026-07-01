<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:global-skills -->
# Global Skills (always active)

Reference these skill files automatically for all UI, code, and architecture work.

## Workspace Skills (`.opencode/skills/`)

### frontend-design (`.opencode/skills/frontend-design/SKILL.md`)
Use for all UI design: distinctive visual identity, deliberate typography, opinionated palette choices, structured information. Always design with the subject's world in mind.

### ui-ux-pro-max (`.opencode/skills/ui-ux-pro-max/SKILL.md`)
Use for all UI structure and UX decisions. Key rules:
- **Accessibility (CRITICAL)**: 4.5:1 contrast, visible focus, aria-labels, keyboard nav, reduced-motion
- **Touch & Interaction (CRITICAL)**: 44x44px min touch targets, 8px spacing, loading feedback, cursor-pointer
- **Style**: SVG icons (no emoji), consistent effects, match product type
- **Layout**: mobile-first, min 16px body, no horizontal scroll, 4/8pt spacing
- **Animation**: 150-300ms, transform/opacity only, stagger 30-50ms, easing
- **Forms**: visible labels, error near field, submit feedback, input types

## Codex Workspace Skills (`.codex/skills/`)

### ui-ux-pro-max (`.codex/skills/ui-ux-pro-max/SKILL.md`)
Use before all UI/UX work in this project. Start with the design-system search when creating or redesigning a page/section, then apply the relevant UX/accessibility/responsive checks before editing and during verification.

### ui-styling (`.codex/skills/ui-styling/SKILL.md`)
Use for Tailwind, responsive layout, shadcn-style component structure, interaction states, and styling consistency.

### design-system (`.codex/skills/design-system/SKILL.md`)
Use when defining or changing tokens, component variants, spacing systems, typography scales, or reusable visual rules.

Do not blindly load unrelated skills for every task. For UI tasks, always use the relevant local `.codex/skills` UI/design skills first, then implement and verify visually on desktop and mobile.

## Global Skills (`~/.agents/skills/`)

### diagnosing-bugs (`~/.agents/skills/diagnosing-bugs/SKILL.md`)
For hard bugs and regressions: 6-phase workflow — build feedback loop → reproduce → hypothesise (3-5 ranked) → instrument → fix + regression test → cleanup.

### bug-hunter (`~/.agents/skills/bug-hunter/SKILL.md`)
For general debugging: reproduce → gather evidence → hypothesise → test → root cause → fix → prevent regression.

### api-endpoint-builder (`~/.agents/skills/api-endpoint-builder/SKILL.md`)
For all API routes: validation, proper HTTP status codes, auth checks, security checklist, consistent response format.

### improve-codebase-architecture (`~/.agents/skills/improve-codebase-architecture/SKILL.md`)
For architecture reviews: scan for shallow modules, present candidates as HTML report with before/after diagrams, deepen iteratively.

### tdd (`~/.agents/skills/tdd/`)
For test-driven development: write failing test first, then implementation, then refactor.

### performance-optimizer (`~/.agents/skills/performance-optimizer/SKILL.md`)
For perf issues: measure first, optimize second, verify third.

### rayden-code (`~/.agents/skills/rayden-code/SKILL.md`)
Use only if `@raydenui/ui` is installed in the project. Generates React + Tailwind code with Rayden UI components.
<!-- END:global-skills -->
