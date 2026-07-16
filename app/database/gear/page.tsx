import { GearList } from "@/components/GearList";
import { getMergedGear } from "@/lib/data/roworlddb";

export default function GearPage() {
  return <GearList data={getMergedGear()} />;
}
