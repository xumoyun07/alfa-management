# 🎙️ ALFA University College — Speaker Script Module
## FIB 2074 Introduction to Management · Oral Presentation & Viva Defense Cockpit

> **Document Type:** Complete Module Analysis, Presentation Scripts, Study Notes & Lecturer Q&A Defense  
> **Course:** FIB 2074 Introduction to Management  
> **Institution:** ALFA University College (Subang Jaya, Malaysia)  
> **Case Scenario:** 12-Month Digital & Operational Turnaround Proposal ($1,000,000 Baseline Tuition)  
> **Module Component:** `Speaker Script` (`#dScriptHost`, `#mScriptHost`, `#mFocus`)  
> **Access Levels:** Super Admin (Full Vault & Controls), Admin (Defense & Q&A), Member/Presenter (Presenter Teleprompter) — *[Пароли скрыты в целях безопасности]*

---

## 📋 Содержание (Table of Contents)
1. [Обзор и цель модуля (Executive Overview)](#1-обзор-и-цель-модуля-executive-overview)
2. [Архитектура и безопасность (Security & Vault Architecture)](#2-архитектура-и-безопасность-security--vault-architecture)
3. [Сравнительная матрица спикеров и тайминг (Rehearsal & Timing Matrix)](#3-сравнительная-матрица-спикеров-и-тайминг-rehearsal--timing-matrix)
4. [Полные материалы спикеров (Members 1–7 Detailed Breakdown)](#4-полные-материалы-спикеров-members-17-detailed-breakdown)
   - [Member 1 — Profile, Challenges & Classical Theories (Slides 1–4)](#member-1--profile-challenges--classical-theories-slides-14)
   - [Member 2 — Strategic Planning, SMART Goals & $42K Budget (Slides 5–7)](#member-2--strategic-planning-smart-goals--42k-budget-slides-57)
   - [Member 3 — Organising 120 Staff, Delegation & Span of Control (Slides 8–9)](#member-3--organising-120-staff-delegation--span-of-control-slides-89)
   - [Member 4 — Leading, 5 Power Bases & Senior Clerks Sandbox (Slides 10–11)](#member-4--leading-5-power-bases--senior-clerks-sandbox-slides-1011)
   - [Member 5 — Controlling, 3 Timing Models & 5-Area Variance (Slides 12–13)](#member-5--controlling-3-timing-models--5-area-variance-slides-1213)
   - [Member 6 — People Management, Leadership, Motivation & Herzberg (Slides 14–15)](#member-6--people-management-leadership-motivation--herzberg-slides-1415)
   - [Member 7 — Integrated POLC Synthesis, Top 3 Priorities & Scorecard (Slides 16–17)](#member-7--integrated-polc-synthesis-top-3-priorities--scorecard-slides-1617)
5. [Карта слайдов и распределение теории (Theory & POLC Cross-Reference)](#5-карта-слайдов-и-распределение-теории-theory--polc-cross-reference)
6. [Методология защиты перед комиссией (Viva Defense Strategy & Best Practices)](#6-методология-защиты-перед-комиссией-viva-defense-strategy--best-practices)

---

## 1. Обзор и цель модуля (Executive Overview)

Модуль **Speaker Script** (в веб-приложении представлен кнопкой `Speaker Script` в навбаре) является специализированным профессиональным сценическим кокпитом (Presentation & Viva Cockpit), созданным для подготовки и живой защиты курсового проекта 7 членами команды перед экзаменационной комиссией и преподавателем Dr. Paul.

### Ключевые задачи модуля:
1. **Синхронизация устного выступления с презентацией:** Каждый участник получает слово в слово выверенный скрипт (`speech`), рассчитанный на темп 130–135 слов в минуту (WPM), укладывающийся в окно до 2 минут (Target 2:00).
2. **Академическая дифференциация фактов (Fact-Check Notes):** Четкое разграничение подтвержденных эмпирических фактов (официальный статус University College с 2021 г., 68 аккредитованных программ MQA, 10% комиссия субагентов) и академических допущений команды (120 сотрудников, 5% маржа мастер-агента, $10,000 базового маркетинга, 5–7 дней ожидания бумаг).
3. **Опережающая защита на вопросы комиссии (Anticipated Lecturer Q&A Defense):** Список вероятных контр-аргументов экзаменатора с готовыми, теоретически обоснованными ответами на базе трудов Robbins & Coulter (2021) и Richard L. Daft (2018).
4. **Сценический телепромптер (Stage Cockpit):** Полноэкранный OLED-интерфейс (`#mFocus`) с живым секундомером, прогресс-баром темпа, степпером размера шрифта и карточкой экспресс-подсказки (`STAGE VIVA CUE`).

---

## 2. Архитектура и безопасность (Security & Vault Architecture)

В соответствии с требованиями безопасности проекта, тексты речей и ответы на вопросы защиты зашифрованы на стороне клиента и никогда не передаются в открытом виде до авторизации.

### Стек шифрования:
- **Алгоритм симметричного шифрования:** `AES-256-GCM` (Galois/Counter Mode с аутентификацией целостности данных).
- **Функция формирования ключа (KDF):** `PBKDF2` на базе `SHA-256`, 210,000 итераций с криптографической солью.
- **Многоуровневая ролевая модель (RBAC):**
  - 👑 **Super Admin (Роль Super Admin):** Полный доступ к защищенному хранилищу, режимам репетиции, Q&A и системным настройкам безопасности (мастер-пароль скрыт).
  - 🛡️ **Admin (Роль Admin):** Доступ к телепромптеру, заметкам и банку ответов Q&A через зашифрованный конверт env_1 (пароль скрыт).
  - 👤 **Member / Presenter (Роль Member):** Доступ к сценическому телепромптеру речей участников через конверт env_2 (пароль скрыт).
- **Механизмы защиты от компрометации:**
  - `AUTO_LOCK_MS = 15 минут`: автоматическая блокировка хранилища при отсутствии действий пользователя с предупреждающим баннером за 60 секунд.
  - `HIDDEN_LOCK_MS = 60 секунд`: мгновенная блокировка при сворачивании браузера или переключении на другую вкладку более чем на 1 минуту.
  - **Очистка памяти DOM:** При блокировке содержимое `#dScriptHost`, `#mScriptHost` и `#mFocus` полностью уничтожается из DOM-дерева, исключая чтение через инспектор элементов.

---

## 3. Сравнительная матрица спикеров и тайминг (Rehearsal & Timing Matrix)

| Член команды | Слайды | Раздел отчета / Баллы | Тема выступления | Слов | Время (135 WPM) | Вопросов Q&A | Заметок к слайдам |
|:---|:---:|:---|:---|:---:|:---:|:---:|:---:|
| **Member 1** | Slides 1–4 | Section A · 15 Marks | Profile & Problems | **116** | ~52s at 135 wpm | 2 | 4 |
| **Member 2** | Slides 5–7 | Section B · 10 Marks | Planning & Strategy | **100** | ~44s at 135 wpm | 1 | 3 |
| **Member 3** | Slides 8–9 | Section C · 10 Marks | Organising & Structure | **78** | ~35s at 135 wpm | 1 | 2 |
| **Member 4** | Slides 10–11 | Section D · 10 Marks | Leading & Power | **93** | ~41s at 135 wpm | 1 | 2 |
| **Member 5** | Slides 12–13 | Section E · 10 Marks | Controlling & Gap Checking | **73** | ~32s at 135 wpm | 1 | 2 |
| **Member 6** | Slides 14–15 | Section F · 10 Marks | Motivation & People | **69** | ~31s at 135 wpm | 1 | 2 |
| **Member 7** | Slides 16–17 | Section G · 15 Marks | POLC Synthesis & Math | **82** | ~36s at 135 wpm | 1 | 2 |
| **ИТОГО** | **Слайды 1–17** | **80 баллов защиты** | **Полный POLC цикл** | **611** | **~4 мин 35 сек** | **8** | **17** |

> 💡 **Общее время презентации:** Вся командная презентация из 7 спикеров занимает ровно 4.5 минуты, что идеально соответствует регламенту академических защит (оставляя 5–10 минут на сессию вопросов Dr. Paul).

---

## 4. Полные материалы спикеров (Members 1–7 Detailed Breakdown)

### Member 1 — Profile & Problems (Slides 1–4)
**Официальная роль:** `Member 1 | Slides 1–4: Business Concept, Core Problems & Management Theories`  
**Академический раздел:** Section A · 15 Marks (15 Marks)  
**Фокусная тема:** ALFA Profile, 100% Agent Reliance & Paperwork Delays  
**Параметры выступления:** 116 слов · 116w · ~52s at 135 wpm · Целевой лимит: 2:00  
**Связанные графики:** График #1 (Profile Timeline), График #2 (Agent Commission Breakdown)

#### 🗣️ Текст речи (Verbatim Spoken Script):
> "Good morning Dr. Paul and everyone. ALFA University College began in 1998 as Alif Creative Academy, has been owned by Nusantara Education Group since 2017, and became a University College in 2021 under the motto A Leader For All. Our 400 new students pay $2,500 each, giving $1,000,000 in tuition. But 100% of them come through agents: 12 master agents manage 96 sub-agents, and every student costs us 15 percent, or $375, in commission. That is $150,000 a year, or $160,000 with marketing, while direct online intake is zero. On top of that, students wait about 5 to 7 days on paper approvals (our estimate). We solve this with Classical, Behavioural and Contingency theories working together."

#### 💡 Экспресс-подсказка к сценической подаче (Stage Viva Cue):
> 📢 *Open with confidence. Emphasize ALFA's heritage since 1998 and the contrast between $150K agent spend vs 5–7 day paper delays.*

#### 📝 Академические заметки к слайдам и факт-чекинг (Slide Study Notes):
- **Slide 1: Slide 1: Profile & Verified Facts**
  - *Пояснение для защиты:* Start by establishing ALFA’s verified identity (1998 Alif Creative Academy → 2017 Nusantara Education Group → 2021 University College in Subang Jaya, 68 MQA programmes across 7 Schools and 4 Centres) and our baseline scale: 400 new students × $2,500 tuition = $1,000,000 gross revenue and 120 staff (stated clearly as our assumption).
- **Slide 2: Slide 2: Challenge 1 (Agents) & Challenge 2 (Paper)**
  - *Пояснение для защиты:* Highlight the two root problems: (1) 100% of our 400 students arrive via 12 master agents and 96 sub-agents costing 10% ($250) + 5% ($125, our assumption) = 15% ($375) per student, or $150,000/year ($160,000 with $10,000 marketing = $400/student); (2) no unified CRM/ERP/HRM (our observation) leaves students waiting 5–7 days (our estimate) for paper approvals.
- **Slide 3: Slide 3: Classical & Behavioural Theories**
  - *Пояснение для защиты:* Show how Lecture 2 theories solve both challenges: Classical theory standardises the 5–7 day paper workflow into a 4-step, under-24-hour digital SOP in ALFA OneHub (our proposal) and splits the 20-person marketing team into 3 specialised roles. Behavioural theory follows ‘Restaurant B’ by involving staff early and paying a $50/student direct bonus (260 × $50 = $13,000).
- **Slide 4: Slide 4: Contingency Theory — No One Best Way**
  - *Пояснение для защиты:* Explain why Contingency theory binds the plan together: young creators get autonomy while senior registry clerks receive step-by-step buddy coaching; regional markets (Malaysia, Indonesia, Central Asia) shift to direct social media + CRM (65% = 260 students), while complex markets like rural China visas keep master agents (35% = 140 students at 15% commission).

#### 🛡️ Опережающие ответы на вопросы преподавателя (Anticipated Lecturer Q&A Defense):
**Вопрос 1:** *"Why not cut agents from 100% to 0% immediately?"*  
**Ответ:** Contingency Theory (Lecture 2) states there is no single best way for every market. In complex visa markets like rural China, master agents provide vital local document verification. Keeping 35% (140 students) via master agents protects total enrolment at 400 while moving 65% (260 students) direct.

**Вопрос 2:** *"Which numbers on Slides 1–2 are verified vs. assumed?"*  
**Ответ:** Verified: 1998 founding, 2017 Nusantara acquisition, 2021 University College upgrade, Subang Jaya campus, 68 MQA programmes, and 10% ($250) sub-agent fee. Clearly labelled as our assumptions/estimates: 120 staff, 5% ($125) master-agent override, $10,000 baseline marketing, and 5–7 day paper wait.

---

### Member 2 — Planning & Strategy (Slides 5–7)
**Официальная роль:** `Member 2 | Slides 5–7: Strategic Planning, SMART Objectives, Contingency Plan & $42K Timeline`  
**Академический раздел:** Section B · 10 Marks (10 Marks)  
**Фокусная тема:** 12-Month Strategic Roadmap, SMART Goals & $42K Budget  
**Параметры выступления:** 100 слов · 100w · ~44s at 135 wpm · Целевой лимит: 2:00  
**Связанные графики:** График #4 (OneHub Architecture), График #7 (Paperless vs $42K Budget)

#### 🗣️ Текст речи (Verbatim Spoken Script):
> "Using the Robbins and Coulter framework, our overall goal is a paperless ALFA with 65 percent direct enrolment. Our SMART objectives are: raise direct intake from 0 to 65 percent, which is 260 students, grow Instagram from 2.1K to 20K followers, and launch OneHub by Month 4 to cut student waiting from 5 to 7 days to under 24 hours. Direct intake grows in quarterly milestones of 20, 40, 55 and 65 percent. If Quarter 2 is below 30 percent, we trigger a $150 direct scholarship. The plan costs $42,000 a year and saves $97,500 in commissions, a net $55,500."

#### 💡 Экспресс-подсказка к сценической подаче (Stage Viva Cue):
> 📢 *Cite Robbins & Coulter planning framework. Clearly state the 65% direct goal and the $100 Early-Bird Direct Rebate contingency trigger.*

#### 📝 Академические заметки к слайдам и факт-чекинг (Slide Study Notes):
- **Slide 5: Slide 5: Overall Goal & 3 SMART Objectives**
  - *Пояснение для защиты:* Present our 3 SMART objectives clearly: (1) Financial — 260 direct students × $375 avoided commission = $97,500 gross savings and $55,500 net savings after the $42,000 budget ($161.54 per direct student; $236.25 blended vs. $400.00 baseline); (2) Marketing — grow Instagram from 2.1K to 20K followers with 5 Reels/week; (3) Digital — launch OneHub by Month 4, cutting waits to < 24 hours and paper by 90%.
- **Slide 6: Slide 6: Quarterly Milestones & Backup Plan**
  - *Пояснение для защиты:* Walk through the quarterly ramp: Today 0% → Q1 20% → Q2 40% → Q3 55% → Q4 65% (260 direct paying $0 commission; 140 agent students × $375 = $52,500). Emphasize the ‘What-if’ contingency trigger: if Q2 direct intake is below 30%, we launch a $150 Direct Online Application Scholarship, which still saves $225 per student vs. the $375 agent fee.
- **Slide 7: Slide 7: $42,000 Budget & 12-Month Timeline**
  - *Пояснение для защиты:* Break down the $42,000 budget ($29,000 fixed + $13,000 variable bonuses for 260 direct students × $50). Combined with $52,500 in remaining agent commissions, total spend is $94,500 (vs. $160,000 baseline), so ALFA retains $905,500 (90.55%) of tuition.

#### 🛡️ Опережающие ответы на вопросы преподавателя (Anticipated Lecturer Q&A Defense):
**Вопрос 1:** *"How does the $150 contingency scholarship affect savings if triggered?"*  
**Ответ:** Each direct student normally saves $375 in agent commission. Offering a $150 scholarship on direct applications still saves $225 per student ($375 − $150), ensuring positive ROI even in a slower-ramp scenario.

---

### Member 3 — Organising & Structure (Slides 8–9)
**Официальная роль:** `Member 3 | Slides 8–9: Organising 120 Staff, Delegation, Org Chart & Span of Control`  
**Академический раздел:** Section C · 10 Marks (10 Marks)  
**Фокусная тема:** 120-Staff Structure, Authority Delegation & Spans of Control  
**Параметры выступления:** 78 слов · 78w · ~35s at 135 wpm · Целевой лимит: 2:00  
**Связанные графики:** График #6 (120-Staff Organogram), График #3 (Span of Control Matrix)

#### 🗣️ Текст речи (Verbatim Spoken Script):
> "Organising turns the plan into action. We structure ALFA's 120 staff into four divisions under the Chairman and Vice-Chancellor: Academic Affairs with 65, Marketing and CRM with 20, IT with 12, and Registry, Finance and HR with 18, plus five top managers. Authority matches responsibility, and we delegate daily approvals while keeping accountability. Today managers have a span of 7; for teams learning new digital workflows we recommend a span of 4 to 6 so coaching is realistic."

#### 💡 Экспресс-подсказка к сценической подаче (Stage Viva Cue):
> 📢 *Highlight Academic Affairs wide span 7 (56 lecturers ÷ 8 programme coordinators); Marketing 4–6; IT 4–5; Operations 4–5 without adding payroll.*

#### 📝 Академические заметки к слайдам и факт-чекинг (Slide Study Notes):
- **Slide 8: Slide 8: 120-Staff Structure & Delegation**
  - *Пояснение для защиты:* Point to the 5 groups totaling 120 staff (assumption): 5 Top Management + 65 Academic Affairs + 20 Digital Marketing & CRM + 12 IT & OneHub ERP + 18 Registry, Finance & HR. Explain Lecture 4 principles: authority matches responsibility (Marketing Director can reject unapproved agent invoices), daily < 24h approvals are delegated to supervisors while accountability stays with division heads, and unity of command prevents conflicting orders.
- **Slide 9: Slide 9: Span of Control (7 Today vs. 4–6 Recommended)**
  - *Пояснение для защиты:* Contrast the current span of 7 direct reports per manager (assumption) with our recommended span of 4–6 in units adopting complex CRM/ERP workflows (Marketing, IT, Registry) by promoting First-Line Leads, while experienced Academic faculty can stay near the top of the range.

#### 🛡️ Опережающие ответы на вопросы преподавателя (Anticipated Lecturer Q&A Defense):
**Вопрос 1:** *"Does narrowing the span of control from 7 to 4–6 increase payroll costs?"*  
**Ответ:** No external hiring is required. We designate existing senior officers as First-Line Team Leads within the 120-staff structure, supported by the $2,000 training and $400 award budget lines.

---

### Member 4 — Leading & Power (Slides 10–11)
**Официальная роль:** `Member 4 | Slides 10–11: Leading — 6 Steps, 5 Sources of Power & ERP Sandbox Case`  
**Академический раздел:** Section D · 10 Marks (10 Marks)  
**Фокусная тема:** 6-Step Leading Process & System Sandbox Change Strategy  
**Параметры выступления:** 93 слов · 93w · ~41s at 135 wpm · Целевой лимит: 2:00  
**Связанные графики:** График #8 (6 Leading Steps & Power), График #9 (Senior Clerks Sandbox)

#### 🗣️ Текст речи (Verbatim Spoken Script):
> "Leading is the people side of management. Our managers follow six steps: set direction, communicate, guide by demonstrating, motivate, support and follow up. They combine all five sources of power: legitimate, reward, coercive, expert and referent. When two senior registry clerks with over 12 years of service feared ERP mistakes and kept 40 students in paper queues for 5 days, our Operations Manager listened privately, set up a safe sandbox practice mode with a manager preview check, and paired them with a tech buddy. The backlog was cleared digitally in under 24 hours."

#### 💡 Экспресс-подсказка к сценической подаче (Stage Viva Cue):
> 📢 *Explain why Referent and Expert power overcame change resistance with senior clerks, avoiding Coercive friction.*

#### 📝 Академические заметки к слайдам и факт-чекинг (Slide Study Notes):
- **Slide 10: Slide 10: 6 Leading Steps & 5 Sources of Power**
  - *Пояснение для защиты:* Walk through the 6 steps (Set Direction → Communicate → Guide live → Motivate → Support → Follow Up every Friday) and show how formal power (Legitimate, Reward $50 bonus, Coercive last-resort penalty) pairs with personal power (Expert IT coaching and Referent mutual respect).
- **Slide 11: Slide 11: Senior Clerks & the ERP Sandbox Case Study**
  - *Пояснение для защиты:* Tell the concrete workplace story: 2 registry clerks (12+ years’ service) feared making permanent ERP errors and held 40 students in a 5-day paper queue. Instead of using coercive punishment, the manager used Referent power (private coffee chat) and Expert power (IT Sandbox Practice Mode + manager preview check + junior tech buddy), clearing the backlog in under 24 hours.

#### 🛡️ Опережающие ответы на вопросы преподавателя (Anticipated Lecturer Q&A Defense):
**Вопрос 1:** *"Why did the manager use Referent and Expert power instead of Coercive power with the senior clerks?"*  
**Ответ:** From Lecture 5, coercive power creates compliance out of fear but damages morale and increases resistance when problem root-causes are anxiety and skill gaps. Referent + Expert power removed the fear of mistakes via the Sandbox.

---

### Member 5 — Controlling & Gap Checking (Slides 12–13)
**Официальная роль:** `Member 5 | Slides 12–13: Controlling — 4-Step Process, Control Types, 5-Area Matrix & Variance`  
**Академический раздел:** Section E · 10 Marks (10 Marks)  
**Фокусная тема:** Lecture 6 Six-Step Control Process, 3 Timing Models & 5 Functional Areas  
**Параметры выступления:** 73 слов · 73w · ~32s at 135 wpm · Целевой лимит: 2:00  
**Связанные графики:** График #10 (Six-Step Control Loop), График #11 (5 Functional Areas)

#### 🗣️ Текст речи (Verbatim Spoken Script):
> "Controlling checks whether the plan works. We use four steps: set standards, measure performance, compare to find variance, and take corrective action. We apply feedforward control before problems occur, concurrent control during activities, and feedback control afterwards, across five areas: financial, operations, quality, HR and strategic. For example, if only 240 students come direct, 160 agent students cost $60,000 against the $52,500 standard, an unfavourable variance of $7,500, so we trigger corrective action."

#### 💡 Экспресс-подсказка к сценической подаче (Stage Viva Cue):
> 📢 *Walk through Lecture 6 six-step process, three timing models (Feedforward, Concurrent, Feedback), and five functional control areas with our own traffic-light rule.*

#### 📝 Академические заметки к слайдам и факт-чекинг (Slide Study Notes):
- **Slide 12: Slide 12: 4 Core Steps & 3 Control Types**
  - *Пояснение для защиты:* Explain the 4-step loop (Set standards → Measure actual → Compare & find variance → Corrective action) and how ALFA uses Feedforward (pre-approving ad budgets & sandbox testing before go-live), Concurrent (live CRM/ERP timestamps flagging > 2h replies or > 24h requests), and Feedback (quarterly intake and budget audits).
- **Slide 13: Slide 13: 5-Area Matrix, Traffic-Light Rule & Variance Math**
  - *Пояснение для защиты:* Highlight the 5 control areas (Financial ≤ $94,500, Operations ≤ 2h/24h, Quality 5 Reels/wk & ≥ 4.5/5, HR ≥ 95% pass, Strategic 20/40/55/65%) and walk through the exact variance math: if only 240 students come direct, 160 agent students × $375 = $60,000 vs. $52,500 standard = +$7,500 unfavourable variance.

#### 🛡️ Опережающие ответы на вопросы преподавателя (Anticipated Lecturer Q&A Defense):
**Вопрос 1:** *"How does the Traffic-Light Rule work in monthly reviews?"*  
**Ответ:** Achievement % = (Actual ÷ Standard) × 100. Green (≥ 100%) means on track; Amber (90–99%) triggers supervisor coaching and ad creative rotation; Red (< 90%) triggers executive intervention such as the $150 direct scholarship or contract audit.

---

### Member 6 — Motivation & People (Slides 14–15)
**Официальная роль:** `Member 6 | Slides 14–15: People Management — Leadership, Communication & Motivation`  
**Академический раздел:** Section F · 10 Marks (10 Marks)  
**Фокусная тема:** Situational Leadership, Job Security & Staff Bonuses  
**Параметры выступления:** 69 слов · 69w · ~31s at 135 wpm · Целевой лимит: 2:00  
**Связанные графики:** График #8 (Situational Leadership), График #6 (120-Staff Structure)

#### 🗣️ Текст речи (Verbatim Spoken Script):
> "Our people strategy combines participative leadership for creators and faculty with situational leadership during ERP onboarding. For communication we use Monday 15-minute verbal stand-ups and warm, eye-level non-verbal coaching. For motivation, Maslow tells us to meet needs from security to esteem, and Herzberg tells us pay and conditions only prevent dissatisfaction, while recognition and growth truly motivate. So we pair the $50 direct bonus with awards, learning and responsibility."

#### 💡 Экспресс-подсказка к сценической подаче (Stage Viva Cue):
> 📢 *Explain why job security and fair pay come first (0 job cuts), then recognition and the $50 direct bonus encourage extra effort.*

#### 📝 Академические заметки к слайдам и факт-чекинг (Slide Study Notes):
- **Slide 14: Slide 14: Leadership Styles & Communication Protocols**
  - *Пояснение для защиты:* Show how Participative leadership engages creators, lecturers and clerks in designing Reels and ERP screens, while Situational leadership shifts from directive coaching in Months 3–5 to full delegation once staff are confident. Pair verbal protocols (Monday 15-min stand-up, 2-hour CRM reply SLA) with non-verbal cues (sitting at eye level during IT coaching, live KPI wall).
- **Slide 15: Slide 15: Maslow’s Hierarchy & Herzberg’s Two-Factor Theory**
  - *Пояснение для защиты:* Connect Maslow’s 5 tiers (Physiological/Safety fair pay & safe sandbox → Social/Esteem huddles & ‘A Leader For All’ awards → Self-actualisation digital certification) with Herzberg’s distinction between Hygiene factors (salary, equipment, clear policies, $50 bonus) and true Motivators (recognition, responsibility, and empowering CRM staff to grant application fee waivers).

#### 🛡️ Опережающие ответы на вопросы преподавателя (Anticipated Lecturer Q&A Defense):
**Вопрос 1:** *"According to Herzberg, is the $50 bonus a hygiene factor or a motivator?"*  
**Ответ:** In our slides, financial compensation and the $50 bonus prevent dissatisfaction and reward output alongside hygiene baselines, while true long-term motivators come from achievement, ‘A Leader For All’ recognition awards, and decision-making autonomy (granting fee waivers).

---

### Member 7 — POLC Synthesis & Math (Slides 16–17)
**Официальная роль:** `Member 7 | Slides 16–17: Integrated POLC, Top 3 Priorities, Scorecard & Conclusion`  
**Академический раздел:** Section G · 15 Marks (15 Marks)  
**Фокусная тема:** Integrated POLC Loop & $97.5K / $55.5K Financial Math  
**Параметры выступления:** 82 слов · 82w · ~36s at 135 wpm · Целевой лимит: 2:00  
**Связанные графики:** График #4 (POLC Strategy Loop), График #5 (3-Tier Economics & Math)

#### 🗣️ Текст речи (Verbatim Spoken Script):
> "Planning sets the 65 percent direct target and the $42,000 budget. Organising builds four divisions with a span of 4 to 6. Leading inspires 120 staff, and Controlling tracks quarterly results. Our top three priorities are to launch the studio and ambassadors, deploy OneHub CRM, and complete ERP and HRM rollout with buddy coaching. The scorecard shows commissions falling from $150,000 to $52,500, total spend from $160,000 to $94,500, and ALFA keeping $905,500, a net saving of $55,500 a year. Thank you!"

#### 💡 Экспресс-подсказка к сценической подаче (Stage Viva Cue):
> 📢 *Deliver the Unified Financial Model (Agent Commissions vs. Direct Digital Plan): $97.5K gross commissions saved, $55.5K net savings, retaining 90.55% tuition.*

#### 📝 Академические заметки к слайдам и факт-чекинг (Slide Study Notes):
- **Slide 16: Slide 16: The POLC Loop & Top 3 Strategic Priorities**
  - *Пояснение для защиты:* Demonstrate how all four functions form a closed loop (Planning 65% target & $42K budget → Organising 4 divisions & span 4–6 → Leading 120 staff → Controlling quarterly variance reviews feeding back into Planning) and highlight the 3 phased priorities across Months 1–2, Months 2–4, and Months 4–7.
- **Slide 17: Slide 17: Today vs. Month-12 Scorecard & Conclusion**
  - *Пояснение для защиты:* Close with the headline turnaround numbers: Direct intake 0% (0) → 65% (260); Commissions $150,000 → $52,500; Total spend $160,000 → $94,500; Tuition retained $840,000 (84.00%) → $905,500 (90.55%); Gross savings $97,500, Net savings $55,500, Total spend savings $65,500; Cost per student $400.00 → $236.25 blended ($161.54 direct); Service speed 5–7 days → < 24 hours.

#### 🛡️ Опережающие ответы на вопросы преподавателя (Anticipated Lecturer Q&A Defense):
**Вопрос 1:** *"What is the difference between the $97,500, $55,500, and $65,500 savings figures?"*  
**Ответ:** $97,500 is gross commission avoided (260 direct students × $375). Subtracting the $42,000 transformation plan budget gives $55,500 net saving vs. commissions alone. Including the $10,000 baseline marketing spend ($160,000 baseline − $94,500 new total spend) gives $65,500 total annual cost reduction.

---

## 5. Карта слайдов и распределение теории (Theory & POLC Cross-Reference)

План оздоровления ALFA University College опирается на классические и современные концепции менеджмента:

| Функция POLC | Слайды | Теоретический фундамент (Авторы / Лекции) | Практическое применение в ALFA UC |
|:---|:---:|:---|:---|
| **Planning (Планирование)** | 1–7 | Robbins & Coulter (2021) Ch. 8–9; SMART Goals; Contingency Planning | 3 цели SMART: 65% direct (260 студентов), 20K подписчиков Instagram, OneHub за 4 мес. Бюджет $42,000. Резервный план: скидка $150 при direct < 30% во 2 кв. |
| **Organising (Организация)** | 8–9 | Henri Fayol, Max Weber, Daft (2018); Норма управляемости (Span of Control) | Структура 120 сотрудников на 4 дивизиона. Делегирование оперативных согласований (< 24 ч) с сохранением подотчетности директоров. Норма управляемости 4–6 для цифровых отделов, 7 для преподавателей. |
| **Leading (Руководство)** | 10–11 | French & Raven (5 источников власти); 6 этапов лидерства | Преодоление сопротивления изменениям опытных регистраторов через референтную и экспертную власть (ERP Sandbox + бадди-наставничество), отказ от принуждения. |
| **Controlling (Контроль)** | 12–13 | Robbins & Coulter Ch. 18; Lecture 6 (6-этапный цикл, 3 типа контроля) | Feedforward (предварительное тестирование в Sandbox), Concurrent (трекинг времени ответов в CRM), Feedback (квартальный аудит). Матрица 5 областей и правило светофора (Green ≥100%, Amber 90–99%, Red <90%). |
| **Motivation & People** | 14–15 | Abraham Maslow (Иерархия потребностей); Frederick Herzberg (Двухфакторная теория) | Базовая безопасность (0 увольнений) + гигиенические факторы (честная зарплата, бонус $50) + истинные мотиваторы (премия 'A Leader For All', автономия в OneHub). |
| **POLC Synthesis & Finance** | 16–17 | Комплексный замкнутый контур POLC; Юнит-экономика образования | Сокращение комиссий со $150K до $52.5K. Чистая экономия $55,500/год (общая $65,500). Удержание 90.55% выручки вместо 84.00%. |

---

## 6. Методология защиты перед комиссией (Viva Defense Strategy & Best Practices)

Для получения максимальных 80 баллов за презентацию и защиту рекомендуется следовать 5 золотым правилам:

1. **Четко называть цифры как факты или допущения:**
   - Если комиссия спрашивает: *«Откуда взялись 120 сотрудников?»* — отвечать: *«Это обоснованное допущение нашей команды, основанное на обслуживании 7 школ и 68 программ, так как точное штатное расписание является коммерческой тайной Nusantara Group»*.
2. **Не отказываться от агентов на 100%:**
   - Всегда подчеркивать применение **Contingency Theory (Ситуационного подхода)**: прямые онлайн-продажи внедряются в доступных регионах (Малайзия, Индонезия, Центральная Азия), а сложные визовые рынки (провинциальный Китай) остаются за мастер-агентами (35% = 140 студентов).
3. **Защита финансовой математики ($97,500 vs $55,500 vs $65,500):**
   - **$97,500** — валовая экономия на комиссиях (260 direct × $375).
   - **$55,500** — чистая экономия после вычета бюджета трансформации ($97,500 − $42,000).
   - **$65,500** — совокупное сокращение расходов вуза ($160,000 старых затрат − $94,500 новых совокупных затрат).
4. **Плавная передача слова между спикерами:**
   - Каждый спикер завершает выступление фразой-мостиком к следующей функции POLC (например: *«Планирование задало цель в 65%, а мой коллега Member 3 покажет, как организация структуры воплощает этот план в жизнь»*).
5. **Использование полноэкранного телепромптера (`#mFocus`):**
   - На трибуне открывать сценический режим (`Stage` / `openFocus()`) на планшете или телефоне: крупный контрастный шрифт, живой таймер и карточка подсказок к защите гарантируют уверенное выступление без заминок.
