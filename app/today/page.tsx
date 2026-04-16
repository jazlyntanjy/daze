export default function TodayPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-full px-6 py-12">
      <h1 className="font-serif text-2xl" style={{ color: "var(--theme-text)" }}>
        today
      </h1>
      <p className="mt-2 text-sm" style={{ color: "var(--theme-muted)" }}>
        What&apos;s on your mind today?
      </p>
    </main>
  );
}
