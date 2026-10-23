# Color Contrast Audit Report (WCAG 2.1 Level AA)

Generated on: 2026-10-22T08:31:25.790Z  
Target: `ALFA_Interactive_Presentation_Portal_v4.html`  
Standard: WCAG 2.1 Level AA (4.5:1 for normal body text, 3.0:1 for large text and graphical/UI components).

## Executive Summary
This document provides exact, mathematically computed color contrast ratios for every text and background color pair defined in the CSS custom properties of the ALFA Presentation Portal across **Dark**, **Light**, and **Projector** modes (and their respective Auto mode resolutions).

All tested color variable combinations across all modes achieve **100% compliance** with WCAG 2.1 Level AA requirements. In automated testing via pinned local axe-core across 165 total screen/theme combinations (Home, all 17 slides, ROI Simulator, OneHub 4 tabs, Theory & Q&A, Speaker Script lock screen, Overview modal, Shortcuts modal at 1440x900 and 390x844 viewports), **0 automated violations were found**.

---

## Dark Mode (Default Executive Presentation)

Canvas Background: `#07090e` | Card Surface: `#141b2a`

| Variable / Element Pair | Hex Values (FG / BG) | Contrast Ratio | WCAG AA Req | Result |
| :--- | :--- | :--- | :--- | :--- |
| `--text / --bg`<br>_Primary Text on Main Canvas_ | `#f8fafc` / `#07090e` | **19.03:1** | 4.5:1 | **PASS** |
| `--text / --card`<br>_Primary Text on Card Surface_ | `#f8fafc` / `#141b2a` | **16.45:1** | 4.5:1 | **PASS** |
| `--text-muted / --bg`<br>_Muted Supporting Copy on Canvas_ | `#cbd5e1` / `#07090e` | **13.41:1** | 4.5:1 | **PASS** |
| `--text-muted / --card`<br>_Muted Supporting Copy on Card_ | `#cbd5e1` / `#141b2a` | **11.59:1** | 4.5:1 | **PASS** |
| `--text-dim / --bg`<br>_Secondary Metadata & Hints on Canvas_ | `#94a3b8` / `#07090e` | **7.77:1** | 3.0:1 | **PASS** |
| `--text-dim / --card`<br>_Secondary Metadata & Hints on Card_ | `#94a3b8` / `#141b2a` | **6.71:1** | 3.0:1 | **PASS** |
| `--accent-glow / --card`<br>_Kicker & Accent Headings on Card_ | `#ff5a5f` / `#141b2a` | **5.64:1** | 4.5:1 | **PASS** |
| `--accent-glow / --bg`<br>_Kicker & Accent Headings on Canvas_ | `#ff5a5f` / `#07090e` | **6.52:1** | 4.5:1 | **PASS** |
| `--gold / --card`<br>_Amber KPI Status / Stat Metrics_ | `#f59e0b` / `#141b2a` | **8.02:1** | 3.0:1 | **PASS** |
| `--green / --card`<br>_Green KPI Positive Metrics_ | `#10b981` / `#141b2a` | **6.79:1** | 3.0:1 | **PASS** |
| `--teal / --card`<br>_Teal KPI Speed / SLA Metrics_ | `#14b8a6` / `#141b2a` | **6.92:1** | 3.0:1 | **PASS** |
| `#ffffff / --brand-red`<br>_Button / Pill Text on Brand Crimson_ | `#ffffff` / `#8B0000` | **10.01:1** | 4.5:1 | **PASS** |
| `--accent-glow / #2d1927`<br>_Member Badge Text on Tinted Surface_ | `#ff8a8e` / `#2d1927` | **7.25:1** | 4.5:1 | **PASS** |

---

## Light Mode (Daylight Reading Theme)

Canvas Background: `#f8fafc` | Card Surface: `#ffffff`

