// Static mock data — no backend. Grades/professors/schedule all live here.

export const PROFESSORS = [
  {
    id: "p1",
    name: "Dr. Ayesha Raza",
    department: "Computer Science",
    reviews: [
      { author: "Bilal K.", rating: 5, text: "Explains concepts very clearly, fair grader." },
      { author: "Hina S.", rating: 4, text: "Tough exams but you learn a lot." },
      { author: "Omar F.", rating: 4.5, text: "Great office hours support." },
    ],
  },
  {
    id: "p2",
    name: "Dr. Salman Iqbal",
    department: "Computer Science",
    reviews: [
      { author: "Zara N.", rating: 3, text: "Slides are dense, pace is fast." },
      { author: "Ahmed R.", rating: 3.5, text: "Interesting projects, average lectures." },
    ],
  },
  {
    id: "p3",
    name: "Dr. Mehak Tariq",
    department: "Mathematics",
    reviews: [
      { author: "Sara J.", rating: 5, text: "Best professor for Calculus, very supportive." },
      { author: "Danish A.", rating: 4.5, text: "Clear grading rubric." },
      { author: "Fatima Z.", rating: 5, text: "Made a hard subject easy." },
    ],
  },
  {
    id: "p4",
    name: "Dr. Kamran Sheikh",
    department: "Electrical Engineering",
    reviews: [
      { author: "Talha M.", rating: 2.5, text: "Lectures run over time often." },
      { author: "Noor E.", rating: 3, text: "Content is good, feedback is slow." },
    ],
  },
];

export const avgRating = (professor) => {
  if (!professor.reviews.length) return 0;
  const sum = professor.reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / professor.reviews.length) * 10) / 10;
};

// day: 0=Mon ... 4=Fri, start/end in 24h decimal hours
export const COURSES = [
  {
    id: "c1",
    code: "CS301",
    name: "Data Structures",
    credits: 3,
    professorId: "p1",
    schedule: { day: 0, start: 9, end: 10.5 },
    categories: [
      {
        id: "hw", name: "Homework", weight: 20, items: [
          { id: "hw1", name: "HW 1", score: 18, max: 20 },
          { id: "hw2", name: "HW 2", score: 17, max: 20 },
        ]
      },
      {
        id: "quiz", name: "Quizzes", weight: 15, items: [
          { id: "q1", name: "Quiz 1", score: 8, max: 10 },
        ]
      },
      {
        id: "mid", name: "Midterm", weight: 25, items: [
          { id: "mid1", name: "Midterm Exam", score: 42, max: 50 },
        ]
      },
      { id: "final", name: "Final", weight: 40, items: [] },
    ],
  },
  {
    id: "c2",
    code: "CS340",
    name: "Operating Systems",
    credits: 3,
    professorId: "p2",
    schedule: { day: 1, start: 11, end: 12.5 },
    categories: [
      {
        id: "hw", name: "Homework", weight: 20, items: [
          { id: "hw1", name: "HW 1", score: 15, max: 20 },
        ]
      },
      { id: "quiz", name: "Quizzes", weight: 10, items: [] },
      {
        id: "mid", name: "Midterm", weight: 30, items: [
          { id: "mid1", name: "Midterm Exam", score: 33, max: 50 },
        ]
      },
      { id: "final", name: "Final", weight: 40, items: [] },
    ],
  },
  {
    id: "c3",
    code: "MATH210",
    name: "Calculus II",
    credits: 4,
    professorId: "p3",
    schedule: { day: 0, start: 13, end: 14.5 },
    categories: [
      {
        id: "hw", name: "Homework", weight: 15, items: [
          { id: "hw1", name: "HW 1", score: 19, max: 20 },
          { id: "hw2", name: "HW 2", score: 20, max: 20 },
        ]
      },
      {
        id: "quiz", name: "Quizzes", weight: 15, items: [
          { id: "q1", name: "Quiz 1", score: 9, max: 10 },
          { id: "q2", name: "Quiz 2", score: 9.5, max: 10 },
        ]
      },
      {
        id: "mid", name: "Midterm", weight: 30, items: [
          { id: "mid1", name: "Midterm Exam", score: 47, max: 50 },
        ]
      },
      { id: "final", name: "Final", weight: 40, items: [] },
    ],
  },
  {
    id: "c4",
    code: "EE220",
    name: "Circuit Analysis",
    credits: 3,
    professorId: "p4",
    schedule: { day: 2, start: 9, end: 10.5 },
    categories: [
      { id: "hw", name: "Homework", weight: 20, items: [] },
      { id: "quiz", name: "Quizzes", weight: 10, items: [] },
      { id: "mid", name: "Midterm", weight: 30, items: [] },
      { id: "final", name: "Final", weight: 40, items: [] },
    ],
  },
  {
    id: "c5",
    code: "CS355",
    name: "Database Systems",
    credits: 3,
    professorId: "p1",
    schedule: { day: 0, start: 9, end: 10.5 }, // deliberately overlaps CS301 -> conflict demo
    categories: [
      {
        id: "hw", name: "Homework", weight: 20, items: [
          { id: "hw1", name: "HW 1", score: 20, max: 20 },
        ]
      },
      { id: "quiz", name: "Quizzes", weight: 15, items: [] },
      {
        id: "mid", name: "Midterm", weight: 25, items: [
          { id: "mid1", name: "Midterm Exam", score: 40, max: 50 },
        ]
      },
      { id: "final", name: "Final", weight: 40, items: [] },
    ],
  },
  {
    id: "c6",
    code: "CS360",
    name: "Computer Networks",
    credits: 3,
    professorId: "p2",
    schedule: { day: 3, start: 14, end: 15.5 },
    categories: [
      {
        id: "hw", name: "Homework", weight: 20, items: [
          { id: "hw1", name: "HW 1", score: 16, max: 20 },
        ]
      },
      {
        id: "quiz", name: "Quizzes", weight: 15, items: [
          { id: "q1", name: "Quiz 1", score: 7, max: 10 },
        ]
      },
      {
        id: "mid", name: "Midterm", weight: 25, items: [
          { id: "mid1", name: "Midterm Exam", score: 38, max: 50 },
        ]
      },
      { id: "final", name: "Final", weight: 40, items: [] },
    ],
  },
];

export const DEFAULT_REGISTERED = ["c1", "c2", "c3"];

export const GPA_HISTORY = [
  { term: "Fall 24", gpa: 3.1 },
  { term: "Spring 25", gpa: 3.3 },
  { term: "Summer 25", gpa: 3.4 },
  { term: "Fall 25", gpa: 3.5 },
];

export const GRADE_SCALE = [
  { min: 93, letter: "A" },
  { min: 90, letter: "A-" },
  { min: 87, letter: "B+" },
  { min: 83, letter: "B" },
  { min: 80, letter: "B-" },
  { min: 77, letter: "C+" },
  { min: 70, letter: "C" },
  { min: 60, letter: "D" },
  { min: 0, letter: "F" },
];

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
