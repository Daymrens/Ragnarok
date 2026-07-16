import { MonsterList } from "@/components/MonsterList";
import { getMergedMonsters } from "@/lib/data/roworlddb";

export default function MonstersPage() {
  return <MonsterList data={getMergedMonsters()} />;
}
