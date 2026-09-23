import { GRADE_SCALE } from "../data/mockData";

// Weighted % across only categories that have graded items (empty categories excluded).
// Returns null when nothing is graded yet -> caller renders an empty state.
export function computeFinalPercent(categories) {
  let weightUsed = 0;
  let earned = 0;
  categories.forEach((cat) => {
    if (!cat.items.length) return;
    const catMax = cat.items.reduce((a, i) => a + i.max, 0);
    const catScore = cat.items.reduce((a, i) => a + i.score, 0);
    if (catMax <= 0) return;
    const catPercent = catScore / catMax;
    earned += catPercent * cat.weight;
    weightUsed += cat.weight;
  });
  if (weightUsed === 0) return null;
  return (earned / weightUsed) * 100;
}

export function letterFor(percent) {
  if (percent === null) return "—";
  const found = GRADE_SCALE.find((g) => percent >= g.min);
  return found ? found.letter : "F";
}

export function statusFor(percent) {
  if (percent === null) return "empty";
  if (percent >= 80) return "safe";
  if (percent >= 65) return "warning";
  return "danger";
}

export function timesOverlap(a, b) {
  return a.day === b.day && a.start < b.end && b.start < a.end;
}
