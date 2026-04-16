export default function TagsPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-full px-6 py-12">
      <h1 className="font-serif text-2xl" style={{ color: "var(--theme-text)" }}>
        tags
      </h1>
      <p className="mt-2 text-sm" style={{ color: "var(--theme-muted)" }}>
        browse entries by mood or category.
      </p>
    </main>
  );
}
