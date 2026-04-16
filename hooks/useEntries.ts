"use client";

import { useLocalStorage } from "./useLocalStorage";
import { todayString, addDays } from "@/lib/dates";

export interface EntryData {
  text: string;
  mood: string | null;
  tags: string[];
}

export type EntriesStore = Record<string, EntryData>;

const EMPTY_STORE: EntriesStore = {};

export function useEntries() {
  const [entries, setEntries, isHydrated] = useLocalStorage<EntriesStore>(
    "daze-entries",
    EMPTY_STORE
  );

  function getEntry(date: string): EntryData | undefined {
    return entries[date];
  }

  function saveEntry(date: string, partial: Partial<EntryData>): void {
    const defaults: EntryData = { text: "", mood: null, tags: [] };
    setEntries((prev) => ({
      ...prev,
      [date]: { ...defaults, ...prev[date], ...partial },
    }));
  }

  function getAllEntries(): EntriesStore {
    return entries;
  }

  function getStreak(): number {
    let streak = 0;
    let current = todayString();
    for (let i = 0; i < 366; i++) {
      if (!entries[current]?.text?.trim()) break;
      streak++;
      current = addDays(current, -1);
    }
    return streak;
  }

  function getTagIndex(): Record<string, string[]> {
    const index: Record<string, string[]> = {};
    for (const [date, entry] of Object.entries(entries)) {
      for (const tag of entry.tags ?? []) {
        (index[tag] ??= []).push(date);
      }
    }
    return index;
  }

  return { getEntry, saveEntry, getAllEntries, getStreak, getTagIndex, isHydrated };
}
