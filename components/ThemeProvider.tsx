"use client";

import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { DEFAULT_ACCENT } from "@/lib/accent";
import { DEFAULT_FONT, type FontId } from "@/lib/fonts";

interface ThemeContextValue {
  accent: string;
  setAccent: (hex: string) => void;
  font: FontId;
  setFont: (id: FontId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  accent: DEFAULT_ACCENT,
  setAccent: () => {},
  font: DEFAULT_FONT,
  setFont: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccent] = useLocalStorage("daze-accent", DEFAULT_ACCENT);
  const [font, setFont] = useLocalStorage<FontId>("daze-font", DEFAULT_FONT);

  useEffect(() => {
    document.documentElement.style.setProperty("--theme-accent", accent);
  }, [accent]);

  return (
    <ThemeContext.Provider value={{ accent, setAccent, font, setFont }}>
      {children}
    </ThemeContext.Provider>
  );
}
