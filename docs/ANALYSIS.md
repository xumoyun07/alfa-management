# Architectural & UX Analysis: ALFA Interactive Presentation Portal v4

## 1. Purpose of the Portal
The portal serves as the primary interactive defense asset for **FIB 2074 Introduction to Management** at ALFA University College. Built for a 7-member student team, it defends a strategic turnaround plan: transitioning the institution from 100% agent recruitment dependency to a **65% direct intake model** across **400 new annual students** ($1,000,000 gross tuition at $2,500/student). Beyond standard slides, the application acts as an interactive business instrument containing:
1. **17-Slide Presentation Deck**: 7 member chapters covering diagnosis, organizational restructuring (120 staff), OneHub systems architecture, 12-month Gantt execution ($42,000 budget), and academic governance.
2. **Interactive ROI Simulator**: Dynamic parameter modeling (student intake, tuition, bonus, agent commissions, sensitivity at 5%, 7.5%, 10%) verifying **$97,500/yr gross savings** and **$55,500/yr net recurring gain**.
3. **ALFA OneHub Demo**: Functional prototypes of unified CRM, ERP, and HRM enterprise modules.
4. **Theory & Q&A Knowledgebase**: Curriculum alignment mapping management theories (POLC, Span of Control, Motivation) to operational practices.
5. **Encrypted Speaker Script Vault**: AES-256-GCM + PBKDF2 protected teleprompter and notes keeping defense scripts confidential from audience view until authenticated.

---

## 2. Technical Architecture & Operation
- **Single Self-Contained Artifact**: 913 KB standalone HTML document with zero external network requests.
- **State & Routing Engine (`S`)**: Manages slide indices (`slideIdx`), active module views (`dView`/`mView`), financial calculator inputs (`S.calc`), countdown timers (`S.timer`, `S.running`), and search/filter queries (`S.thQuery`). Navigation is synchronized with URL hash fragments (`#/slide/X`, `#/roi`, `#/onehub`, `#/theories`, `#/script`).
- **Data Architecture**: High-order constants (`CHARTS`, `members`, `CRM`, `ERP`, `HRM`, `DEFAULT_THEORY`, `PRESETS`) provide a single source of truth for metrics, student funnels, and schedules.
- **Reactive Animation**: Numerical counters employ `requestAnimationFrame` interpolation. Module tabs and slide changes execute hardware-accelerated transitions.
- **Security & Script Vault**: Decryption occurs strictly in-memory via `window.crypto.subtle` (PBKDF2 SHA-256 derivation, 100,000 rounds, AES-GCM 128-bit tag). Plaintext speech scripts (e.g., *"Good morning Dr. Paul"*) are non-existent in the initial HTML or unauthenticated DOM. Automatic session timeouts re-lock the vault.

---

## 3. Desktop Audit (1440×900)
*Evaluated via headless Chromium with 2.5s navigation settling.*

- **What is Good**:
  - High information density well-suited for academic defense examiners.
  - Live ROI calculator provides rapid scenario recalculation when challenged by panel members.
  - Keyboard shortcuts (`Arrow`, `Esc`, `F`, `U`) support natural presenter flow.
- **What is Cluttered**:
  - Presentation slides suffer from excessive text density: long multi-sentence paragraphs, bullet walls, and redundant metrics repeated across titles, hero numbers, cards, and captions simultaneously.
  - Visible internal chrome: developer archetype labels (`ARCHETYPE A/B/C/D/E/F`) and duplicate internal tabs (`Interactive Visual / Key Points (2)`) crowd out visual focus.
- **What is Duplicated**:
  - Redundant DOM nodes: duplicate headers, separate `.d-app` and `.m-app` tree elements declaring repetitive textual strings.
- **What is Unfinished & Inconsistent**:
  - **Raster Image Charts**: All 10 visual charts are embedded base64 WebP raster images (~450 KB total) that are un-themeable, blurry on zoom, and inaccessible to screen readers.
  - **Budget Discrepancy**: Slide 7 displays *"itemised lines total $42,400 vs $42,000"* because Performance Awards ($400) is separated from Training ($2,000) and Gantt M4–12 cites $25.4K instead of $25K.
  - **Inconsistent Credibility Labels**: Missing mandatory disclaimers—`5-7 days` lacks `(our estimate)`, Instagram `2.1K` lacks `(our observation)`, OneHub lacks `(our proposal)`, and master agent 5% lacks `(our assumption)`.
  - **Terminology Inaccuracies**: References *"68 MQA Programmes"* rather than *"68 full-time programmes (ALFA website)"* and claims to *"eliminate consultancy sub-agent fees"* rather than *"cut commission costs by $97,500 a year"*.
  - **Theme Inflexibility**: Hardcoded dark palette lacking true Light Theme and Projector High-Contrast mode with WCAG AA compliance.

---

## 4. Mobile Audit (390×844)
*Evaluated via mobile viewport with touch emulation.*