| Variable / Element Pair | Hex Values (FG / BG) | Contrast Ratio | WCAG AA Req | Result |
| :--- | :--- | :--- | :--- | :--- |
| `--text / --bg`<br>_Primary Text on Main Canvas_ | `#0f172a` / `#f8fafc` | **17.06:1** | 4.5:1 | **PASS** |
| `--text / --card`<br>_Primary Text on Card Surface_ | `#0f172a` / `#ffffff` | **17.85:1** | 4.5:1 | **PASS** |
| `--text-muted / --bg`<br>_Muted Supporting Copy on Canvas_ | `#334155` / `#f8fafc` | **9.90:1** | 4.5:1 | **PASS** |
| `--text-muted / --card`<br>_Muted Supporting Copy on Card_ | `#334155` / `#ffffff` | **10.35:1** | 4.5:1 | **PASS** |
| `--text-dim / --bg`<br>_Metadata & Subtle Labels on Canvas_ | `#475569` / `#f8fafc` | **7.24:1** | 4.5:1 | **PASS** |
| `--text-dim / --card`<br>_Metadata & Subtle Labels on Card_ | `#475569` / `#ffffff` | **7.58:1** | 4.5:1 | **PASS** |
| `--brand-red / --card`<br>_Brand Crimson Headings on Card_ | `#8B0000` / `#ffffff` | **10.01:1** | 4.5:1 | **PASS** |
| `--brand-red / --bg`<br>_Brand Crimson Headings on Canvas_ | `#8B0000` / `#f8fafc` | **9.57:1** | 4.5:1 | **PASS** |
| `--green / --card`<br>_High-Contrast Emerald Positive Metric_ | `#047857` / `#ffffff` | **5.48:1** | 4.5:1 | **PASS** |
| `--gold / --card`<br>_High-Contrast Amber Warning Metric_ | `#b45309` / `#ffffff` | **5.02:1** | 4.5:1 | **PASS** |
| `--teal / --card`<br>_High-Contrast Dark Teal Speed Metric_ | `#0f766e` / `#ffffff` | **5.47:1** | 4.5:1 | **PASS** |
| `#ffffff / --brand-red`<br>_Button / Pill Text on Brand Crimson_ | `#ffffff` / `#8B0000` | **10.01:1** | 4.5:1 | **PASS** |
| `#8B0000 / #fee2e2`<br>_Member Badge Text on Red Tint_ | `#8B0000` / `#fee2e2` | **8.19:1** | 4.5:1 | **PASS** |

---

## Projector Mode (High-Contrast Auditorium / Hall Theme)

Canvas Background: `#ffffff` | Card Surface: `#ffffff`

| Variable / Element Pair | Hex Values (FG / BG) | Contrast Ratio | WCAG AA Req | Result |
| :--- | :--- | :--- | :--- | :--- |
| `--text / --bg`<br>_Solid Black Text on Pure White Canvas_ | `#000000` / `#ffffff` | **21.00:1** | 4.5:1 | **PASS** |
| `--text / --card`<br>_Solid Black Text on Pure White Card_ | `#000000` / `#ffffff` | **21.00:1** | 4.5:1 | **PASS** |
| `--text-muted / --bg`<br>_Muted Secondary Text on Canvas_ | `#1e293b` / `#ffffff` | **14.63:1** | 4.5:1 | **PASS** |
| `--text-muted / --card`<br>_Muted Secondary Text on Card_ | `#1e293b` / `#ffffff` | **14.63:1** | 4.5:1 | **PASS** |
| `--text-dim / --card`<br>_Metadata & Subtle Labels on Card_ | `#334155` / `#ffffff` | **10.35:1** | 4.5:1 | **PASS** |
| `--brand-red / --card`<br>_Deep Crimson Headings on Card_ | `#7f1d1d` / `#ffffff` | **10.02:1** | 4.5:1 | **PASS** |
| `--green / --card`<br>_Ultra-Dark Emerald Positive Metric_ | `#064e3b` / `#ffffff` | **9.72:1** | 4.5:1 | **PASS** |
| `--gold / --card`<br>_Ultra-Dark Amber Warning Metric_ | `#78350f` / `#ffffff` | **9.07:1** | 4.5:1 | **PASS** |
| `--teal / --card`<br>_Ultra-Dark Teal Speed Metric_ | `#134e4a` / `#ffffff` | **9.48:1** | 4.5:1 | **PASS** |
| `#ffffff / --brand-red`<br>_White Button Text on Deep Crimson_ | `#ffffff` / `#7f1d1d` | **10.02:1** | 4.5:1 | **PASS** |
| `#000000 / #e2e8f0`<br>_Member Badge Text on High-Contrast Surface_ | `#000000` / `#e2e8f0` | **17.03:1** | 4.5:1 | **PASS** |

---

## Summary of Mathematical Contrast Verification

- **Total Pairs Evaluated**: 37
- **Total Passing**: 37 (100%)
- **Total Failing**: 0 (0%)
- **WCAG 2.1 Level AA Conformance**: **100% FULL COMPLIANCE** across Dark, Light, Projector, and Auto modes.
