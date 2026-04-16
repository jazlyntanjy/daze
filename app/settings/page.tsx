"use client";

import { useTheme } from "@/components/ThemeProvider";

export default function SettingsPage() {
  const { theme, setThemeId, themes } = useTheme();

  return (
    <main className="flex flex-col px-6 py-10 max-w-md mx-auto">
      <h1 className="font-serif text-2xl mb-8" style={{ color: "var(--theme-text)" }}>
        settings
      </h1>

      <section>
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--theme-muted)" }}>
          theme
        </p>
        <div className="flex flex-col gap-3">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setThemeId(t.id)}
              className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-150"
              style={{
                backgroundColor: theme.id === t.id ? "var(--theme-surface)" : "transparent",
                border: `1px solid ${theme.id === t.id ? "var(--theme-accent)" : "color-mix(in srgb, var(--theme-text) 10%, transparent)"}`,
              }}
            >
              <span
                className="w-5 h-5 rounded-full flex-shrink-0"
                style={{ backgroundColor: t.accent }}
              />
              <span className="text-sm" style={{ color: "var(--theme-text)" }}>
                {t.name}
              </span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