- **What is Good**:
  - Mobile bottom navigation bar provides persistent module access.
  - Horizontal swipe gestures implemented on the presentation view.
- **What is Cluttered**:
  - "Shrunk-Desktop" disease: Multi-column comparison grids and wide tables are compressed, causing severe vertical scrolling fatigue and cognitive overload.
  - Complex nested controls and secondary buttons (Export CSV, Print, Presets) consume crucial vertical thumb space.
- **What is Duplicated**:
  - Separate mobile screens duplicate presentation content without adapting the layout into a native mobile experience.
- **What is Unfinished & Inconsistent**:
  - Sliders and form controls lack proper touch margins (< 44px touch targets) and lack bottom-sheet ergonomics.
  - Long tables (Sensitivity analysis, control metrics) cause horizontal clipping or tiny illegible typography.
  - CRM demo contains realistic personal student names and turnaround times misaligned with the target under-24-hour SLA.

---

## 5. Redesign Plan

### A. What to Remove
1. **~450 KB of Raster WebP Images**: Eradicate all base64 raster charts from `CHARTS` dictionary.
2. **Text Bloat in Presentation Deck**: Strip body text down to ≤35 words per slide. Eradicate all teleprompter and speech text from presentation DOM and raw HTML.
3. **Visual Chrome & Developer Artifacts**: Remove `ARCHETYPE *` tags, duplicate tabs, and redundant headline metrics.
4. **Hardcoded Color Directives**: Eliminate inline hex styles in favor of unified CSS custom properties.

### B. What to Merge
1. **Presentation Secondary Explanations**: Consolidate technical justifications and deep background into a slide-out "More detail" drawer (desktop) and bottom sheet (mobile).
2. **Mobile Architecture Consolidation**:
   - Merge hero KPIs and strategic challenge cards into a single cohesive overview dashboard.
   - Merge ROI Simulator views into a thumb-zone segmented controller (`Simulator` | `Rate Test` | `Breakdown`).
   - Transform sensitivity analysis into 3 stacked visual rate cards featuring large net-saving totals.
   - Collapse member filters and secondary actions (CSV, Print, Presets) into clean bottom action sheets.
3. **Data Representation**: Reconcile Slide 7 budget lines—merge Performance Awards ($400) into Training ($2,000) and adjust Gantt M4–12 to $25K, totaling exactly $42,000 across all views.

### C. What to Rebuild
1. **11 Responsive Inline SVG / Procedural Charts**:
   - (1) 3-Tier Agent Commission Chain ($250 sub, $125 master assumption, $375 total, 12 master, 96 sub, 400 students).
   - (2) Cost Comparison Bars ($160K vs $94.5K total; $400 vs $236.25 per student).
   - (3) Direct Intake Transition Milestones (0%, 20%, 40%, 55%, 65%).
   - (4) Hierarchical Organization Chart (120 staff, balanced span of control).
   - (5) OneHub Unified Systems Architecture (CRM + ERP + HRM).
   - (6) 12-Month Phased Implementation Gantt ($42,000 reconciled).
   - (7) Student Journey Funnel & Cycle (Traditional vs OneHub).
   - (8) POLC Management Framework Cycle.
   - (9) Operational Traffic-Light Control Matrix (Green ≥100%, Amber 90–99%, Red <90%).
   - (10) Leadership, Communication & Motivation Management Triangle.
   - (11) Master Rate Sensitivity Analysis (5%, 7.5%, 10%).
   *All charts dynamically responsive, themed via CSS custom properties, and accessible (`role="img"`, title, desc, tabular fallbacks).*
2. **Theme Engine**: Implement tri-state theme system (`Light`, `Dark`, `Projector Mode` +15% scale) honoring `prefers-color-scheme` with WCAG AA compliance (contrast ≥4.5:1 text, ≥3:1 UI).
3. **Native Desktop Presentation Stage**: Slim unified top bar, member color-coded slide rail, full-viewport responsive stage with 7 specialized slide layouts (Hero, Big Number, Compare, Architecture, Timeline, Matrix, Closing).
4. **True Native Mobile Application (`.m-app`)**:
   - 48px bottom navigation bar with active state feedback.
   - Full-screen vertical story cards with touch swipe and bottom-sheet drawers.
   - Safe-area insets, zero horizontal overflow, and thumb-friendly controls.
5. **Editorial & Credibility Rectification**:
   - Standardize all credibility tags: `(our estimate)`, `(our observation)`, `(our proposal)`, `(our assumption)`.
   - Update MQA phrasing to *"68 full-time programmes (ALFA website)"*.
   - Replace fee elimination claim with *"cut commission costs by $97,500 a year"*.
   - Sanitize CRM demo data to placeholder candidates (`Sample Applicant 01`, etc.) with consistent turnaround metrics.
   - Enforce Slide 17 focal clarity: single headline `+$55,500 net per year`, with `$97,500 gross saving` and `$65,500 spend` as subordinate captions.
   - Ensure simulator includes *"Reset to plan"* button restoring official baselines.
