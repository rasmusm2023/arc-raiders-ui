"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { Item } from "@/src/data/items";
import { exampleItems } from "@/src/data/items";
import EnhancedStashPanel from "./EnhancedStashPanel";
import EnhancedLoadoutPanel from "./EnhancedLoadoutPanel";
import EnhancedItemDetailsPanel from "./EnhancedItemDetailsPanel";

export type ItemCategory = "all" | "weapon" | "module" | "material" | "consumable";

export default function EnhancedInventory() {
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [stash, setStash] = useState<Item[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [lockedItems, setLockedItems] = useState<Set<string>>(new Set());
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Initialize stash
  useEffect(() => {
    setStash([...exampleItems, ...exampleItems.slice(0, 10)]);
  }, []);

  const filteredStash = useMemo(() => {
    return stash.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.type === selectedCategory;
      const matchesSearch = searchQuery === "" || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [stash, selectedCategory, searchQuery]);

  const toggleFavorite = useCallback((itemId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  }, []);

  const toggleLock = useCallback((itemId: string) => {
    setLockedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  }, []);

  return (
    <div className="relative z-10 flex gap-6 p-6">
        <EnhancedStashPanel
          items={filteredStash}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          lockedItems={lockedItems}
          onToggleLock={toggleLock}
          selectedItem={selectedItem}
          onItemSelect={setSelectedItem}
        />
      <EnhancedLoadoutPanel />
      <EnhancedItemDetailsPanel selectedItem={selectedItem} />
    </div>
  );
}

