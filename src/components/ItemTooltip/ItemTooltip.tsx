"use client";

import { Item } from "@/src/data/items";
import { rarityColors } from "@/src/data/rarities";
import { motion } from "framer-motion";

interface ItemTooltipProps {
  item: Item;
  x: number;
  y: number;
}

export default function ItemTooltip({ item, x, y }: ItemTooltipProps) {
  const rarityColor = rarityColors[item.rarity];

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      style={{
        left: `${x + 12}px`,
        top: `${y + 12}px`,
      }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div
        className="bg-panel border p-3 min-w-[200px]"
        style={{
          borderColor: rarityColor,
          borderWidth: "1px",
          borderRadius: "0px",
        }}
      >
        {/* Item Name */}
        <div
          className="text-[16px] font-[800] mb-1 uppercase"
          style={{
            color: rarityColor,
            fontFamily: "Rajdhani, sans-serif",
            letterSpacing: "0.25px",
          }}
        >
          {item.name}
        </div>

        {/* Item Type */}
        <div
          className="text-[12px] text-text-secondary mb-2 uppercase tracking-[0.5px] font-[600]"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          {item.type}
        </div>

        {/* Description */}
        <div
          className="text-[13px] text-text-primary mb-2 font-[700] tracking-[0.25px]"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          {item.description}
        </div>

        {/* Stats Preview */}
        {Object.keys(item.stats).length > 0 && (
          <div className="mt-2 pt-2 border-t border-stroke">
            {Object.entries(item.stats).map(([stat, value]) => (
              <div
                key={stat}
                className="flex justify-between text-[12px] text-text-secondary mb-1 uppercase tracking-[0.5px] font-[600]"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                <span>{stat.replace(/([A-Z])/g, " $1").trim()}</span>
                <span className="text-text-primary">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
