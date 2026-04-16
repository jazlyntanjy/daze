"use client";

import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { themes, defaultTheme, type Theme } from "@/lib/themes";

interface ThemeContextValue {
  theme: Theme;
  setThemeId: (id: string) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
  setThemeId: () => {},
  themes,
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useLocalStorage("daze-theme", defaultTheme.id);
  const theme = themes.find((t) => t.id === themeId) ?? defaultTheme;

  useEffect(() => {
    const el = document.documentElement;
    el.style.setProperty("--theme-bg", theme.bg);
    el.style.setProperty("--theme-surface", theme.surface);
    el.style.setProperty("--theme-accent", theme.accent);
    el.style.setProperty("--theme-text", theme.text);
    el.style.setProperty("--theme-muted", theme.muted);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setThemeId, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}
