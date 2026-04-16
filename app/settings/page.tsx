"use client";

import { useTheme } from "@/components/ThemeProvider";
import { ACCENTS } from "@/lib/accent";
import { FONTS, type FontId } from "@/lib/fonts";
import { Check } from "lucide-react";

export default function SettingsPage() {
  const { accent, setAccent, font, setFont } = useTheme();

  return (
    <main className="flex flex-col px-5 pt-6 pb-4 max-w-sm mx-auto w-full">
      <h1 className="font-serif text-2xl mb-8" style={{ color: "var(--theme-text)" }}>
        settings
      </h1>

      {/* Accent color */}
      <section className="mb-8">
        <p className="text-[10px] uppercase tracking-widest mb-4" style={{ color: "var(--theme-muted)" }}>
          accent color
        </p>
        <div className="flex gap-3">
          {ACCENTS.map(({ id, color }) => {
            const selected = accent === color;
            return (
              <button
                key={id}
                onClick={() => setAccent(color)}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-150 active:scale-95"
                style={{
                  backgroundColor: color,
                  outline: selected ? "2px solid white" : "2px solid transparent",
                  outlineOffset: "2px",
                }}
                aria-label={id}
                aria-pressed={selected}
              >
                {selected && <Check size={14} strokeWidth={2.5} color="#1a1a2e" />}
              </button>
            );
          })}
        </div>
      </section>

      {/* Font */}
      <section>
        <p className="text-[10px] uppercase tracking-widest mb-4" style={{ color: "var(--theme-muted)" }}>
          font
        </p>
        <div className="flex gap-3">
          {FONTS.map(({ id, label, css }) => {
            const selected = font === id;
            return (
              <button
                key={id}
                onClick={() => setFont(id as FontId)}
                className="flex-1 flex flex-col gap-2 px-3 py-3 rounded-xl transition-all duration-150 text-left active:opacity-70"
                style={{
                  backgroundColor: "var(--theme-surface)",
                  border: `1px solid ${selected ? "var(--theme-accent)" : "transparent"}`,
                }}
              >
                <span
                  className="text-sm leading-snug line-clamp-2"
                  style={{
                    fontFamily: css,
                    color: "var(--theme-text)",
                  }}
                >
                  the quick brown fox
                </span>
                <span
                  className="text-[10px] uppercase tracking-wider"
                  style={{ color: selected ? "var(--theme-accent)" : "var(--theme-muted)" }}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
