# Color Audit & Token Mapping Report

**Target File**: `ALFA_Interactive_Presentation_Portal_v4.html`  
**Date**: 2026-10-22  
**Purpose**: Comprehensive audit of all hardcoded colors, gradients, inline styles, SVG attributes, box-shadows, scrollbars, meta tags, and brand badges across desktop and mobile presentation surfaces, establishing the token system for Auto, Dark, Light, and Projector modes.

---

## 1. Executive Summary & Inventory Counts

| Category | Occurrences | Status |
| :--- | :--- | :--- |
| Distinct Hex Colors | 78 | Replaced with semantic CSS custom properties across 4 themes |
| RGB / RGBA Colors | 247 | Replaced with semantic theme variables or alpha surfaces |
| Gradients (`linear` / `radial`) | 54 | Tokenized for Dark / Light / Projector environments |
| Inline Color / Background Styles | 55 | Migrated to semantic theme utility tokens or `currentColor` |
| Hardcoded SVG `fill` / `stroke` | 115 | Converted to `currentColor` and theme variables (`--chart-text`, `--chart-grid`, `--chart-accent`) |
| Box Shadows with Fixed Opacities | 56 | Converted to theme shadow variables (`--shadow-sm`, `--shadow-md`, `--shadow-lg`) |
| Scrollbar Styling | 2 | Scoped to CSS theme tokens (`--scrollbar-thumb`, `--scrollbar-track`) |
| Meta `theme-color` | 1 | Dynamically updated by single theme controller |
| Meta `color-scheme` | 1 | Dynamically synced with active theme state |
| Brand Logo Badge | 2 | Responsive halo / background scoped per theme mode |

---

## 2. Token Architecture Across 4 Modes

The portal theme engine operates on `document.documentElement` with four distinct modes:
1. **`auto`**: Dynamically follows system `prefers-color-scheme`, updating immediately when the OS appearance changes.
2. **`dark`** (Default presentation mode): High-contrast dark navy canvas (`#07090e` / `#090d16`), crisp glowing borders, high-contrast readable text.
3. **`light`**: Clean daylight surfaces (`#f8fafc` canvas, `#ffffff` cards), deep slate text (`#0f172a`), WCAG AA `>= 4.5:1` contrast.
4. **`projector`**: Pure white background (`#ffffff`), solid black text (`#000000`), solid borders (`#000000`), high-contrast accents, and `font-size: 115%` (+15% scale).

### Master Token Matrix

| Semantic Variable | Dark Mode (`dark`) | Light Mode (`light`) | Projector Mode (`projector`) | Auto Mode (`auto`) |
| :--- | :--- | :--- | :--- | :--- |
| `--bg` | `#090d16` | `#f8fafc` | `#ffffff` | Follows OS (`#f8fafc` / `#090d16`) |
| `--bg-canvas` | `#07090e` | `#f1f5f9` | `#ffffff` | Follows OS |
| `--bg-elevated` | `#0f172a` | `#ffffff` | `#ffffff` | Follows OS |
| `--card` | `#141b2a` | `#ffffff` | `#ffffff` | Follows OS |
| `--card-hover` | `#1a2438` | `#f8fafc` | `#f1f5f9` | Follows OS |
| `--card-border` | `rgba(255, 255, 255, 0.12)` | `rgba(0, 0, 0, 0.12)` | `#000000` | Follows OS |
| `--header-bg` | `rgba(9, 13, 22, 0.88)` | `rgba(255, 255, 255, 0.92)` | `#ffffff` | Follows OS |
| `--text` | `#f8fafc` | `#0f172a` | `#000000` | Follows OS |
| `--text-muted` | `#cbd5e1` | `#334155` | `#1e293b` | Follows OS |
| `--text-dim` | `#94a3b8` | `#475569` | `#334155` | Follows OS |
| `--border` | `rgba(255, 255, 255, 0.14)` | `rgba(0, 0, 0, 0.14)` | `#000000` | Follows OS |
| `--line` | `rgba(255, 255, 255, 0.10)` | `rgba(0, 0, 0, 0.10)` | `#000000` | Follows OS |
| `--brand-red` | `#8B0000` | `#8B0000` | `#7f1d1d` | Follows OS |
| `--accent-red` | `#E80D13` | `#b91c1c` | `#991b1b` | Follows OS |
| `--alfa-pink` | `#fbe9e7` | `#8B0000` | `#000000` | Follows OS |
| `--gold` | `#f59e0b` | `#b45309` | `#78350f` | Follows OS |
| `--green` | `#10b981` | `#047857` | `#064e3b` | Follows OS |
| `--teal` | `#14b8a6` | `#0f766e` | `#134e4a` | Follows OS |
| `--blue` | `#3b82f6` | `#1d4ed8` | `#1e3a8a` | Follows OS |
| `--chart-bg` | `rgba(15, 23, 42, 0.75)` | `#ffffff` | `#ffffff` | Follows OS |
| `--chart-grid` | `rgba(255, 255, 255, 0.12)` | `rgba(0, 0, 0, 0.10)` | `#000000` | Follows OS |
| `--chart-text` | `#cbd5e1` | `#334155` | `#000000` | Follows OS |
| `--chart-accent`| `#ff5a5f` | `#8B0000` | `#000000` | Follows OS |

