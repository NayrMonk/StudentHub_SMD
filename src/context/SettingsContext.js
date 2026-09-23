import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "student-hub-settings";

const PALETTES = {
  light: {
    background: "#F7F8FA",
    surface: "#FFFFFF",
    surfaceAlt: "#F0F1F5",
    text: "#1C1E21",
    subtext: "#6B7280",
    border: "#E5E7EB",
    primary: "#4F46E5",
    success: "#16A34A",
    warning: "#D97706",
    danger: "#DC2626",
  },
  dark: {
    background: "#0F1115",
    surface: "#1A1D23",
    surfaceAlt: "#20242C",
    text: "#F3F4F6",
    subtext: "#9CA3AF",
    border: "#2A2E37",
    primary: "#818CF8",
    success: "#34D399",
    warning: "#FBBF24",
    danger: "#F87171",
  },
};

const DENSITY_SCALE = {
  compact: { spacing: 0.8, font: 0.92 },
  normal: { spacing: 1, font: 1 },
  spacious: { spacing: 1.25, font: 1.12 },
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const systemScheme = useColorScheme();
  const [themeChoice, setThemeChoice] = useState("system"); // 'light' | 'dark' | 'system'
  const [density, setDensity] = useState("normal"); // 'compact' | 'normal' | 'spacious'
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          const saved = JSON.parse(raw);
          if (saved.themeChoice) setThemeChoice(saved.themeChoice);
          if (saved.density) setDensity(saved.density);
        }
      })
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ themeChoice, density }));
  }, [themeChoice, density, loaded]);

  const resolvedScheme = themeChoice === "system" ? systemScheme || "light" : themeChoice;

  const value = useMemo(
    () => ({
      themeChoice,
      setThemeChoice,
      density,
      setDensity,
      scheme: resolvedScheme,
      colors: PALETTES[resolvedScheme],
      scale: DENSITY_SCALE[density],
    }),
    [themeChoice, density, resolvedScheme]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
