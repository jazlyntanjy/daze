export const MOODS = [
  { emoji: "😢", color: "#7dd3fc" },
  { emoji: "😐", color: "#94a3b8" },
  { emoji: "🙂", color: "#86efac" },
  { emoji: "😊", color: "#fde047" },
  { emoji: "🤩", color: "#f9a8d4" },
] as const;

export type MoodEmoji = (typeof MOODS)[number]["emoji"];

export function getMoodColor(mood: string | null): string {
  return MOODS.find((m) => m.emoji === mood)?.color ?? "#a78bfa";
}
