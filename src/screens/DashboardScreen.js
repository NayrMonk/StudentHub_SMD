import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import Card from "../components/Card";
import RatingRing from "../components/RatingRing";
import { useSettings } from "../context/SettingsContext";
import { computeFinalPercent } from "../utils/grades";
import { PROFESSORS, GPA_HISTORY, avgRating } from "../data/mockData";

const screenWidth = Dimensions.get("window").width - 32;

export default function DashboardScreen({ courses, registeredIds }) {
  const { colors, scale } = useSettings();
  const registered = courses.filter((c) => registeredIds.includes(c.id));

  const chartConfig = {
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => colors.primary,
    labelColor: (opacity = 1) => colors.subtext,
    propsForBackgroundLines: { stroke: colors.border },
  };

  if (registered.length === 0) {
    return (
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Card>
          <Text style={{ color: colors.text, fontSize: 15 * scale.font, fontWeight: "600" }}>No courses registered yet</Text>
          <Text style={{ color: colors.subtext, fontSize: 13 * scale.font, marginTop: 4 }}>
            Register for courses in the Registration tab to see your dashboard.
          </Text>
        </Card>
      </ScrollView>
    );
  }

  const barData = {
    labels: registered.map((c) => c.code),
    datasets: [{ data: registered.map((c) => Math.round(computeFinalPercent(c.categories) ?? 0)) }],
  };

  const lineData = {
    labels: GPA_HISTORY.map((h) => h.term.split(" ")[0]),
    datasets: [{ data: GPA_HISTORY.map((h) => h.gpa) }],
  };

  const avgProfRating =
    registered.reduce((acc, c) => {
      const prof = PROFESSORS.find((p) => p.id === c.professorId);
      return acc + (prof ? avgRating(prof) : 0);
    }, 0) / registered.length;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Card>
        <Text style={{ color: colors.text, fontSize: 15 * scale.font, fontWeight: "700", marginBottom: 8 }}>Current grades by course</Text>
        <BarChart
          data={barData}
          width={screenWidth}
          height={200}
          fromZero
          yAxisSuffix="%"
          chartConfig={chartConfig}
          style={{ borderRadius: 12 }}
        />
      </Card>

      <Card>
        <Text style={{ color: colors.text, fontSize: 15 * scale.font, fontWeight: "700", marginBottom: 8 }}>GPA trend</Text>
        <LineChart
          data={lineData}
          width={screenWidth}
          height={180}
          chartConfig={chartConfig}
          bezier
          style={{ borderRadius: 12 }}
        />
      </Card>

      <Card style={{ alignItems: "center" }}>
        <Text style={{ color: colors.text, fontSize: 15 * scale.font, fontWeight: "700", marginBottom: 8, alignSelf: "flex-start" }}>
          Average professor rating (your courses)
        </Text>
        <RatingRing rating={avgProfRating} size={110} />
      </Card>
    </ScrollView>
  );
}
