# AI Usage Report

**Course:** Software for Mobile Devices
**Assignment:** Assignment 1 — Open-Ended, AI-Assisted Application Development (Student Hub)
**Student Name:** Muhammad Umer
**Registration No.:** 23i-6129
**Date:** 9/23/2026
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

_My understanding is that this app is a simple React Native student academic management app where most of the main state is controlled from `App.js`.

In `App.js`, I have three main pieces of state: `activeView`, `courses`, and `registeredIds`. I use `activeView` to decide which screen is currently displayed. Instead of using a navigation library or router, I simply change the value of `activeView` when a user taps one of the top tabs, and then I conditionally render the Dashboard, Grades, Registration, or Settings screen.

The `courses` state starts as a copy of the course data from `mockData.js`. I keep it in state because the course grades can be changed by the user. The `registeredIds` state stores the IDs of the courses that the user has registered for, so I can easily determine which courses should appear in the dashboard and timetable.

For the data itself, I use static mock data instead of a backend or API. The `PROFESSORS` array contains professor information and reviews, while the `COURSES` array contains course details, schedules, grade categories, and graded items. Each course schedule has a day, start time, and end time, while the grading structure contains categories such as homework, quizzes, midterms, and finals.

The main grade calculation is handled by `computeFinalPercent()`. I understand that it only includes categories that already contain graded items. For example, if the final exam has not been graded yet, its weight is not included in the current percentage. This gives a more accurate representation of the student's current grade instead of treating ungraded work as zero.

The `timesOverlap()` function handles schedule conflicts. It checks whether two courses are on the same day and whether their time ranges overlap. I use this during registration to identify conflicts between courses.

The Dashboard is mainly a read-only summary. I filter the course list using `registeredIds`, calculate the grades of the registered courses, and display them using charts. I also use the static GPA history for the line chart and calculate an average professor rating for the registered courses.

The Grades screen works like a live grade calculator. When I expand a course, I can see its grading categories and individual assessment scores. If I change a score, the update function in `App.js` finds the correct course, category, and item and updates it immutably. Since the `courses` state changes, React automatically re-renders the screen and recalculates the percentage, letter grade, and status. This makes the screen useful as a what-if calculator.

The Registration screen has two main parts. The first is the timetable, where I manually position course blocks based on their start and end times. I do this with normal React Native `View` components and absolute positioning instead of using a charting library. The second part is the course catalog, where I can register for or drop a course. When I register for a course, its ID is added to `registeredIds`, and when I drop it, the ID is removed. I also check all registered courses for timetable conflicts and highlight conflicting courses.

The Settings screen works differently from the other screens because I use `SettingsContext` instead of passing everything through props. The context stores the selected theme, display density, and profile information. I can access these settings from anywhere using `useSettings()`. I also save the settings in `AsyncStorage`, so they remain available after the app is restarted. If storage fails, the app still works for the current session instead of crashing.

The `CourseDetailModal` is a reusable modal component. I pass a course object into it, and it uses that course to find and display the related professor information and reviews. Because the same course data structure is used everywhere, I can open the same modal from different parts of the Registration screen.

Overall, my understanding is that the app keeps the architecture intentionally simple. I use `App.js` for the main academic state, `SettingsContext` for user preferences, utility functions for the main grade and timetable logic, and the remaining components mainly for presentation and user interaction. There is currently no backend, database, API, or navigation framework, so the app is easy to follow and the flow of data is straightforward.


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

What I took Personallly is that AI can be a great tool for making a proper app
but it still needs proper way of checking if the agent is doing what u intended it to do. It is much faster at doing coding it self and auditing but to have code which is bug free and is as per your requirement is hard to get from the first go. What I will do differently is define my prompts and requirements create a Requirements.md file so that the AI-Coding tools can use that and create a proper app which is as per your requirement and is bug free. Usign SRS with GANT chart can help AI focus on phase development and help it perfect phases.

---

## Student Declaration

I confirm that I have used AI tools only as a development assistant and that I understand the code submitted as part of this assignment. I am able to explain and demonstrate the functionality of my application.

**Student Name:** Muhammad umer
**Signature:** Muhammad Umer
**Date:** 9/23/2026
