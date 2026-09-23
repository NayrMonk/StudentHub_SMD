import React from "react";
import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
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

function ProfileField({ label, value, onChangeText, placeholder, colors, scale }) {
  return (
    <View style={{ marginBottom: 10 * scale.spacing }}>
      <Text style={{ color: colors.subtext, fontSize: 11 * scale.font, marginBottom: 4 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.subtext}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 8,
          paddingHorizontal: 10,
          paddingVertical: 8 * scale.spacing,
          color: colors.text,
          fontSize: 13 * scale.font,
        }}
      />
    </View>
  );
}

export default function SettingsScreen() {
  const { colors, scale, themeChoice, setThemeChoice, density, setDensity, profile, setProfile, storageError } = useSettings();

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {storageError ? (
        <Card style={{ borderColor: colors.warning }}>
          <Text style={{ color: colors.warning, fontSize: 12 * scale.font, fontWeight: "600" }}>
            Preferences couldn't be saved to device storage ({storageError}). Your choices still work for this session.
          </Text>
        </Card>
      ) : null}

      <Card>
        <Text style={{ color: colors.text, fontSize: 15 * scale.font, fontWeight: "700", marginBottom: 4 }}>Who's using this</Text>
        <Text style={{ color: colors.subtext, fontSize: 12 * scale.font, marginBottom: 12 }}>
          Shown on your dashboard. Stored on this device only.
        </Text>
        <ProfileField
          label="Name"
          value={profile.name}
          onChangeText={(name) => setProfile((p) => ({ ...p, name }))}
          placeholder="e.g. Ayesha Khan"
          colors={colors}
          scale={scale}
        />
        <ProfileField
          label="Student ID"
          value={profile.studentId}
          onChangeText={(studentId) => setProfile((p) => ({ ...p, studentId }))}
          placeholder="e.g. 22F-1234"
          colors={colors}
          scale={scale}
        />
        <ProfileField
          label="Program"
          value={profile.program}
          onChangeText={(program) => setProfile((p) => ({ ...p, program }))}
          placeholder="e.g. BS Computer Science"
          colors={colors}
          scale={scale}
        />
      </Card>

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
