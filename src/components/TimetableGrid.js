import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useSettings } from "../context/SettingsContext";
import { DAYS } from "../data/mockData";

const START_HOUR = 8;
const END_HOUR = 17;
const HOUR_HEIGHT = 44;

// Custom weekly schedule grid — chart-kit has no Gantt chart, so this is a plain
// data-driven layout component instead (positions blocks by day/start/end).
export default function TimetableGrid({ courses, onPressCourse }) {
  const { colors, scale } = useSettings();
  const hours = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i);

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: 44 }}>
        <View style={{ height: 24 }} />
        {hours.map((h) => (
          <View key={h} style={{ height: HOUR_HEIGHT * scale.spacing, justifyContent: "flex-start" }}>
            <Text style={{ color: colors.subtext, fontSize: 10 }}>{h}:00</Text>
          </View>
        ))}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row" }}>
          {DAYS.map((day, dayIndex) => (
            <View key={day} style={{ width: 90, marginRight: 4 }}>
              <Text style={{ color: colors.text, fontSize: 11, fontWeight: "700", textAlign: "center", height: 24 }}>{day}</Text>
              <View
                style={{
                  height: hours.length * HOUR_HEIGHT * scale.spacing,
                  backgroundColor: colors.surfaceAlt,
                  borderRadius: 8,
                  position: "relative",
                }}
              >
                {courses
                  .filter((c) => c.schedule.day === dayIndex)
                  .map((c) => {
                    const top = (c.schedule.start - START_HOUR) * HOUR_HEIGHT * scale.spacing;
                    const height = (c.schedule.end - c.schedule.start) * HOUR_HEIGHT * scale.spacing;
                    return (
                      <Pressable
                        key={c.id}
                        onPress={() => onPressCourse && onPressCourse(c)}
                        style={{
                          position: "absolute",
                          top,
                          height,
                          left: 3,
                          right: 3,
                          backgroundColor: c.conflict ? colors.danger : colors.primary,
                          borderRadius: 6,
                          padding: 4,
                        }}
                      >
                        <Text style={{ color: "#fff", fontSize: 10, fontWeight: "700" }} numberOfLines={1}>
                          {c.code}
                        </Text>
                      </Pressable>
                    );
                  })}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
