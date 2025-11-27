"use client";

import { useState, useCallback, useEffect } from "react";
import { Item } from "@/src/data/items";
import { exampleItems } from "@/src/data/items";
import ItemCard from "@/src/components/ItemCard";
import ItemTooltip from "@/src/components/ItemTooltip";
import { useDragDrop } from "@/src/hooks/useDragDrop";
import { useInventory } from "@/src/contexts/InventoryContext";

const GRID_COLS = 8;
const GRID_ROWS = 6;
const TOTAL_SLOTS = GRID_COLS * GRID_ROWS;

export default function InventoryGrid() {
  const [inventory, setInventory] = useState<(Item | null)[]>(
    new Array(TOTAL_SLOTS).fill(null)
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{
    item: Item;
    x: number;
    y: number;
  } | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const { setSelectedItem } = useInventory();

  const { onDragStart, onDragEnd, onDrop, onDragOver } = useDragDrop();

  // Initialize with some example items
  useEffect(() => {
    const initialItems = new Array(TOTAL_SLOTS).fill(null);
    exampleItems.slice(0, 5).forEach((item, idx) => {
      initialItems[idx] = item;
    });
    setInventory(initialItems);
  }, []);

  const handleItemClick = useCallback(
    (index: number, item: Item) => {
      if (selectedIndex === index) {
        setSelectedIndex(null);
        setSelectedItem(null);
      } else {
        setSelectedIndex(index);
        setSelectedItem(item);
      }
    },
    [selectedIndex, setSelectedItem]
  );

  const handleMouseEnter = useCallback((item: Item, e: React.MouseEvent) => {
    setTooltip({
      item,
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (tooltip) {
      setTooltip({
        ...tooltip,
        x: e.clientX,
        y: e.clientY,
      });
    }
  }, [tooltip]);

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  const handleDragStart = useCallback(
    (index: number, item: Item) => (e: React.DragEvent) => {
      setDraggingIndex(index);
      onDragStart(item, "inventory")(e);
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
      const result = onDrop("inventory")(e);
      if (result) {
        const newInventory = [...inventory];
        newInventory[index] = result.item;
        setInventory(newInventory);
      }
    },
    [inventory, onDrop]
  );

  return (
    <div className="flex-grow bg-panel p-[24px] border border-stroke">
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${GRID_COLS}, 96px)`,
          gap: "12px",
        }}
        onDragOver={onDragOver}
      >
        {inventory.map((item, index) => (
          <div
            key={index}
            onDrop={handleDrop(index)}
            onDragOver={onDragOver}
            style={{ opacity: draggingIndex !== null && draggingIndex !== index ? 0.6 : 1 }}
          >
            {item ? (
              <div
                onMouseEnter={(e) => handleMouseEnter(item, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <ItemCard
                  item={item}
                  isSelected={selectedIndex === index}
                  isDragging={draggingIndex === index}
                  size="inventory"
                  onClick={() => handleItemClick(index, item)}
                  onDragStart={handleDragStart(index, item)}
                  onDragEnd={handleDragEnd}
                />
              </div>
            ) : (
              <div
                className="bg-inventory-slot border border-stroke cursor-pointer"
                style={{
                  width: "96px",
                  height: "96px",
                  borderRadius: "0px",
                }}
                onDrop={handleDrop(index)}
                onDragOver={onDragOver}
              />
            )}
          </div>
        ))}
      </div>

      {tooltip && (
        <ItemTooltip
          item={tooltip.item}
          x={tooltip.x}
          y={tooltip.y}
        />
      )}
    </div>
  );
}
