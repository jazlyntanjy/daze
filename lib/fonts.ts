export const FONTS = [
  { id: "serif", label: "Serif", css: "var(--font-lora), Georgia, serif" },
  { id: "sans",  label: "Sans",  css: "var(--font-geist), system-ui, sans-serif" },
  { id: "mono",  label: "Mono",  css: "var(--font-jetbrains), monospace" },
] as const;

export type FontId = (typeof FONTS)[number]["id"];
export const DEFAULT_FONT: FontId = "serif";
