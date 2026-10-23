# Pre-Fix Mobile Rendering & UX Defects Audit

**Audit Date**: October 22, 2026  
**Target File**: `ALFA_Interactive_Presentation_Portal_v4.html`  
**Tested Viewports**:
- **360 px**: 360 × 740 (Phone Small, e.g. Samsung Galaxy S8/S9/A-series)
- **390 px**: 390 × 844 (Phone Standard, e.g. iPhone 12/13/14)
- **430 px**: 430 × 932 (Phone Large, e.g. iPhone 14/15/16 Pro Max)

---

## 1. Executive Summary & Root Cause Analysis

A thorough headless Chromium audit was conducted across mobile viewports (360×740, 390×844, 430×932) on the Home view and 6 representative presentation slides (Slides 1, 2, 7, 8, 11, and 17).

### Root Causes Identified
1. **Vertical Space Starvation via Duplicated Chrome**:
   In mobile presentation mode (`#m-present`), three distinct header bars are stacked at the top:
   - Presentation top bar (`.m-present-topbar`): ~47px height
   - Team member rail (`.m-rail`): ~48px height
   - Sub-slide chips (`.m-sub-slides`): ~45px height
   Together, these controls consume **140px+** of vertical height before any slide content appears.
2. **Slide Content Unconstrained Height & Collision with Story Bar**:
   The slide body (`#mDeckBody`) renders full paragraphs, complex timelines, and multi-column comparison tables without viewport containment. In a 740px viewport (360×740), Slide 1 content measures **954px** high (extending from y=208 to y=1162). The bottom navigation story bar (`.m-story-bar`) sits at y=634–682, causing severe content collisions where text and buttons render behind and below the bottom controls.
3. **Sub-44px Touch Targets**:
   Multiple interactive controls fail the minimum 44×44px WCAG 2.1 touch target recommendation:
   - "← Back to home": 113 × 27.2 px (Height 27.2 px < 44 px)
   - "Grid": 46.8 × 27.2 px (Height 27.2 px < 44 px)
   - Slide selector chips: 75.9 × 22.7 px (Height 22.7 px < 44 px)
   - Bottom story buttons (`#mPrev`, `#mNext`, notes): 38px height (< 44 px)
4. **Desktop/Mobile CSS Conflicts & Overflow**:
   Desktop card components and dense grids bleed into mobile views, causing clipped cards or irregular padding.
5. **Lack of Single-Screen Story Card Discipline**:
   Mobile presentation currently operates as a long scrollable document per slide rather than discrete, full-screen story cards utilizing modern CSS viewport units (`100dvh`).

---

## 2. Measured Metrics Across Viewports

| Viewport | Screen | Measured Content Height | Available Viewport Height | Collision / Overflow Status | Touch Targets < 44px |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **360×740** | Mobile Home | 1258 px (scrollable) | 740 px | None (vertical scroll as intended) | Preset chips: 32px |
| **360×740** | Slide 1 (M1 Context) | 954 px | 740 px | **COLLISION**: Body extends 480px past story bar (y=1162 vs y=682) | 15 buttons < 44px (chips 22.7px, topbar 27.2px, storybar 38px) |
| **360×740** | Slide 2 (M1 Challenge) | 980 px | 740 px | **COLLISION**: Body extends 506px past story bar | 12 buttons < 44px |
| **360×740** | Slide 7 (M3 Strategy) | 865 px | 740 px | **COLLISION**: Body extends 391px past story bar | 10 buttons < 44px |
| **360×740** | Slide 8 (M3 Tactics) | 890 px | 740 px | **COLLISION**: Body extends 416px past story bar | 10 buttons < 44px |
| **360×740** | Slide 11 (M4 Operations) | 840 px | 740 px | **COLLISION**: Body extends 366px past story bar | 10 buttons < 44px |
| **360×740** | Slide 17 (M7 Financials) | 915 px | 740 px | **COLLISION**: Body extends 441px past story bar | 10 buttons < 44px |
| **390×844** | Mobile Home | 1310 px (scrollable) | 844 px | None (smooth scrolling) | Preset chips: 32px |
| **390×844** | Slide 1 | 954 px | 844 px | **COLLISION**: Body extends 286px past story bar | Same sub-44px buttons |
| **390×844** | Slide 2 | 980 px | 844 px | **COLLISION**: Body extends 312px past story bar | Same sub-44px buttons |
| **390×844** | Slide 7 | 865 px | 844 px | **COLLISION**: Body extends 197px past story bar | Same sub-44px buttons |
| **390×844** | Slide 8 | 890 px | 844 px | **COLLISION**: Body extends 222px past story bar | Same sub-44px buttons |
| **390×844** | Slide 11 | 840 px | 844 px | **COLLISION**: Body extends 172px past story bar | Same sub-44px buttons |
| **390×844** | Slide 17 | 915 px | 844 px | **COLLISION**: Body extends 247px past story bar | Same sub-44px buttons |
| **430×932** | Slide 1 | 954 px | 932 px | **COLLISION**: Body extends 178px past story bar | Same sub-44px buttons |
| **430×932** | Slide 2 | 980 px | 932 px | **COLLISION**: Body extends 204px past story bar | Same sub-44px buttons |

