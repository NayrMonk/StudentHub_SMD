import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import ScoreInput from "../components/ScoreInput";
import { useSettings } from "../context/SettingsContext";
import { computeFinalPercent, letterFor, statusFor } from "../utils/grades";

export default function GradesScreen({ courses, registeredIds, onUpdateScore }) {
  const { colors, scale } = useSettings();
  const [expanded, setExpanded] = useState(null);
  const registered = courses.filter((c) => registeredIds.includes(c.id));

  if (registered.length === 0) {
    return (
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Card>
          <Text style={{ color: colors.text, fontSize: 15 * scale.font, fontWeight: "600" }}>No courses yet</Text>
          <Text style={{ color: colors.subtext, fontSize: 13 * scale.font, marginTop: 4 }}>
            Register for a course first to try the what-if grade calculator.
          </Text>
        </Card>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {registered.map((course) => {
        const percent = computeFinalPercent(course.categories);
        const status = statusFor(percent);
        const isOpen = expanded === course.id;
        return (
          <Card key={course.id}>
            <Pressable onPress={() => setExpanded(isOpen ? null : course.id)}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.text, fontSize: 15 * scale.font, fontWeight: "700" }}>
                    {course.code} — {course.name}
                  </Text>
                  <Text style={{ color: colors.subtext, fontSize: 12 * scale.font, marginTop: 2 }}>
                    {percent === null ? "Ungraded" : `${percent.toFixed(1)}% · ${letterFor(percent)}`}
                  </Text>
                </View>
                <StatusBadge status={status} />
              </View>
            </Pressable>

            {isOpen && (
              <View style={{ marginTop: 12, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 12 }}>
                {course.categories.map((cat) => (
                  <View key={cat.id} style={{ marginBottom: 12 * scale.spacing }}>
                    <Text style={{ color: colors.subtext, fontSize: 12 * scale.font, fontWeight: "600", marginBottom: 6 }}>
                      {cat.name} · {cat.weight}% of grade
                    </Text>
                    {cat.items.length === 0 ? (
                      <Text style={{ color: colors.subtext, fontSize: 12 * scale.font, fontStyle: "italic" }}>
                        Not graded yet — add a what-if score:
                      </Text>
                    ) : null}
                    {cat.items.length === 0 ? (
                      <ScoreInput
                        item={{ id: "whatif", name: "What-if score", score: 0 }}
                        max={100}
                        onChange={(val) => onUpdateScore(course.id, cat.id, "whatif", val, true)}
                      />
                    ) : (
                      cat.items.map((item) => (
                        <ScoreInput
                          key={item.id}
                          item={item}
                          max={item.max}
                          onChange={(val) => onUpdateScore(course.id, cat.id, item.id, val, false)}
                        />
                      ))
                    )}
                  </View>
                ))}
              </View>
            )}
          </Card>
        );
      })}
    </ScrollView>
  );
}