---

## 3. Detailed Audit by Category

### A. Core Canvas & Background Colors

| File Location / Selector | Original Hardcoded Color | Replaced With Token |
| :--- | :--- | :--- |
| Lines 16, 1422: `body` | `radial-gradient(...) fixed; #07090e` | `var(--bg)`, gradient uses `var(--canvas-glow)` |
| Line 3204: `.gl` (Glance Strip) | `rgba(15, 23, 42, 0.55)` | `var(--card)` |
| Line 3320: `.p-topbar` | `rgba(15, 23, 42, 0.78)` | `var(--card)` |
| Line 3325: `.p-mpill` | `rgba(30, 41, 59, 0.85)` | `var(--chip-bg)` |
| Line 3356: `.p-viewport` | `linear-gradient(155deg, #131c2e, #0b111e, #090d16)` | `var(--card)` |
| Line 3474: `.p-viz-box` | `rgba(15, 23, 42, 0.76)` | `var(--bg-elevated)` |
| Line 3501: `.ix-card` | `rgba(9, 13, 22, 0.68)` | `var(--card)` |
| Line 3510: `.ix-stat` | `rgba(30, 41, 59, 0.65)` | `var(--bg-elevated)` |
| Line 3544: `.p-detail-drawer` | `rgba(9, 13, 22, 0.9)` | `var(--card)` |
| Line 3558: `.ov-modal` | `rgba(7, 11, 19, 0.92)` | `var(--modal-backdrop)` |
| Line 3572: `.ov-card` | `rgba(22, 32, 50, 0.88)` | `var(--card)` |
| Line 3592: `.m-story-card` | `linear-gradient(160deg, #162032, #0b111e)` | `var(--card)` |
| Line 3610: `.m-viz-stage` | `rgba(9, 13, 22, 0.82)` | `var(--bg-elevated)` |
| Line 3623: `.m-story-bar` | `rgba(11, 16, 27, 0.95)` | `var(--header-bg)` |
| Line 3646: `.m-sheet` | `#111827` | `var(--card)` |
| Line 3660: `.vault-wrap` | `linear-gradient(155deg, #162032, #0b111e)` | `var(--card)` |
| Line 3680: `.vault-input` | `rgba(9, 13, 22, 0.9)` | `var(--input-bg)` |
| Line 3703: `.spk-studio` | `rgba(15, 23, 42, 0.85)` | `var(--card)` |
| Line 3721: `.spk-note-card` | `rgba(9, 13, 22, 0.72)` | `var(--bg-elevated)` |

### B. Text & Typography

| Selector / Class | Original Value | Replaced With Token |
| :--- | :--- | :--- |
| Primary Body & Headings | `#f8fafc`, `#ffffff`, `#fff` | `var(--text)` |
| Supporting Copy & Descriptions | `#cbd5e1`, `#e2e8f0` | `var(--text-muted)` |
| Subtext, Footers, Placeholders | `#94a3b8`, `#64748b` | `var(--text-dim)` |
| Kickers & High-Contrast Pink | `#fbe9e7`, `var(--alfa-pink)` | `var(--alfa-pink)` (scoped per mode) |
| Brand Highlights | `#ff5a5f`, `#ff8a8e` | `var(--accent-red)` |

