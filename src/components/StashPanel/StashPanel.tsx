"use client";

import { useState, useCallback, useEffect } from "react";
import { Item } from "@/src/data/items";
import { exampleItems } from "@/src/data/items";
import ItemCard from "@/src/components/ItemCard";
import { useDragDrop } from "@/src/hooks/useDragDrop";

const STASH_COLS = 6;
const STASH_ROWS = 20; // Scrollable
const TOTAL_STASH_SLOTS = STASH_COLS * STASH_ROWS;

export default function StashPanel() {
  const [stash, setStash] = useState<(Item | null)[]>(
    new Array(TOTAL_STASH_SLOTS).fill(null)
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [currentCount, setCurrentCount] = useState(37);
  const maxCount = 64;

  const { onDragStart, onDragEnd, onDrop, onDragOver } = useDragDrop();

  // Initialize with example items
  useEffect(() => {
    const initialStash = new Array(TOTAL_STASH_SLOTS).fill(null);
    exampleItems.forEach((item, idx) => {
      if (idx < TOTAL_STASH_SLOTS) {
        initialStash[idx] = item;
      }
    });
    setStash(initialStash);
  }, []);

  const handleDragStart = useCallback(
    (index: number, item: Item) => (e: React.DragEvent) => {
      setDraggingIndex(index);
      onDragStart(item, "stash")(e);
    },
    [onDragStart]
  );

  const handleDragEnd = useCallback(
    (e: React.DragEvent) => {
      setDraggingIndex(null);
      onDragEnd();
    },
    [onDragEnd]
  );

  const handleDrop = useCallback(
    (index: number) => (e: React.DragEvent) => {
      e.preventDefault();
      const result = onDrop("stash")(e);
      if (result) {
        const newStash = [...stash];
        newStash[index] = result.item;
        setStash(newStash);
      }
    },
    [stash, onDrop]
  );

  const handleClick = useCallback((index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  }, [selectedIndex]);

  return (
    <div className="w-[30%] bg-panel-bg rounded-panel p-6 flex flex-col relative">
      {/* Icon Bar on Left */}
      <div className="absolute left-2 top-32 flex flex-col items-center gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-full bg-icon-bg flex items-center justify-center"
          >
            <div className="w-4 h-4 bg-text-icon rounded"></div>
          </div>
        ))}
      </div>

      <div className="ml-14">
        {/* Title Row */}
        <div className="mb-4">
          <h2 className="text-[14px] font-[900] text-text-title uppercase tracking-caps mb-1">
            STASH
          </h2>
          <div className="text-[11px] font-[700] text-text-small">
            {currentCount}/{maxCount}
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="mb-4">
          <div className="h-[38px] w-full bg-slot-bg border border-border-default rounded-slot flex items-center justify-between px-3">
            <span className="text-[12px] font-[800] text-text-subtitle uppercase tracking-caps">
              CATEGORY
            </span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-text-icon rounded"></div>
              <div className="w-4 h-4 bg-text-icon rounded"></div>
            </div>
          </div>
        </div>

        {/* Stash Grid */}
        <div
          className="grid gap-1.5 overflow-y-auto pr-2"
          style={{
            gridTemplateColumns: `repeat(${STASH_COLS}, 64px)`,
            gap: "6px",
            maxHeight: "calc(100vh - 200px)",
          }}
          onDragOver={onDragOver}
        >
          {stash.map((item, index) => (
            <div
              key={index}
              onDrop={handleDrop(index)}
              onDragOver={onDragOver}
              style={{
                opacity: draggingIndex !== null && draggingIndex !== index ? 0.6 : 1,
              }}
            >
              <ItemCard
                item={item}
                isSelected={selectedIndex === index}
                isDragging={draggingIndex === index}
                size={64}
                onClick={() => handleClick(index)}
                onDragStart={item ? handleDragStart(index, item) : undefined}
                onDragEnd={handleDragEnd}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
