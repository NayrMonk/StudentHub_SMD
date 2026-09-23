import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import Card from "../components/Card";
import TimetableGrid from "../components/TimetableGrid";
import { useSettings } from "../context/SettingsContext";
import { PROFESSORS, avgRating, DAYS } from "../data/mockData";
import { timesOverlap } from "../utils/grades";

export default function RegistrationScreen({ courses, registeredIds, onToggle }) {
  const { colors, scale } = useSettings();
  const registered = courses.filter((c) => registeredIds.includes(c.id));

  const withConflicts = registered.map((c) => ({
    ...c,
    conflict: registered.some((other) => other.id !== c.id && timesOverlap(c.schedule, other.schedule)),
  }));
  const conflictIds = new Set(withConflicts.filter((c) => c.conflict).map((c) => c.id));

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Card>
        <Text style={{ color: colors.text, fontSize: 15 * scale.font, fontWeight: "700", marginBottom: 8 }}>Your timetable</Text>
        {registered.length === 0 ? (
          <Text style={{ color: colors.subtext, fontSize: 13 * scale.font }}>Register for a course below to build your schedule.</Text>
        ) : (
          <TimetableGrid courses={withConflicts} />
        )}
        {conflictIds.size > 0 && (
          <Text style={{ color: colors.danger, fontSize: 12 * scale.font, marginTop: 8 }}>
            Schedule conflict detected — some registered courses overlap.
          </Text>
        )}
      </Card>

      <Text style={{ color: colors.text, fontSize: 15 * scale.font, fontWeight: "700", marginVertical: 8 }}>Course catalog</Text>
      {courses.map((course) => {
        const professor = PROFESSORS.find((p) => p.id === course.professorId);
        const rating = professor ? avgRating(professor) : 0;
        const isRegistered = registeredIds.includes(course.id);
        const conflicts = isRegistered && conflictIds.has(course.id);

        return (
          <Card key={course.id}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.text, fontSize: 14 * scale.font, fontWeight: "700" }}>
                  {course.code} — {course.name}
                </Text>
                <Text style={{ color: colors.subtext, fontSize: 12 * scale.font, marginTop: 2 }}>
                  {professor?.name} · {professor?.department}
                </Text>
                <Text style={{ color: colors.subtext, fontSize: 12 * scale.font, marginTop: 2 }}>
                  {DAYS[course.schedule.day]} {course.schedule.start}:00–{course.schedule.end}:00 · {course.credits} cr
                </Text>
                <Text style={{ color: colors.primary, fontSize: 12 * scale.font, marginTop: 4, fontWeight: "600" }}>
                  ★ {rating.toFixed(1)} / 5 ({professor?.reviews.length} reviews)
                </Text>
                {conflicts && (
                  <Text style={{ color: colors.danger, fontSize: 11 * scale.font, marginTop: 4 }}>Conflicts with another registered course</Text>
                )}
              </View>
              <Pressable
                onPress={() => onToggle(course.id)}
                style={{
                  alignSelf: "flex-start",
                  paddingHorizontal: 12 * scale.spacing,
                  paddingVertical: 6 * scale.spacing,
                  borderRadius: 8,
                  backgroundColor: isRegistered ? colors.surfaceAlt : colors.primary,
                  borderWidth: isRegistered ? 1 : 0,
                  borderColor: colors.border,
                }}
              >
                <Text style={{ color: isRegistered ? colors.text : "#fff", fontSize: 12 * scale.font, fontWeight: "600" }}>
                  {isRegistered ? "Drop" : "Register"}
                </Text>
              </Pressable>
            </View>
          </Card>
        );
      })}
    </ScrollView>
  );
}
