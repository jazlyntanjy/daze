"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEntries } from "@/hooks/useEntries";
import {
  toDateString,
  todayString,
  getDaysInMonth,
  getFirstDayOfWeek,
  formatMonthYear,
} from "@/lib/dates";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function CalendarGrid() {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const { getAllEntries, getStreak } = useEntries();
  const router = useRouter();

  const todayStr = todayString();
  const entries = getAllEntries();
  const streak = getStreak();

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);
  const cells: (number | null)[] = [
    ...Array<null>(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function navMonth(dir: 1 | -1) {
    setViewMonth((m) => {
      const next = m + dir;
      if (next < 0) { setViewYear((y) => y - 1); return 11; }
      if (next > 11) { setViewYear((y) => y + 1); return 0; }
      return next;
    });
  }

  return (
    <main className="flex flex-col px-5 pt-6 pb-4 max-w-sm mx-auto w-full">
      {/* Streak */}
      <div className="h-6 mb-4">
        {streak > 0 && (
          <span className="text-sm" style={{ color: "var(--theme-muted)" }}>
            🔥 {streak} day streak
          </span>
        )}
      </div>

      {/* Month nav */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => navMonth(-1)}
          className="p-1 rounded-lg"
          style={{ color: "var(--theme-muted)" }}
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium" style={{ color: "var(--theme-text)" }}>
            {formatMonthYear(viewYear, viewMonth)}
          </span>
          <button
            onClick={() => {
              setViewYear(now.getFullYear());
              setViewMonth(now.getMonth());
            }}
            className="text-[10px] px-2 py-0.5 rounded-full"
            style={{
              color: "var(--theme-accent)",
              border: "1px solid var(--theme-accent)",
            }}
          >
            today
          </button>
        </div>

        <button
          onClick={() => navMonth(1)}
          className="p-1 rounded-lg"
          style={{ color: "var(--theme-muted)" }}
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] uppercase tracking-wider py-1"
            style={{ color: "var(--theme-muted)" }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;

          const dateStr = toDateString(new Date(viewYear, viewMonth, day));
          const isFuture = dateStr > todayStr;
          const isToday = dateStr === todayStr;
          const hasEntry = !!entries[dateStr]?.text?.trim();

          return (
            <button
              key={dateStr}
              onClick={() => router.push(`/today?date=${dateStr}`)}
              disabled={isFuture}
              className="flex flex-col items-center py-2 rounded-xl transition-colors duration-100 active:opacity-60"
              style={{ opacity: isFuture ? 0.2 : 1 }}
            >
              <span
                className="text-sm leading-none"
                style={{
                  color: isToday ? "var(--theme-accent)" : "var(--theme-text)",
                  fontWeight: isToday ? 600 : 400,
                }}
              >
                {day}
              </span>
              <span
                className="mt-1.5 w-1 h-1 rounded-full"
                style={{
                  backgroundColor: hasEntry
                    ? "var(--theme-accent)"
                    : "transparent",
                }}
              />
            </button>
          );
        })}
      </div>
    </main>
  );
}
