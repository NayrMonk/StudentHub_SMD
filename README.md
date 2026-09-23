# Student Hub

A mobile-first React Native (Expo) app that reimagines the university student
portal around two problems students actually run into with FLEX-style
portals: **"what will my final grade be if I get X on this?"** and
**"which course/professor/time slot should I actually pick?"**

## Problem it solves

- **Grade uncertainty.** Students can't tell how a missing quiz, midterm, or
  hypothetical final score will affect their final grade until it's posted.
  The **Grades** tab is a Canvas-style "what-if" calculator: enter a
  hypothetical score for any ungraded category and the weighted final
  percentage, letter grade, and risk status recalculate live.
- **Registration blind spots.** Course catalogs rarely surface professor
  quality or schedule conflicts up front. The **Register** tab shows each
  course's professor and their average rating (from past student reviews),
  lets you register/drop with one tap, builds your weekly timetable
  automatically, and flags time conflicts as soon as they happen.
- **Dashboard.** A read-only overview: current grade per registered course
  (bar chart), GPA trend across past semesters (line chart), and average
  professor rating for your current courses (progress ring).

## Features / requirement mapping

| Requirement | Where |
|---|---|
| Data-driven UI | Course/professor/grade data lives in `src/data/mockData.js` as plain arrays/objects; every list/card/chart is generated from it, nothing is hand-duplicated |
| Form/input + validation | `ScoreInput` (Grades tab) rejects non-numeric input and out-of-range scores with inline feedback |
| Application states | Empty states (no courses registered), risk states (on-track/at-risk/critical/ungraded), conflict state (schedule overlap banner) |
| Reusable components | `Card`, `TopTabs`, `RatingRing`, `StatusBadge`, `ScoreInput`, `TimetableGrid` — shared across all four screens |
| State/props/conditional rendering | View switching, theme, density, and grade edits are all `useState`/Context driven; no navigation library used (per assignment rule — top segmented tabs instead of a side/bottom bar) |
| Dashboard (react-native-chart-kit) | Bar chart (grades per course) + Line chart (GPA trend), plus a bonus Progress ring (professor rating) |
| Personalization | Light / Dark / System theme and Compact / Normal / Spacious layout density, persisted across restarts via AsyncStorage |

## Project structure

```
src/
  data/mockData.js        static course/professor/GPA data
  utils/grades.js          weighted grade calc, letter/status lookup, schedule overlap, time formatting
  context/SettingsContext.js  theme + density, persisted with AsyncStorage
  components/              Card, TopTabs, RatingRing, StatusBadge, ScoreInput, TimetableGrid
  screens/                 DashboardScreen, GradesScreen, RegistrationScreen, SettingsScreen
App.js                     top-level state + view switching (no router)
```

## Demo

<video src="https://raw.githu

https://github.com/user-attachments/assets/ecb55111-8578-4c68-adcc-c4d0302f6a9c

busercontent.com/NayrMonk/StudentHub_SMD/master/DemoVideo.mp4" controls width="360">
  Your browser can't play this video inline — see <a href="./DemoVideo.mp4">DemoVideo.mp4</a> directly.
</video>

## Setup & run

Requires Node.js and the Expo Go app (iOS/Android) or an emulator.

```bash
cd student-hub
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `a` / `i` in the terminal for an
Android/iOS emulator, or `w` for a browser preview.

## Known limitations (deliberate scope cuts)

- `react-native-chart-kit` has no native Gantt chart type, so the weekly
  timetable is a custom grid component instead of a chart-kit chart (the
  dashboard's 2-chart requirement is still met with Bar + Line, plus a bonus
  Progress ring).
- Data is static/mock (per assignment recommendation) — registrations and
  what-if grade edits reset on app reload; only theme/density preferences
  persist.
