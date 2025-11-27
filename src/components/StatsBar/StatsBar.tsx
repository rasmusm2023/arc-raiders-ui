import { Rarity } from "@/src/data/rarities";
import { rarityColors } from "@/src/data/rarities";

interface StatsBarProps {
  label: string;
  value: number;
  max: number;
  rarity: Rarity;
}

export default function StatsBar({ label, value, max, rarity }: StatsBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const fillColor = rarityColors[rarity];

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="text-[12px] text-text-secondary uppercase tracking-[0.5px] font-[600]">
          {label}
        </span>
        <span className="text-[13px] text-text-primary font-[700] tracking-[0.25px]">
          {value}
        </span>
      </div>
      <div
        className="h-[6px] bg-stroke"
        style={{ borderRadius: "0px" }}
      >
        <div
          className="h-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: fillColor,
            borderRadius: "0px",
            transition: "width 0.2s cubic-bezier(0.25, 0.1, 0.25, 1.0)",
          }}
        />
      </div>
    </div>
  );
}
