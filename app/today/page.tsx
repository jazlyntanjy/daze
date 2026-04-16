import { EntryEditor } from "@/components/EntryEditor";

export default async function TodayPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { date } = await searchParams;
  return <EntryEditor date={date} />;
}
