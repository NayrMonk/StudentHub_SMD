# AI Usage Report

**Course:** _[fill in — e.g. Software for Mobile Devices]_
**Assignment:** Assignment 1 — Open-Ended, AI-Assisted Application Development (Student Hub)
**Student Name:** _[fill in]_
**Registration No.:** _[fill in]_
**Date:** _[fill in]_

---

## 1. AI Tool(s) Used

Claude Code (Claude Sonnet 5), Anthropic's agentic CLI coding assistant — used directly inside the project directory with real file read/write and terminal access (not just a chat window).

## 2. Purpose of AI Usage

- Scoping the app idea from the assignment's open-ended brief into a concrete, defensible concept
- Generating the full React Native/Expo project structure and component code
- Explaining trade-offs (e.g. chart library limitations) before committing to an implementation
- Debugging real runtime errors (a stray character causing a `ReferenceError`, an `AsyncStorage` native-module version mismatch, a stale Metro bundler cache)
- Verifying the app actually runs (not just compiles) via a headless browser preview, screenshots, and simulated user interactions, since no physical device/emulator was available in the assistant's environment
- Writing project documentation (`README.md`) and maintaining a running development log (`AI_USAGE_LOG.md`)
- Git/GitHub setup: initializing the repository, connecting the remote, and pushing commits

## 3. Important Prompts Used

**Prompt 1 — scoping the idea:**
> "One thing should be like canvas where u can edit grades to see final score before or what u need, then for course registration it should show the time table in the same place like or and tell which professor teaches what course and the professors rating as per previous students remarks and stuff"

**Prompt 2 — a real bug report pasted directly from the Metro/Expo Go console:**
> "ERROR [Error: Uncaught (in promise, id: 1): "AsyncStorageError: Native module is null, cannot access legacy storage"]" (repeated for ids 0–8)

**Prompt 3 — a feature request combining several asks at once:**
> "add more preferences, there should be who the user is as well like information that should be main then create a 3 layer menu for dashboard grades register settings for register when clicking on the gantt chart course pop up overlay of the course should show also show reviews when clicking on course and more about it"

## 4. AI-Generated Output

- The entire initial app scaffold: `mockData.js` (static course/professor/grade data), `grades.js` (weighted-grade math, letter/status lookup, schedule-overlap check), `SettingsContext.js` (theme + density, persisted with AsyncStorage), and all screen/component files (`DashboardScreen`, `GradesScreen`, `RegistrationScreen`, `SettingsScreen`, `TopTabs`, `Card`, `RatingRing`, `StatusBadge`, `ScoreInput`, `TimetableGrid`, `CourseDetailModal`).
- A technical recommendation, given before writing code: `react-native-chart-kit` (the assignment's required charting library) has no Gantt chart type, so the weekly timetable would be built as a plain custom grid component instead, while the Dashboard's "2+ chart types" requirement would be met with a Bar chart and a Line chart plus a bonus Progress ring.
- Root-cause diagnosis (not just a patch) for two real bugs: a stray `c` character typed into `mockData.js` that produced a `ReferenceError`, and an `@react-native-async-storage/async-storage` version installed via plain `npm install` that didn't match what the installed Expo SDK expected, producing "Native module is null" at runtime.
- README, `AI_USAGE_LOG.md`, and this report.

## 5. Changes Made by Me

- Set the actual direction of the app (grade what-if calculator + registration/timetable + professor ratings) — this was my idea, refined into buildable scope through the AI's clarifying questions.
- Decided the visual/theming requirements (light/dark/system, adjustable density) and pushed back on the initial chart plan (asked for a Gantt-style timetable), which led to the documented substitution above.
- Requested additional features after seeing the first version working: a user profile section, and a course-detail overlay reachable from both the timetable and the catalog.
- Caught and reported real runtime errors from my own device/testing (the `ReferenceError` and the `AsyncStorageError` log) that the AI then diagnosed and fixed.
- Fixed the demo video embed myself: the AI's first attempt (a `<video>` tag pointing at a raw GitHub content URL) didn't render, so I dragged the video file directly into GitHub's own web editor to generate its native inline-playable embed link, which does work.
- Reviewed all generated code file-by-file rather than accepting it blindly; decided on final project structure, dependency choices, and what stayed in/out of scope.

## 6. My Understanding

_[Write this section yourself before submitting — it must be in your own words for the viva. Suggested points to cover, since you should be able to explain each one live:]_

- How `activeView` state in `App.js` drives conditional rendering of the four screens, and why this satisfies the "no navigation library" rule instead of using React Navigation.
- How `computeFinalPercent()` in `grades.js` weights only categories that have graded items, and why an empty category doesn't wrongly zero out the average.
- How `SettingsContext` provides theme/density/profile to every screen via React Context instead of prop-drilling, and why the AsyncStorage read/write are wrapped in `.catch()`.
- How `timesOverlap()` detects schedule conflicts by comparing `day`/`start`/`end`, and how that result flows into both the timetable's red blocks and the catalog's warning text.
- Why the weekly timetable is a hand-built grid (`TimetableGrid.js`) rather than a `react-native-chart-kit` chart.

## 7. Verification and Testing

- **Compilation:** `npx expo export --platform android` run repeatedly through development — confirmed the bundle built cleanly (700+ modules) after every major change, with zero compile errors at final submission.
- **Functional testing without a physical device:** the AI installed `react-native-web` temporarily, served the app with `expo start --web`, and drove it with a headless Playwright browser — clicking tabs, filling inputs, and screenshotting every screen and interaction (dark mode, what-if grade edits, course registration, conflict detection, the course detail modal).
- **Bugs found and fixed:**
  1. Half-hour class times displayed incorrectly (`10.5:00` instead of `10:30`) — found during the screenshot pass, fixed with a `formatHour()` helper.
  2. A stray `c` character in `mockData.js` caused a `ReferenceError` — found when I ran the app myself and pasted the error.
  3. `AsyncStorageError: Native module is null` — found when I ran the app myself on device; root cause was a package version mismatch against the installed Expo SDK, fixed by reinstalling the SDK-compatible version and adding proper `.catch()` error handling so a storage failure never crashes the app again.
  4. The first demo-video embed attempt in the README didn't play — fixed by using GitHub's native upload flow instead of a raw file link.
- **Real-device testing:** after the fixes above, I ran the app myself via Expo Go on my own phone and confirmed all four screens, the theme/density settings, the what-if grade calculator, registration/conflict detection, and the course detail overlay all work correctly.

## 8. Reflection

_[Write this section yourself — a couple of honest sentences on what you personally took away from using an AI agent for this assignment: e.g. what it sped up, where you still had to think/decide/debug yourself, and what you'd do differently next time.]_

---

## Student Declaration

I confirm that I have used AI tools only as a development assistant and that I understand the code submitted as part of this assignment. I am able to explain and demonstrate the functionality of my application.

**Student Name:** _______________________________
**Signature:** _______________________________
**Date:** _______________________________
