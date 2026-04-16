"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useEntries } from "@/hooks/useEntries";
import { formatDisplayDate } from "@/lib/dates";

export function TagsView() {
  const { getTagIndex, getAllEntries } = useEntries();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const router = useRouter();

  const tagIndex = getTagIndex();
  const entries = getAllEntries();

  const sortedTags = Object.entries(tagIndex).sort((a, b) => b[1].length - a[1].length);

  if (selectedTag !== null) {
    const dates = (tagIndex[selectedTag] ?? []).slice().sort((a, b) => (a > b ? -1 : 1));

    return (
      <main className="flex flex-col px-5 pt-6 pb-4 max-w-sm mx-auto w-full">
        <button
          onClick={() => setSelectedTag(null)}
          className="flex items-center gap-1 mb-6 self-start"
          style={{ color: "var(--theme-muted)" }}
        >
          <ChevronLeft size={15} />
          <span className="text-sm">{selectedTag}</span>
        </button>

        <div className="flex flex-col gap-3">
          {dates.map((date) => {
            const entry = entries[date];
            if (!entry) return null;
            const preview = entry.text.slice(0, 50).trim();
            return (
              <button
                key={date}
                onClick={() => router.push(`/today?date=${date}`)}
                className="flex flex-col gap-1 text-left py-3 px-4 rounded-xl transition-opacity active:opacity-60"
                style={{ backgroundColor: "var(--theme-surface)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: "var(--theme-muted)" }}>
                    {formatDisplayDate(date)}
                  </span>
                  {entry.mood && <span className="text-xs">{entry.mood}</span>}
                </div>
                {preview && (
                  <p className="text-sm font-serif leading-snug" style={{ color: "var(--theme-text)" }}>
                    {preview}{entry.text.length > 50 ? "…" : ""}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col px-5 pt-6 pb-4 max-w-sm mx-auto w-full">
      <h1 className="font-serif text-2xl mb-6" style={{ color: "var(--theme-text)" }}>
        tags
      </h1>

      {sortedTags.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--theme-muted)" }}>
          no tags yet — add some to your entries
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {sortedTags.map(([tag, dates]) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className="flex items-center justify-between py-3 px-4 rounded-xl transition-opacity active:opacity-60 text-left"
              style={{ backgroundColor: "var(--theme-surface)" }}
            >
              <span
                className="text-sm px-2.5 py-0.5 rounded-full"
                style={{
                  color: "var(--theme-accent)",
                  border: "1px solid var(--theme-accent)",
                  backgroundColor: "color-mix(in srgb, var(--theme-accent) 10%, transparent)",
                }}
              >
                {tag}
              </span>
              <span className="text-xs" style={{ color: "var(--theme-muted)" }}>
                {dates.length}
              </span>
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
