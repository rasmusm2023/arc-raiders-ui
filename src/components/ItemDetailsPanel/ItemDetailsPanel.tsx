"use client";

import { rarityColors } from "@/src/data/rarities";
import StatsBar from "@/src/components/StatsBar";
import { useInventory } from "@/src/contexts/InventoryContext";
import { motion } from "framer-motion";

export default function ItemDetailsPanel() {
  const { selectedItem: item } = useInventory();

  if (!item) {
    return (
      <motion.div
        className="w-[320px] bg-panel p-[24px] border border-stroke"
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="text-text-secondary text-[14px] font-[700] tracking-[0.25px]"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          SELECT AN ITEM TO VIEW DETAILS
        </div>
      </motion.div>
    );
  }

  const rarityColor = rarityColors[item.rarity];
  const maxStats = {
    damage: 200,
    fireRate: 1000,
    accuracy: 100,
    range: 1000,
    capacity: 200,
    reloadSpeed: 5,
  };

  return (
    <motion.div
      className="w-[320px] bg-bg-panel p-[24px] border border-stroke-primary"
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15 }}
    >
      {/* Item Name */}
      <div
        className="text-[16px] font-[800] mb-1 uppercase tracking-[0.25px]"
        style={{
          color: rarityColor,
          fontFamily: "Rajdhani, sans-serif",
        }}
      >
        {item.name}
      </div>

      {/* Item Type */}
      <div
        className="text-[12px] text-text-secondary mb-4 uppercase tracking-[0.5px] font-[600]"
        style={{ fontFamily: "Rajdhani, sans-serif" }}
      >
        {item.type}
      </div>

      {/* Description */}
      <div
        className="text-[13px] text-text-primary mb-6 font-[700] tracking-[0.25px]"
        style={{ fontFamily: "Rajdhani, sans-serif" }}
      >
        {item.description}
      </div>

      {/* Stats Section */}
      {Object.keys(item.stats).length > 0 && (
        <div className="space-y-3">
          <div
            className="text-[14px] font-[800] text-text-primary uppercase tracking-[0.25px] mb-3"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            STATS
          </div>
          {Object.entries(item.stats).map(([stat, value]) => (
            <StatsBar
              key={stat}
              label={stat
                .replace(/([A-Z])/g, " $1")
                .trim()
                .toUpperCase()}
              value={value}
              max={maxStats[stat as keyof typeof maxStats] || 100}
              rarity={item.rarity}
            />
          ))}
        </div>
      )}

      {/* Rarity Badge */}
      <div className="mt-6 pt-4 border-t border-stroke">
        <div
          className="text-[12px] text-text-secondary uppercase tracking-[0.5px] font-[600] mb-1"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          RARITY
        </div>
        <div
          className="text-[14px] font-[700] uppercase tracking-[0.25px]"
          style={{
            color: rarityColor,
            fontFamily: "Rajdhani, sans-serif",
          }}
        >
          {item.rarity.toUpperCase()}
        </div>
      </div>
    </motion.div>
  );
}
