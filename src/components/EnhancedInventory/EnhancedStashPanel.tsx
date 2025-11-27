"use client";

import { useState, useCallback, useMemo } from "react";
import { Item } from "@/src/data/items";
import { rarityColors } from "@/src/data/rarities";
import EnhancedItemCard from "./EnhancedItemCard";
import { ItemCategory } from "./EnhancedInventory";
import { motion, AnimatePresence } from "framer-motion";

interface EnhancedStashPanelProps {
  items: Item[];
  selectedCategory: ItemCategory;
  onCategoryChange: (category: ItemCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  favorites: Set<string>;
  onToggleFavorite: (itemId: string) => void;
  lockedItems: Set<string>;
  onToggleLock: (itemId: string) => void;
}

const categories: { value: ItemCategory; label: string; icon: string }[] = [
  { value: "all", label: "ALL", icon: "📦" },
  { value: "weapon", label: "WEAPONS", icon: "🔫" },
  { value: "module", label: "MODULES", icon: "⚙️" },
  { value: "material", label: "MATERIALS", icon: "💎" },
  { value: "consumable", label: "CONSUMABLES", icon: "💉" },
];

export default function EnhancedStashPanel({
  items,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  favorites,
  onToggleFavorite,
  lockedItems,
  onToggleLock,
  selectedItem,
  onItemSelect,
}: EnhancedStashPanelProps) {
  const [sortBy, setSortBy] = useState<"name" | "rarity" | "newest">("rarity");

  const sortedItems = useMemo(() => {
    const sorted = [...items];
    switch (sortBy) {
      case "rarity":
        const rarityOrder = { exotic: 0, legendary: 1, epic: 2, rare: 3, uncommon: 4, common: 5 };
        return sorted.sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]);
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "newest":
        return sorted.reverse();
      default:
        return sorted;
    }
  }, [items, sortBy]);

  const favoriteItems = useMemo(() => {
    return sortedItems.filter((item) => favorites.has(item.id));
  }, [sortedItems, favorites]);

  return (
    <div className="w-[35%] bg-panel-bg rounded-panel p-6 flex flex-col relative overflow-hidden">
      {/* Holographic glow effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rarity-rare to-transparent opacity-50" />

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] font-[900] text-text-title uppercase tracking-caps">
            STASH
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`px-3 py-1.5 rounded-slot text-[12px] font-[800] transition-all ${
                viewMode === "grid"
                  ? "bg-rarity-rare/20 text-rarity-rare border border-rarity-rare"
                  : "bg-slot-bg text-text-small border border-border-default"
              }`}
            >
              GRID
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`px-3 py-1.5 rounded-slot text-[12px] font-[800] transition-all ${
                viewMode === "list"
                  ? "bg-rarity-rare/20 text-rarity-rare border border-rarity-rare"
                  : "bg-slot-bg text-text-small border border-border-default"
              }`}
            >
              LIST
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search items..."
            className="w-full h-10 bg-slot-bg border border-border-default rounded-slot px-4 pr-10 text-text-title text-[13px] font-[700] placeholder:text-text-small focus:outline-none focus:border-rarity-rare transition-colors"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-small">
            🔍
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={`px-4 py-2 rounded-slot text-[11px] font-[800] uppercase tracking-caps whitespace-nowrap transition-all ${
                selectedCategory === cat.value
                  ? "bg-rarity-rare/30 text-rarity-rare border-2 border-rarity-rare"
                  : "bg-slot-bg text-text-small border border-border-default hover:border-border-hover"
              }`}
            >
              <span className="mr-1.5">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort & Stats */}
        <div className="flex items-center justify-between text-[11px] font-[700] text-text-small">
          <div className="flex items-center gap-2">
            <span>SORT:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slot-bg border border-border-default rounded-slot px-2 py-1 text-text-title focus:outline-none focus:border-rarity-rare"
            >
              <option value="rarity">RARITY</option>
              <option value="name">NAME</option>
              <option value="newest">NEWEST</option>
            </select>
          </div>
          <div>
            {items.length} {items.length === 1 ? "ITEM" : "ITEMS"}
          </div>
        </div>
      </div>

      {/* Favorites Section (if any) */}
      {favoriteItems.length > 0 && (
        <div className="mb-4">
          <div className="text-[12px] font-[800] text-text-subtitle uppercase tracking-caps mb-2 flex items-center gap-2">
            <span>⭐</span> FAVORITES
          </div>
          <div className="grid grid-cols-6 gap-2">
            {favoriteItems.slice(0, 6).map((item) => (
              <EnhancedItemCard
                key={item.id}
                item={item}
                size={64}
                isFavorite={favorites.has(item.id)}
                isLocked={lockedItems.has(item.id)}
                onToggleFavorite={() => onToggleFavorite(item.id)}
                onToggleLock={() => onToggleLock(item.id)}
                onClick={() => onItemSelect(item)}
                isSelected={selectedItem?.id === item.id}
              />
            ))}
          </div>
        </div>
      )}

      {/* Items Grid/List */}
      <div className="flex-1 overflow-y-auto pr-2">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-6 gap-2"
                : "flex flex-col gap-2"
            }
          >
            {sortedItems.map((item) => (
              <EnhancedItemCard
                key={item.id}
                item={item}
                size={viewMode === "grid" ? 64 : undefined}
                viewMode={viewMode}
                isFavorite={favorites.has(item.id)}
                isLocked={lockedItems.has(item.id)}
                onToggleFavorite={() => onToggleFavorite(item.id)}
                onToggleLock={() => onToggleLock(item.id)}
                onClick={() => onItemSelect(item)}
                isSelected={selectedItem?.id === item.id}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

