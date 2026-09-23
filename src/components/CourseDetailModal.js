import React from "react";
import { Modal, View, Text, ScrollView, Pressable } from "react-native";
import RatingRing from "./RatingRing";
import { useSettings } from "../context/SettingsContext";
import { PROFESSORS, avgRating, DAYS } from "../data/mockData";
import { formatHour } from "../utils/grades";

// Full detail overlay for a course: professor, reviews, schedule, grading breakdown.
// Opened by tapping a course card in the catalog OR a block in the timetable grid.
export default function CourseDetailModal({ course, onClose }) {
  const { colors, scale } = useSettings();
  if (!course) return null;

  const professor = PROFESSORS.find((p) => p.id === course.professorId);
  const rating = professor ? avgRating(professor) : 0;

  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: "#00000066", justifyContent: "flex-end" }}>
        <Pressable style={{ flex: 1 }} onPress={onClose} />
        <View
          style={{
            backgroundColor: colors.surface,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: "82%",
            padding: 20 * scale.spacing,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.text, fontSize: 18 * scale.font, fontWeight: "800" }}>
                {course.code} — {course.name}
              </Text>
              <Text style={{ color: colors.subtext, fontSize: 12 * scale.font, marginTop: 2 }}>
                {DAYS[course.schedule.day]} {formatHour(course.schedule.start)}–{formatHour(course.schedule.end)} · {course.credits} credits
              </Text>
            </View>
            <Pressable onPress={onClose} hitSlop={10}>
              <Text style={{ color: colors.subtext, fontSize: 20 }}>✕</Text>
            </Pressable>
          </View>

          <ScrollView style={{ marginTop: 16 }} showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
              <RatingRing rating={rating} size={70} />
              <View style={{ marginLeft: 14, flex: 1 }}>
                <Text style={{ color: colors.text, fontSize: 15 * scale.font, fontWeight: "700" }}>{professor?.name}</Text>
                <Text style={{ color: colors.subtext, fontSize: 12 * scale.font }}>{professor?.department}</Text>
                <Text style={{ color: colors.subtext, fontSize: 12 * scale.font, marginTop: 2 }}>
                  {professor?.reviews.length} student review{professor?.reviews.length === 1 ? "" : "s"}
                </Text>
              </View>
            </View>

            <Text style={{ color: colors.text, fontSize: 13 * scale.font, fontWeight: "700", marginBottom: 8 }}>
              Grading breakdown
            </Text>
            {course.categories.map((cat) => (
              <View key={cat.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                <Text style={{ color: colors.subtext, fontSize: 12 * scale.font }}>{cat.name}</Text>
                <Text style={{ color: colors.text, fontSize: 12 * scale.font, fontWeight: "600" }}>{cat.weight}%</Text>
              </View>
            ))}

            <Text style={{ color: colors.text, fontSize: 13 * scale.font, fontWeight: "700", marginTop: 16, marginBottom: 8 }}>
              Student reviews
            </Text>
            {professor?.reviews.length ? (
              professor.reviews.map((r, i) => (
                <View
                  key={i}
                  style={{
                    backgroundColor: colors.surfaceAlt,
                    borderRadius: 10,
                    padding: 10 * scale.spacing,
                    marginBottom: 8,
                  }}
                >
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: colors.text, fontSize: 12 * scale.font, fontWeight: "700" }}>{r.author}</Text>
                    <Text style={{ color: colors.primary, fontSize: 12 * scale.font, fontWeight: "700" }}>★ {r.rating}</Text>
                  </View>
                  <Text style={{ color: colors.subtext, fontSize: 12 * scale.font, marginTop: 4 }}>{r.text}</Text>
                </View>
              ))
            ) : (
              <Text style={{ color: colors.subtext, fontSize: 12 * scale.font, fontStyle: "italic" }}>No reviews yet.</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
