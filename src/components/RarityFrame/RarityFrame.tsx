import { Rarity } from "@/src/data/rarities";
import { rarityColors } from "@/src/data/rarities";

interface RarityFrameProps {
  rarity: Rarity;
  children: React.ReactNode;
  isSelected?: boolean;
  isDragging?: boolean;
  className?: string;
}

export default function RarityFrame({
  rarity,
  children,
  isSelected = false,
  isDragging = false,
  className = "",
}: RarityFrameProps) {
  const rarityColor = rarityColors[rarity];
  const borderColor = isDragging
    ? "#3A8FE6"
    : isSelected
    ? rarityColor
    : "#2A2D34";

  const glowStyle =
    isDragging
      ? { boxShadow: "0 0 8px rgba(58, 143, 230, 0.125)" }
      : isSelected
      ? { boxShadow: `0 0 8px ${rarityColor}33` }
      : {};

  return (
    <div
      className={`border ${className}`}
      style={{
        borderColor,
        borderWidth: "1px",
        borderRadius: "0px",
        ...glowStyle,
      }}
    >
      {children}
    </div>
  );
}
