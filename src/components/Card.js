import React from "react";
import { View } from "react-native";
import { useSettings } from "../context/SettingsContext";

export default function Card({ children, style }) {
  const { colors, scale } = useSettings();
  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: 14,
          padding: 16 * scale.spacing,
          borderWidth: 1,
          borderColor: colors.border,
          marginBottom: 12 * scale.spacing,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
