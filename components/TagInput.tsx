"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

const MAX_TAGS = 3;
const SUGGESTIONS = ["school", "friends", "feelings", "memories", "dreams", "gratitude"];

interface Props {
  tags: string[];
  onChange: (tags: string[]) => void;
  disabled?: boolean;
}

export function TagInput({ tags, onChange, disabled }: Props) {
  const [input, setInput] = useState("");

  function addTag(raw: string) {
    const tag = raw.trim().toLowerCase();
    if (!tag || tags.includes(tag) || tags.length >= MAX_TAGS) return;
    onChange([...tags, tag]);
    setInput("");
  }

  function removeTag(tag: string) {
    onChange(tags.filter((t) => t !== tag));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(input);
    }
  }

  const isFull = tags.length >= MAX_TAGS;
  const showSuggestions = tags.length === 0 && !disabled;
  const availableSuggestions = SUGGESTIONS.filter((s) => !tags.includes(s));

  return (
    <div className="mt-4 pt-4" style={{ borderTop: "1px solid color-mix(in srgb, var(--theme-text) 8%, transparent)" }}>
      <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: "var(--theme-muted)" }}>
        tags
      </p>

      <div className="flex flex-wrap gap-1.5">
        {/* Active chips */}
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
            style={{
              color: "var(--theme-accent)",
              border: "1px solid var(--theme-accent)",
              backgroundColor: "color-mix(in srgb, var(--theme-accent) 10%, transparent)",
            }}
          >
            {tag}
            {!disabled && (
              <button
                onClick={() => removeTag(tag)}
                className="opacity-60 hover:opacity-100 transition-opacity"
                aria-label={`Remove ${tag}`}
              >
                <X size={10} strokeWidth={2.5} />
              </button>
            )}
          </span>
        ))}

        {/* Input or max hint */}
        {!disabled && (
          isFull ? (
            <span className="text-xs self-center" style={{ color: "var(--theme-muted)" }}>
              max 3 tags
            </span>
          ) : (
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="add tag…"
              maxLength={20}
              className="bg-transparent outline-none text-xs placeholder:opacity-30 w-24"
              style={{ color: "var(--theme-text)" }}
            />
          )
        )}
      </div>

      {/* Suggestions */}
      {showSuggestions && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {availableSuggestions.map((s) => (
            <button
              key={s}
              onClick={() => addTag(s)}
              className="px-2.5 py-1 rounded-full text-xs transition-opacity hover:opacity-80 active:opacity-60"
              style={{
                color: "var(--theme-muted)",
                border: "1px dashed var(--theme-muted)",
                opacity: 0.6,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
