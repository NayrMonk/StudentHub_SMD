import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import Card from "../components/Card";
import { useSettings } from "../context/SettingsContext";

const THEME_OPTIONS = [
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
  { key: "system", label: "System" },
];

const DENSITY_OPTIONS = [
  { key: "compact", label: "Compact" },
  { key: "normal", label: "Normal" },
  { key: "spacious", label: "Spacious" },
];

function OptionRow({ options, value, onChange, colors, scale }) {
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      {options.map((opt) => {
        const active = opt.key === value;
        return (
          <Pressable
            key={opt.key}
            onPress={() => onChange(opt.key)}
            style={{
              flex: 1,
              paddingVertical: 10 * scale.spacing,
              borderRadius: 10,
              alignItems: "center",
              backgroundColor: active ? colors.primary : colors.surfaceAlt,
              borderWidth: 1,
              borderColor: active ? colors.primary : colors.border,
            }}
          >
            <Text style={{ color: active ? "#fff" : colors.text, fontWeight: "600", fontSize: 13 * scale.font }}>{opt.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function SettingsScreen() {
  const { colors, scale, themeChoice, setThemeChoice, density, setDensity } = useSettings();

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Card>
        <Text style={{ color: colors.text, fontSize: 15 * scale.font, fontWeight: "700", marginBottom: 4 }}>Appearance</Text>
        <Text style={{ color: colors.subtext, fontSize: 12 * scale.font, marginBottom: 12 }}>
          Choose light, dark, or match your device setting.
        </Text>
        <OptionRow options={THEME_OPTIONS} value={themeChoice} onChange={setThemeChoice} colors={colors} scale={scale} />
      </Card>

      <Card>
        <Text style={{ color: colors.text, fontSize: 15 * scale.font, fontWeight: "700", marginBottom: 4 }}>Layout density</Text>
        <Text style={{ color: colors.subtext, fontSize: 12 * scale.font, marginBottom: 12 }}>
          Adjust spacing and text size across the whole app.
        </Text>
        <OptionRow options={DENSITY_OPTIONS} value={density} onChange={setDensity} colors={colors} scale={scale} />
      </Card>
    </ScrollView>
  );
}
