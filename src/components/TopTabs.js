import React from "react";
import { View, Text, Pressable } from "react-native";
import { useSettings } from "../context/SettingsContext";

// Top segmented view-switcher (state-driven, no navigation library — per assignment rules).
export default function TopTabs({ tabs, active, onChange }) {
  const { colors, scale } = useSettings();
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: colors.surfaceAlt,
        borderRadius: 12,
        padding: 4,
        marginHorizontal: 16,
        marginBottom: 8 * scale.spacing,
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={{
              flex: 1,
              paddingVertical: 8 * scale.spacing,
              borderRadius: 9,
              backgroundColor: isActive ? colors.primary : "transparent",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: isActive ? "#FFFFFF" : colors.subtext,
                fontSize: 13 * scale.font,
                fontWeight: isActive ? "700" : "500",
              }}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
