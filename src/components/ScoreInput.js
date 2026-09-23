import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { useSettings } from "../context/SettingsContext";

// Editable "what-if" score field. Validates against max, shows inline feedback.
export default function ScoreInput({ item, max, onChange }) {
  const { colors, scale } = useSettings();
  const [draft, setDraft] = useState(String(item.score));
  const [error, setError] = useState(null);

  const commit = (text) => {
    setDraft(text);
    const num = parseFloat(text);
    if (text.trim() === "" || isNaN(num)) {
      setError("Enter a number");
      return;
    }
    if (num < 0 || num > max) {
      setError(`0 - ${max} only`);
      return;
    }
    setError(null);
    onChange(num);
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 * scale.spacing }}>
      <Text style={{ color: colors.text, fontSize: 13 * scale.font, flex: 1 }}>{item.name}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          value={draft}
          onChangeText={commit}
          keyboardType="numeric"
          style={{
            width: 56,
            borderWidth: 1,
            borderColor: error ? colors.danger : colors.border,
            borderRadius: 8,
            paddingVertical: 4 * scale.spacing,
            paddingHorizontal: 8,
            color: colors.text,
            fontSize: 13 * scale.font,
            textAlign: "center",
          }}
        />
        <Text style={{ color: colors.subtext, marginLeft: 6, fontSize: 13 * scale.font }}>/ {max}</Text>
      </View>
      {error ? <Text style={{ position: "absolute", right: 0, top: 26, color: colors.danger, fontSize: 10 }}>{error}</Text> : null}
    </View>
  );
}