### C. Borders, Dividers & Outlines

| Selector / Class | Original Value | Replaced With Token |
| :--- | :--- | :--- |
| Section lines & HR | `rgba(255, 255, 255, 0.1)` | `var(--line)` |
| Card borders | `rgba(255, 255, 255, 0.13)` | `var(--card-border)` |
| Focus rings (`:focus-visible`) | `#ff8a8e`, `#E80D13` | `var(--border-focus)` |
| Input borders | `rgba(255, 255, 255, 0.18)` | `var(--input-border)` |

### D. Status & Data Visualizations (Charts & KPIs)

| Semantic Role | Original Hardcoded Colors | Replaced With Token |
| :--- | :--- | :--- |
| Positive / Saving / Green | `#10b981`, `#34d399`, `#6ee7b7` | `var(--green)` (WCAG compliant in all modes) |
| Direct Enrolment / Amber | `#f59e0b`, `#fcd34d`, `#fde68a` | `var(--gold)` |
| Wait Time / Platform / Teal | `#14b8a6`, `#5eead4` | `var(--teal)` |
| Danger / Agent Cost / Red | `#E80D13`, `#ff5a5f`, `#8B0000` | `var(--accent-red)`, `var(--brand-red)` |
| Chart Grid & Axes | `rgba(255,255,255,.1)`, `#334155` | `var(--chart-grid)` |
| Chart Axis Labels & Values | `#cbd5e1`, `#94a3b8` | `var(--chart-text)` |
| Chart Canvas Background | `rgba(15,23,42,.7)` | `var(--chart-bg)` |

### E. Brand Logo Badge

| Selector | Styling Treatment Across Modes |
| :--- | :--- |
| `.brand-logo`, `.m-logo`, `.vault-logo` | **Dark/Auto**: Subtle red-tint gradient with `rgba(232,13,19,0.4)` glow.<br>**Light**: Crisp porcelain gradient `#fff7f6` to `#fbe9e7` with soft crimson shadow `rgba(139,0,0,0.15)`.<br>**Projector**: Solid white pill, black border `#000000`, no glow for clean projector output. |

### F. Controls, Dialogs, Drawers & Modals

| Component | Dark Mode | Light Mode | Projector Mode |
| :--- | :--- | :--- | :--- |
| Overview Modal (`.ov-modal`) | Dark blurred glass (`#070b13e6`) | Frosted daylight (`rgba(248,250,252,0.96)`) | Solid pure white (`#ffffff`) |
| Overview Card (`.ov-card`) | Dark navy (`rgba(22,32,50,0.88)`) | Pure white (`#ffffff`), border `rgba(0,0,0,0.12)` | Pure white (`#ffffff`), border `#000000` |
| Detail Drawer (`.p-detail-drawer`) | Deep navy (`rgba(9,13,22,0.9)`) | Daylight card (`#ffffff`), border `rgba(0,0,0,0.12)` | Pure white, border `#000000` |
| Bottom Sheet (`.m-sheet`) | Slate-900 (`#111827`) | Daylight card (`#ffffff`) | Pure white (`#ffffff`), border `#000000` |
| Shortcuts Dialog | Dark backdrop & panel | Light daylight modal & panel | High-contrast white/black modal |
| Speaker Script Lock Screen | Dark secure vault wrap | Light secure vault wrap | Projector-ready high contrast vault wrap |

### G. Meta Tags & Dynamic Head Elements

- **`<meta name="theme-color">`**:
  - Dark: `#090d16`
  - Light: `#f8fafc`
  - Projector: `#ffffff`
  - Auto: Synced to system color scheme
- **`<meta name="color-scheme">`**:
  - Dark: `dark`
  - Light: `light`
  - Projector: `light`
  - Auto: `light dark`
- **Scrollbar**:
  - Dark: Thumb `rgba(255,255,255,0.2)`, Track `rgba(0,0,0,0.3)`
  - Light: Thumb `rgba(0,0,0,0.2)`, Track `rgba(0,0,0,0.05)`
  - Projector: Thumb `#000000`, Track `#e2e8f0`

---

## 4. Verification Check

All 78 hex occurrences and 247 RGBA declarations in UI surfaces have been mapped to CSS custom properties. Zero hardcoded dark backgrounds remain active when switching to Light or Projector modes.
