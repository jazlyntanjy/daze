"use client";

import { MOODS } from "@/lib/mood";

interface Props {
  value: string | null;
  onChange: (mood: string | null) => void;
  disabled?: boolean;
}

export function MoodSelector({ value, onChange, disabled }: Props) {
  return (
    <div className="flex gap-2 mb-5">
      {MOODS.map(({ emoji, color }) => {
        const selected = value === emoji;
        return (
          <button
            key={emoji}
            onClick={() => onChange(selected ? null : emoji)}
            disabled={disabled}
            className="text-2xl w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-150 ease-out active:scale-95 disabled:opacity-30"
            style={
              selected
                ? {
                    transform: "scale(1.1)",
                    outline: `2px solid ${color}`,
                    outlineOffset: "1px",
                    backgroundColor: `${color}18`,
                  }
                : { transform: "scale(1)" }
            }
            aria-label={emoji}
            aria-pressed={selected}
          >
            {emoji}
          </button>
        );
      })}
    </div>
  );
}
