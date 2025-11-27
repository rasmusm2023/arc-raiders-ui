"use client";

import { useState, useCallback, useEffect } from "react";
import { Item } from "@/src/data/items";
import { exampleItems } from "@/src/data/items";
import ItemCard from "@/src/components/ItemCard";
import { useDragDrop } from "@/src/hooks/useDragDrop";

const QUICK_USE_SLOTS = 4;
const SAFE_POCKET_SLOTS = 1;

export default function QuickUsePanel() {
  const [quickUse, setQuickUse] = useState<(Item | null)[]>(
    new Array(QUICK_USE_SLOTS).fill(null)
  );
  const [safePocket, setSafePocket] = useState<(Item | null)[]>(
    new Array(SAFE_POCKET_SLOTS).fill(null)
  );
  const [quickUseCount, setQuickUseCount] = useState(3);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const { onDragStart, onDragEnd, onDrop, onDragOver } = useDragDrop();

  // Initialize with some items
  useEffect(() => {
    const initialQuickUse = new Array(QUICK_USE_SLOTS).fill(null);
    exampleItems.slice(0, 3).forEach((item, idx) => {
      if (idx < QUICK_USE_SLOTS) {
        initialQuickUse[idx] = item;
      }
    });
    setQuickUse(initialQuickUse);
  }, []);

  const handleDragStart = useCallback(
    (index: number, item: Item, type: "quickuse" | "safepocket") =>
      (e: React.DragEvent) => {
        setDraggingIndex(index);
        onDragStart(item, "loadout")(e);
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

  return (
    <div className="w-[320px] flex flex-col gap-8">
      {/* Quick Use Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[14px] font-[900] text-text-title uppercase tracking-caps">
            QUICK USE
          </h3>
          <div className="text-[11px] font-[700] text-text-small">
            {quickUseCount}/{QUICK_USE_SLOTS}
          </div>
        </div>
        <div
          className="flex gap-2.5"
          style={{ gap: "10px" }}
          onDragOver={onDragOver}
        >
          {quickUse.map((item, index) => (
            <div
              key={index}
              onDrop={(e) => {
                e.preventDefault();
                const result = onDrop("loadout")(e);
                if (result) {
                  const newQuickUse = [...quickUse];
                  newQuickUse[index] = result.item;
                  setQuickUse(newQuickUse);
                }
              }}
              onDragOver={onDragOver}
              style={{
                opacity: draggingIndex === index ? 0.6 : 1,
              }}
            >
              <ItemCard
                item={item}
                size={64}
                onDragStart={
                  item ? handleDragStart(index, item, "quickuse") : undefined
                }
                onDragEnd={handleDragEnd}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Safe Pocket Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[14px] font-[900] text-text-title uppercase tracking-caps">
            SAFE POCKET
          </h3>
          <div className="text-[11px] font-[700] text-text-small">
            {safePocket.filter((i) => i !== null).length}/{SAFE_POCKET_SLOTS}
          </div>
        </div>
        <div
          className="flex gap-2.5"
          style={{ gap: "10px" }}
          onDragOver={onDragOver}
        >
          {safePocket.map((item, index) => (
            <div
              key={index}
              onDrop={(e) => {
                e.preventDefault();
                const result = onDrop("loadout")(e);
                if (result) {
                  const newSafePocket = [...safePocket];
                  newSafePocket[index] = result.item;
                  setSafePocket(newSafePocket);
                }
              }}
              onDragOver={onDragOver}
              style={{
                opacity: draggingIndex === index ? 0.6 : 1,
              }}
            >
              <ItemCard
                item={item}
                size={64}
                onDragStart={
                  item ? handleDragStart(index, item, "safepocket") : undefined
                }
                onDragEnd={handleDragEnd}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

