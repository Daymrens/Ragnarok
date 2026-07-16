import { CardList } from "@/components/CardList";
import { getMergedCards } from "@/lib/data/roworlddb";

export default function CardsPage() {
  return <CardList data={getMergedCards()} />;
}