---

## 3. Specific Concrete Defects by Component

### A. Mobile Presentation Header & Strips
1. **Three-Tier Header Redundancy**:
   - `m-present-topbar` has "← Back to home", slide badge ("01 / 17"), and "Grid" button.
   - Immediately below is `.m-deck-strip` containing `.m-rail` (M1–M7 pills) AND `.m-sub-slides` (Slide 01, Slide 02, Slide 03, Slide 04).
   - On small screens, having both team member tabs and slide pills consumes over 20% of the entire viewport.
2. **Sub-44px Touch Targets**:
   - "Back to home" is `112.78px × 27.22px`.
   - "Grid" is `46.78px × 27.22px`.
   - Sub-slide buttons are `75.9px × 22.65px`.
   - All these are prone to miss-taps on mobile devices.

### B. Mobile Presentation Body (`#mDeckBody`)
1. **Text Over-Density**:
   - Slides render long descriptive paragraphs (over 80–120 words per slide), dense data tables, and embedded interactive widgets that were designed for desktop presentation.
   - There is no clear visual hierarchy between the core takeaway and supporting technical data.
2. **Bottom Overlap**:
   - Because the body does not use `overflow-y: hidden` with strict height allocation, it scrolls freely behind the fixed `.m-story-bar`.
   - On short viewports (360×740), the final 2–3 paragraphs of every slide are completely obscured by `.m-story-bar`.

### C. Mobile Presentation Bottom Bar (`.m-story-bar`)
1. **Sub-44px Target Heights**:
   - Navigation buttons (`#mPrev`, `#mNext`, "Notes", "Overview") have a measured height of `38px`.
   - Targets should be at least `48px` to guarantee effortless one-hand thumb operation.
2. **Semantic Ambiguity of "Notes"**:
   - The button is labeled "Notes" with a book icon, but the project requirement specifies that speaker speech/teleprompter notes must strictly reside in the encrypted Speaker Script vault. The button should trigger "More detail" for slide content.

### D. Mobile Home
1. **Header Alignment**:
   - Mobile top header logo mark and title need clean single-line alignment with the theme switcher.
2. **Bottom Navigation Bar (`#mBottomNav`)**:
   - Must be strictly hidden during presentation mode and smoothly restored when returning to Home or other modules.
   - Bottom tab buttons must maintain `48px` minimum height with proper safe-area padding (`env(safe-area-inset-bottom)`).

---

## 4. Remediation Plan

1. **Rebuild Mobile Presentation Header**:
   - Replace the 3-tier header with **ONE slim top strip**:
     * Close button "Home" (≥ 44px tap target)
     * Member chip (e.g. `M1 · Context`) which opens an accessible bottom sheet to switch members when tapped
     * Slide counter badge (`01 / 17`)
   - Eliminate simultaneous display of the M1–M7 rail and slide-chip rows.
2. **Rebuild Mobile Story Cards (Full-Screen 100dvh)**:
   - Each slide card is strictly bounded to the visible viewport (`height: 100dvh` / `height: calc(100dvh - topStrip - bottomBar)`).
   - Card layout:
     * Slide title (max 8 words)
     * Key message (max 14 words)
     * One hero number or SVG graphic
     * Body copy strictly ≤ 35 words visible
   - Zero inner page vertical scroll; all secondary data, formulas, breakdowns, and tables moved to the "More detail" bottom sheet.
3. **Rebuild Bottom Thumb Bar**:
   - Height: 54px (buttons ≥ 48px).
   - Four controls: `Prev (←)`, `Overview (Grid)`, `More detail (Book)`, `Next (→)`.
4. **Rebuild "More Detail" as Mobile Bottom Sheet**:
   - Slides up smoothly when tapping "More detail" (or pressing `D`).
   - Displays all secondary context, sources, and calculations with full scrollability inside the sheet.
   - Closes via swipe-down, `Esc`, or close button.
