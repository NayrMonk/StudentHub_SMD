import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SettingsProvider, useSettings } from "./src/context/SettingsContext";
import TopTabs from "./src/components/TopTabs";
import DashboardScreen from "./src/screens/DashboardScreen";
import GradesScreen from "./src/screens/GradesScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import { COURSES, DEFAULT_REGISTERED } from "./src/data/mockData";

const TABS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "grades", label: "Grades" },
  { key: "registration", label: "Register" },
  { key: "settings", label: "Settings" },
];

function AppShell() {
  const { colors, scheme } = useSettings();
  const [activeView, setActiveView] = useState("dashboard");
  const [courses, setCourses] = useState(COURSES);
  const [registeredIds, setRegisteredIds] = useState(DEFAULT_REGISTERED);

  const onToggle = (courseId) => {
    setRegisteredIds((prev) => (prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]));
  };

  const onUpdateScore = (courseId, categoryId, itemId, newScore, isWhatIf) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id !== courseId) return course;
        return {
          ...course,
          categories: course.categories.map((cat) => {
            if (cat.id !== categoryId) return cat;
            if (isWhatIf) {
              return { ...cat, items: [{ id: "whatif", name: "What-if score", score: newScore, max: 100 }] };
            }
            return { ...cat, items: cat.items.map((item) => (item.id === itemId ? { ...item, score: newScore } : item)) };
          }),
        };
      })
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={scheme === "dark" ? "light-content" : "dark-content"} />
      <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 }}>
        <Text style={{ color: colors.text, fontSize: 20, fontWeight: "800" }}>Student Hub</Text>
        <Text style={{ color: colors.subtext, fontSize: 12 }}>Grades, registration & timetable</Text>
      </View>

      <TopTabs tabs={TABS} active={activeView} onChange={setActiveView} />

      <View style={{ flex: 1 }}>
        {activeView === "dashboard" && <DashboardScreen courses={courses} registeredIds={registeredIds} />}
        {activeView === "grades" && <GradesScreen courses={courses} registeredIds={registeredIds} onUpdateScore={onUpdateScore} />}
        {activeView === "registration" && (
          <RegistrationScreen courses={courses} registeredIds={registeredIds} onToggle={onToggle} />
        )}
        {activeView === "settings" && <SettingsScreen />}
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <AppShell />
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
