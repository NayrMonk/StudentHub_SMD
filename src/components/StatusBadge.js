import React from "react";
import { View, Text } from "react-native";
import { useSettings } from "../context/SettingsContext";

const LABELS = { safe: "On track", warning: "At risk", danger: "Critical", empty: "No grades yet" };

export default function StatusBadge({ status }) {
  const { colors, scale } = useSettings();
  const color =
    status === "safe" ? colors.success : status === "warning" ? colors.warning : status === "danger" ? colors.danger : colors.subtext;

  return (
    <View
      style={{
        backgroundColor: color + "22",
        paddingHorizontal: 10 * scale.spacing,
        paddingVertical: 4 * scale.spacing,
        borderRadius: 8,
        alignSelf: "flex-start",
      }}
    >
      <Text style={{ color, fontSize: 12 * scale.font, fontWeight: "600" }}>{LABELS[status]}</Text>
    </View>
  );
}
