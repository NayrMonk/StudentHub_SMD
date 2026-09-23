import React from "react";
import { View, Text } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { useSettings } from "../context/SettingsContext";

// Ring progress chart (react-native-chart-kit) showing a 0-5 rating as a fraction.
export default function RatingRing({ rating, size = 90, label }) {
  const { colors } = useSettings();
  const fraction = Math.max(0, Math.min(1, rating / 5));

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ width: size, height: size }}>
        <ProgressChart
          data={{ data: [fraction] }}
          width={size}
          height={size}
          strokeWidth={10}
          radius={size / 2 - 12}
          hideLegend
          chartConfig={{
            backgroundGradientFrom: colors.surface,
            backgroundGradientTo: colors.surface,
            color: (opacity = 1) => colors.primary,
          }}
        />
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: colors.text, fontWeight: "700", fontSize: 16 }}>{rating.toFixed(1)}</Text>
          <Text style={{ color: colors.subtext, fontSize: 10 }}>/ 5</Text>
        </View>
      </View>
      {label ? <Text style={{ color: colors.subtext, fontSize: 12, marginTop: 6 }}>{label}</Text> : null}
    </View>
  );
}
