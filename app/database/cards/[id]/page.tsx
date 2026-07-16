import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, SourceBadge } from "@/components/ui";
import { getMergedCard } from "@/lib/data/roworlddb";

export default async function CardDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = getMergedCard(id);
  if (!c) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/database/cards"
        className="text-sm text-gold-soft hover:underline"
      >
        &larr; Cards
      </Link>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gold">{c.name}</h1>
          <p className="text-sm text-foreground/60 mt-1">{c.slot} card</p>
        </div>
        <SourceBadge id={c.id} />
      </div>

      <Card>
        <h2 className="font-semibold text-gold-soft mb-3">Effect</h2>
        <p className="text-sm text-foreground/80">{c.effect || "No effect recorded."}</p>
        {c.source && (
          <p className="text-xs text-foreground/50 mt-3">Dropped by: {c.source}</p>
        )}
      </Card>
    </div>
  );
}
