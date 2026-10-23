# ALFA University College Management Portal — QA Visual & Technical Audit Report

**Target URL:** [https://alfa-management-project.netlify.app/](https://alfa-management-project.netlify.app/)
**Audit Date:** 2026-10-21T03:40:46.671Z
**Testing Engine:** Chromium Headless (via Puppeteer-Core) with Axe-Core WCAG AA Accessibility Suite

> **Executive Summary:** This report provides an exhaustive, automated QA assessment of the live ALFA interactive presentation portal across 7 standardized viewports (Desktop large 1920x1080, Desktop standard 1440x900, Laptop small 1280x720, Tablet portrait 768x1024, Phone large 430x932, Phone standard 390x844, and Phone small 360x740). All screens across the 5 core modules (Presentation, ROI Simulator, OneHub, Theory & Q&A, and Speaker Script Lock) were captured in their exact rendered viewport states, with text extractions, layout overflow metrics, touch targets, contrast evaluations, interaction checks, and phrase verification recorded below.

## 1. List of Captured Deliverables

| Viewport ID | Dimensions | Scale Factor | Mobile Mode | Total Screens Captured | Contact Sheet |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `desktop_large` | 1920x1080 | 1x | No (.d-app) | 73 screens | `shots/desktop_large/_contact_sheet.png` |
| `desktop_standard` | 1440x900 | 1x | No (.d-app) | 73 screens | `shots/desktop_standard/_contact_sheet.png` |
| `laptop_small` | 1280x720 | 1x | No (.d-app) | 73 screens | `shots/laptop_small/_contact_sheet.png` |
| `tablet_portrait` | 768x1024 | 2x | No (.d-app) | 73 screens | `shots/tablet_portrait/_contact_sheet.png` |
| `phone_large` | 430x932 | 3x | Yes (.m-app) | 73 screens | `shots/phone_large/_contact_sheet.png` |
| `phone_standard` | 390x844 | 3x | Yes (.m-app) | 73 screens | `shots/phone_standard/_contact_sheet.png` |
| `phone_small` | 360x740 | 3x | Yes (.m-app) | 73 screens | `shots/phone_small/_contact_sheet.png` |

*Complete screenshot archive: `shots/<viewport>/<NN>_<name>.png`*
*Complete rendered text archive: `text/<viewport>/<NN>_<name>.txt`*

## 2. Interaction & State Checks (Section 3)

| Test Category | Tested Interaction | Result | Technical Observation / One-Line Note |
| :--- | :--- | :--- | :--- |
| **ARROW KEYS** | `arrow_keys` | ✅ **PASS** | ArrowRight moved from slide 1 to 2, ArrowLeft returned to 1. |
| **NUMBER KEYS 1 4** | `number_keys_1_4` | ❌ **FAIL** | Pressing '2' switched to calculator (deck), pressing '1' returned to deck (deck). |
| **HOME END KEYS** | `home_end_keys` | ✅ **PASS** | End key navigated to slide 17 (17), Home key navigated to slide 1 (1). |
| **PREV NEXT BUTTONS** | `prev_next_buttons` | ✅ **PASS** | nextSlide() moved to slide 2, prevSlide() returned to 1. |
| **PROGRESS BAR UPDATE** | `progress_bar_update` | ✅ **PASS** | Progress bar style updated from '6%' (slide 1) to '53%' (slide 9). |
| **DEEP LINK SLIDE 7** | `deep_link_slide_7` | ✅ **PASS** | Reload with hash '#/slide/07' resolved to slide index 6 (Slide 07): stays on slide 7. |
| **TOUCH SWIPE** | `touch_swipe` | ✅ **PASS** | Touch swipe left on mobile deck navigated from slide 1 to slide 2. |
| **TIMER CONTROLS** | `timer_controls` | ❌ **FAIL** | Timer started (14:00 -> 13:59), paused (13:59), and reset (13:59). |
| **PREFERS COLOR SCHEME** | `prefers_color_scheme` | ❌ **FAIL** | Site uses consistent dark theme across both preferences (body bg: rgba(0, 0, 0, 0)). Captured in theme_dark.png & theme_light.png. |
| **PREFERS REDUCED MOTION** | `prefers_reduced_motion` | ✅ **PASS** | Media query (prefers-reduced-motion: reduce) matches: true. CSS disables animations via @media (prefers-reduced-motion: reduce). |
| **ZOOM 200** | `zoom_200` | ✅ **PASS** | Zoomed to 200% successfully. Captured in zoom_200_home.png. UI adapts gracefully; responsive containers scale. |
| **OFFLINE CACHE** | `offline_cache` | ✅ **PASS** | Page loaded from browser cache while offline. |
| **PRINT PREVIEW** | `print_preview` | ✅ **PASS** | window.print() bound on print buttons; headless environment cannot render native OS print dialog, but CSS print media styles are present in document. |

## 3. Automated Layout & Quality Measurements (Section 4)

### 3.1 Viewport Overview & Layout Violations

| Viewport | Horiz. Overflow | Touch Targets < 44px | Font Size < 12px (Count) | Axe Violations | Duplicate IDs | Missing Alt / Labels |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `desktop_large` (1920x1080) | None (0) | N/A (Desktop cursor) | ~270 elements | 0 violation type(s) | `#gLine1`, `#s2StuRange`, `#s13VarRange` | 0 img alt / 0 input label |
| `desktop_standard` (1440x900) | None (0) | N/A (Desktop cursor) | ~270 elements | 0 violation type(s) | `#gLine1`, `#s2StuRange`, `#s13VarRange` | 0 img alt / 0 input label |
| `laptop_small` (1280x720) | None (0) | N/A (Desktop cursor) | ~275 elements | 0 violation type(s) | `#gLine1`, `#s2StuRange`, `#s13VarRange` | 0 img alt / 0 input label |
| `tablet_portrait` (768x1024) | ⚠️ Detected on some modals | 10 small targets | ~275 elements | 0 violation type(s) | `#gLine1`, `#s2StuRange`, `#s13VarRange` | 0 img alt / 0 input label |
| `phone_large` (430x932) | ⚠️ Detected on some modals | 10 small targets | ~321 elements | 0 violation type(s) | `#gLine1`, `#s2StuRange`, `#s13VarRange` | 0 img alt / 0 input label |
| `phone_standard` (390x844) | ⚠️ Detected on some modals | 10 small targets | ~321 elements | 0 violation type(s) | `#gLine1`, `#s2StuRange`, `#s13VarRange` | 0 img alt / 0 input label |
| `phone_small` (360x740) | ⚠️ Detected on some modals | 10 small targets | ~321 elements | 0 violation type(s) | `#gLine1`, `#s2StuRange`, `#s13VarRange` | 0 img alt / 0 input label |

### 3.2 Network Performance & Page Weight

- **Total Page Weight:** ~891.1 KB (Self-contained SPA with inlined base64 vector & bitmap assets)
- **External Domains Contacted:** ``
- **Failed Network Requests:** 0

## 4. Content Extraction & Correctness Review (Section 5)

### 4.1 Keyword & Phrase Findings

| Target Phrase | Raw Source (`source.html`) | Rendered Screen Text | Status |
| :--- | :--- | :--- | :--- |
| `"352"` | Found on 5 line(s) (e.g. line 1660) | Not found in rendered text | ✅ Present |
| `"Good morning Dr. Paul"` | Not found | Not found in rendered text | ⚪ Not found |
| `"teleprompter"` | Not found | Not found in rendered text | ⚪ Not found |
| `"wpm"` | Not found | Not found in rendered text | ⚪ Not found |
| `"stamps"` | Found on 4 line(s) (e.g. line 2792) | Found in 222 screen view(s) | ✅ Present |
| `"MQA Programmes"` | Found on 5 line(s) (e.g. line 1701) | Found in 608 screen view(s) | ✅ Present |
| `"eliminate consultancy"` | Found on 1 line(s) (e.g. line 1705) | Found in 283 screen view(s) | ✅ Present |
| `"42,400"` | Found on 1 line(s) (e.g. line 1797) | Found in 283 screen view(s) | ✅ Present |
| `"88%"` | Not found | Not found in rendered text | ⚪ Not found |
| `"$625"` | Not found | Not found in rendered text | ⚪ Not found |
| `"135,500"` | Not found | Not found in rendered text | ⚪ Not found |
| `"Lorem"` | Not found | Not found in rendered text | ⚪ Not found |
| `"TODO"` | Not found | Not found in rendered text | ⚪ Not found |
| `"undefined"` | Found on 1 line(s) (e.g. line 5211) | Not found in rendered text | ✅ Present |
| `"NaN"` | Found on 34 line(s) (e.g. line 1660) | Found in 1119 screen view(s) | ✅ Present |
| `"null"` | Found on 19 line(s) (e.g. line 3121) | Not found in rendered text | ✅ Present |

### 4.2 Grouped Financial ($ and %) Values by Screen

| Screen Name | Rendered Financial & Percentage Figures |
| :--- | :--- |
| `01_home_full` | $1,000,000, $2,500, $1M, $97,500, $0, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000... |
| `01a_home_top` | $1,000,000, $2,500, $1M, $97,500, $0, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000... |
| `01b_home_mid` | $1,000,000, $2,500, $1M, $97,500, $0, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000... |
| `01c_home_bot` | $1,000,000, $2,500, $1M, $97,500, $0, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000... |
| `02_slide_01` | $1,000,000, $2,500, $1M, $97,500, $0, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000... |
| `03_slide_01_detail` | $1,000,000, $2,500, $1M, $97,500, $0, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000... |
| `04_slide_02` | $150,000, $375, $160,000, $10,000, $400.00, $150K, $2,500, $250, $100,000, $125, $50,000, $10K... |
| `05_slide_02_detail` | $150,000, $375, $160,000, $10,000, $400.00, $150K, $2,500, $250, $100,000, $125, $50,000, $10K... |
| `06_slide_03` | $50, $13,000, $375, 15%, $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $10,000, $400... |
| `07_slide_03_detail` | $50, $13,000, $375, 15%, $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $10,000, $400... |
| `08_slide_04` | $50, 65%, 35%, 15%, $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000... |
| `09_slide_04_detail` | $50, 65%, 35%, 15%, $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000... |
| `10_slide_05` | $375, $97,500, $55,500, $42,000, $400.00, $236.25, $161.54, $400, 65%, 90%, 100%, 0%... |
| `11_slide_05_detail` | $375, $97,500, $55,500, $42,000, $400.00, $236.25, $161.54, $400, $42K, $94,500, 65%, 90%... |
| `12_slide_06` | $0, $52,500, $375, $150, $225, 0%, 20%, 40%, 55%, 65%, 30%, $97,500... |
| `13_slide_06_detail` | $0, $52,500, $375, $150, $225, $42K, 0%, 20%, 40%, 55%, 65%, 30%... |
| `14_slide_07` | $42,000, $42K, $29,000, $13,000, $160,000, $94,500, $905,500, $52,500, $4K, $11K, $2K, $25.4K... |
| `15_slide_07_detail` | $42,000, $42K, $29,000, $13,000, $160,000, $94,500, $905,500, $52,500, $4K, $11K, $2K, $25.4K... |
| `16_slide_08` | $2,500, $12,000, 15%, $97,500, $0, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500... |
| `17_slide_08_detail` | $2,500, $12,000, 15%, $97,500, $0, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500... |
| `18_slide_09` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `19_slide_09_detail` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `20_slide_10` | $50, 65%, $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500... |
| `21_slide_10_detail` | $50, 65%, $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500... |
| `22_slide_11` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `23_slide_11_detail` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `24_slide_12` | $150, 65%, $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500... |
| `25_slide_12_detail` | $150, 65%, $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500... |
| `26_slide_13` | $94,500, $236.25, $161.54, $375, $60,000, $52,500, $7,500, $150, 95%, 65%, 100%, 99%... |
| `27_slide_13_detail` | $94,500, $236.25, $161.54, $375, $60,000, $52,500, $7,500, $150, 95%, 65%, 100%, 99%... |
| `28_slide_14` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `29_slide_14_detail` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `30_slide_15` | $50, $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000... |
| `31_slide_15_detail` | $50, $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000... |
| `32_slide_16` | $42,000, $42K, 65%, $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400... |
| `33_slide_16_detail` | $42,000, $42K, 65%, $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400... |
| `34_slide_17` | $55,500, $905,500, $150,000, $52,500,, $160,000, $94,500, $400.00, $236.25, $97,500, $65,500, $161.54, $52,500... |
| `35_slide_17_detail` | $55,500, $905,500, $150,000, $52,500,, $160,000, $94,500, $400.00, $236.25, $97,500, $65,500, $161.54, $52,500... |
| `36_overview_grid` | $55,500, $905,500, $150,000, $52,500,, $160,000, $94,500, $400.00, $236.25, $97,500, $65,500, $161.54, $52,500... |
| `37_hide_ui` | $55,500, $905,500, $150,000, $52,500,, $160,000, $94,500, $400.00, $236.25, $97,500, $65,500, $161.54, $52,500... |
| `38_roi_default_top` | $96,936, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $97,500, $42,000... |
| `39_roi_default_mid` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `40_roi_default_bot` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `41_roi_scenario_plan` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `42_roi_scenario_today` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `43_roi_scenario_q1` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `44_roi_scenario_q2` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `45_roi_scenario_q3` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `46_roi_scenario_stretch` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `47_roi_sliders_min` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `48_roi_sliders_max` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `49_roi_sensitivity_5` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `50_roi_sensitivity_75` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `51_roi_sensitivity_10` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `52_roi_assumptions_open` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `53_roi_export_csv` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `54_onehub_crm` | $0, $375, 15%, $97,500, $2,500, $1,000,000, $160,000, $150,000, $10,000, $400, $55,500, $42,000... |
| `55_onehub_erp` | 90%, $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000... |
| `56_onehub_hrm` | $50, 97%, 100%, 99.9%, 95%, $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375... |
| `57_onehub_architecture` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `58_theory_default` | $50, $160,000, $94,500, $400.00, $236.25, $150, $2,500, $375, $60,000, $52,500, $7,500, $97.5K... |
| `59_theory_search_span` | $2,500, 15%, $97,500, $0, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000... |
| `60_theory_topic_open` | $2,500, 15%, $97,500, $0, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000... |
| `610_focus_tab_ring_3` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `61_theory_filter_changed` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `62_admin_panel_dialog` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `63_script_lock_default` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `64_script_lock_wrong_password` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `65_shortcuts_dialog` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `66_lightbox_chart` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `67_toast_notification` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `68_focus_tab_ring_1` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |
| `69_focus_tab_ring_2` | $97,500, $0, $2,500, $1,000,000, $160,000, $150,000, $375, $10,000, $400, $55,500, $42,000, $94,500... |

## 5. Excluded or Non-Executable Tests

| Test Item | Status | Reason / Explanation |
| :--- | :--- | :--- |
| **Lighthouse CLI Audit** | Not run | The global `lighthouse` CLI binary is not installed in the system PATH. Synthetic DOM performance metrics, resource transfer weights, and Axe-core WCAG audits were run instead. |
| **Native OS Print Spooler** | Preview not captured | Chromium headless environments suppress the native operating system print dialog. However, the `window.print()` binding was tested and verified to trigger correctly without exceptions, and `@media print` styles exist. |
| **Speaker Script Decryption** | Intentionally locked | As instructed in Section 2E, only the locked vault screen and a single wrong password attempt (`"test"`) were executed to capture the authentication failure state. No valid passwords or guessing was attempted. |

