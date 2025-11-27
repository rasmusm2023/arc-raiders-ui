"use client";

import { Item } from "@/src/data/items";
import { rarityColors } from "@/src/data/rarities";
import { motion } from "framer-motion";

interface EnhancedItemDetailsPanelProps {
  selectedItem: Item | null;
}

export default function EnhancedItemDetailsPanel({
  selectedItem: item,
}: EnhancedItemDetailsPanelProps) {
  if (!item) {
    return (
      <motion.div
        className="w-[28%] bg-panel-bg rounded-panel p-6 flex items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-center">
          <div className="text-[48px] mb-4 opacity-20">📦</div>
          <div className="text-[14px] font-[800] text-text-subtitle uppercase tracking-caps">
            SELECT AN ITEM
          </div>
          <div className="text-[12px] font-[700] text-text-small mt-2">
            Click on any item to view details
          </div>
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
      className="w-[28%] bg-panel-bg rounded-panel p-6 flex flex-col relative overflow-hidden"
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Holographic glow effect */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-50"
        style={{
          background: `linear-gradient(to right, transparent, ${rarityColor}, transparent)`,
        }}
      />

      {/* Item Header */}
      <div className="mb-6">
        <div
          className="text-[20px] font-[900] uppercase tracking-caps mb-2"
          style={{ color: rarityColor }}
        >
          {item.name}
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="text-[12px] font-[800] text-text-subtitle uppercase">
            {item.type}
          </div>
          <div className="w-1 h-1 bg-text-small rounded-full" />
          <div
            className="text-[12px] font-[800] uppercase"
            style={{ color: rarityColor }}
          >
            {item.rarity}
          </div>
        </div>

        {/* Large Item Preview */}
        <div
          className="w-full h-48 bg-slot-bg border-2 rounded-slot flex items-center justify-center relative overflow-hidden mb-4"
          style={{
            borderColor: rarityColor,
            boxShadow: `0 0 24px ${rarityColor}40`,
          }}
        >
          {item.image ? (
            <div
              className="w-full h-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${item.image})` }}
            />
          ) : (
            <span className="text-text-small text-[14px]">ITEM PREVIEW</span>
          )}
          {/* Rarity glow */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at center, ${rarityColor}40 0%, transparent 70%)`,
            }}
          />
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <div className="text-[12px] font-[800] text-text-subtitle uppercase tracking-caps mb-2">
          DESCRIPTION
        </div>
        <div className="text-[13px] font-[700] text-text-title leading-relaxed">
          {item.description}
        </div>
      </div>

      {/* Stats */}
      {Object.keys(item.stats).length > 0 && (
        <div className="mb-6">
          <div className="text-[12px] font-[800] text-text-subtitle uppercase tracking-caps mb-3">
            STATISTICS
          </div>
          <div className="space-y-3">
            {Object.entries(item.stats).map(([stat, value]) => (
              <div key={stat}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-[800] text-text-small uppercase tracking-caps">
                    {stat.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <span className="text-[13px] font-[900] text-text-title">
                    {value}
                  </span>
                </div>
                <div className="w-full h-2 bg-border-default rounded">
                  <motion.div
                    className="h-full rounded"
                    style={{
                      backgroundColor: rarityColor,
                    }}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min((value / (maxStats[stat as keyof typeof maxStats] || 100)) * 100, 100)}%`,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-auto pt-4 border-t border-border-default">
        <div className="text-[12px] font-[800] text-text-subtitle uppercase tracking-caps mb-3">
          QUICK ACTIONS
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button className="px-4 py-2 bg-rarity-uncommon/20 text-rarity-uncommon border border-rarity-uncommon rounded-slot text-[11px] font-[800] uppercase hover:bg-rarity-uncommon/30 transition-colors">
            EQUIP
          </button>
          <button className="px-4 py-2 bg-slot-bg text-text-title border border-border-default rounded-slot text-[11px] font-[800] uppercase hover:border-border-hover transition-colors">
            COMPARE
          </button>
          <button className="px-4 py-2 bg-slot-bg text-text-title border border-border-default rounded-slot text-[11px] font-[800] uppercase hover:border-border-hover transition-colors">
            FAVORITE
          </button>
          <button className="px-4 py-2 bg-slot-bg text-text-title border border-border-default rounded-slot text-[11px] font-[800] uppercase hover:border-border-hover transition-colors">
            LOCK
          </button>
        </div>
      </div>
    </motion.div>
  );
}

