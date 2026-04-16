"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEntries } from "@/hooks/useEntries";
import { useTheme } from "@/components/ThemeProvider";
import { FONTS } from "@/lib/fonts";
import { formatDisplayDate, todayString, addDays } from "@/lib/dates";
import { MoodSelector } from "@/components/MoodSelector";
import { TagInput } from "@/components/TagInput";

export function EntryEditor({ date: dateProp }: { date?: string }) {
  const date = dateProp ?? todayString();
  const { getEntry, saveEntry, isHydrated } = useEntries();
  const { font } = useTheme();
  const fontCss = FONTS.find((f) => f.id === font)?.css ?? FONTS[0].css;
  const router = useRouter();

  const [text, setText] = useState("");
  const [mood, setMood] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  // Tracks which date's entry we've loaded, so typing doesn't re-initialize text
  const loadedForRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isHydrated) return;
    if (loadedForRef.current === date) return;
    const entry = getEntry(date);
    setText(entry?.text ?? "");
    setMood(entry?.mood ?? null);
    setTags(entry?.tags ?? []);
    loadedForRef.current = date;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, isHydrated]);

  function handleMoodChange(m: string | null) {
    setMood(m);
    saveEntry(date, { mood: m });
  }

  function handleTagsChange(t: string[]) {
    setTags(t);
    saveEntry(date, { tags: t });
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setText(value);
    saveEntry(date, { text: value });
  }

  const todayStr = todayString();
  const isFuture = date > todayStr;
  const prevDate = addDays(date, -1);
  const nextDate = addDays(date, 1);
  const canGoNext = nextDate <= todayStr;

  return (
    <main className="flex flex-col h-full px-5 pt-5 pb-4">
      {/* Day navigation */}
      <div className="flex items-center justify-between mb-1">
        <button
          onClick={() => router.push(`/today?date=${prevDate}`)}
          className="p-1 -ml-1"
          style={{ color: "var(--theme-muted)" }}
          aria-label="Previous day"
        >
          <ChevronLeft size={18} />
        </button>

        <span className="text-sm" style={{ color: "var(--theme-muted)" }}>
          {formatDisplayDate(date)}
        </span>

        <button
          onClick={() => router.push(`/today?date=${nextDate}`)}
          disabled={!canGoNext}
          className="p-1 -mr-1 transition-opacity"
          style={{
            color: "var(--theme-muted)",
            opacity: canGoNext ? 1 : 0.2,
          }}
          aria-label="Next day"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Back link */}
      <Link
        href="/calendar"
        className="text-[11px] mb-5 self-start"
        style={{ color: "var(--theme-muted)" }}
      >
        ← calendar
      </Link>

      {/* Mood selector */}
      <MoodSelector value={mood} onChange={handleMoodChange} disabled={isFuture} />

      {/* Textarea */}
      <textarea
        className="flex-1 w-full bg-transparent resize-none outline-none text-[17px] leading-relaxed min-h-[50vh] placeholder:opacity-40"
        style={{
          fontFamily: fontCss,
          color: isFuture ? "var(--theme-muted)" : "var(--theme-text)",
        }}
        placeholder={isFuture ? "" : "What's on your mind today?"}
        value={text}
        onChange={handleChange}
        readOnly={isFuture}
        autoFocus={!isFuture}
        spellCheck
      />

      {/* Footer */}
      <div className="flex justify-end mt-3">
        <span className="text-[11px]" style={{ color: "var(--theme-muted)" }}>
          {text.length} characters
        </span>
      </div>

      {/* Tags */}
      <TagInput tags={tags} onChange={handleTagsChange} disabled={isFuture} />
    </main>
  );
}
