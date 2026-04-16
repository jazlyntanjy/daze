export interface Theme {
  id: string;
  name: string;
  bg: string;
  surface: string;
  accent: string;
  text: string;
  muted: string;
}

export const themes: Theme[] = [
  {
    id: "midnight",
    name: "Midnight",
    bg: "#1a1a2e",
    surface: "#16213e",
    accent: "#a78bfa",
    text: "#e2e8f0",
    muted: "#64748b",
  },
  {
    id: "cream",
    name: "Cream",
    bg: "#faf6f0",
    surface: "#f0ece4",
    accent: "#92867a",
    text: "#2d2926",
    muted: "#9c8f85",
  },
  {
    id: "rose",
    name: "Rose",
    bg: "#1f0d14",
    surface: "#2d1020",
    accent: "#f9a8d4",
    text: "#fce7f3",
    muted: "#9f697f",
  },
  {
    id: "sage",
    name: "Sage",
    bg: "#0d1f17",
    surface: "#0f2b1e",
    accent: "#6ee7b7",
    text: "#d1fae5",
    muted: "#4a7a62",
  },
  {
    id: "mono",
    name: "Mono",
    bg: "#0d1a2e",
    surface: "#0f2040",
    accent: "#7dd3fc",
    text: "#e0f2fe",
    muted: "#4a6a8a",
  },
];

export const defaultTheme = themes[0];
