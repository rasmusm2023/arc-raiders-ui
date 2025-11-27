"use client";

import { useState, useCallback, useEffect } from "react";
import { Item } from "@/src/data/items";
import { exampleItems } from "@/src/data/items";
import ItemCard from "@/src/components/ItemCard";
import { useDragDrop } from "@/src/hooks/useDragDrop";

const EQUIPMENT_SLOTS = 5;
const BACKPACK_COLS = 4;
const BACKPACK_ROWS = 5;
const BACKPACK_SLOTS = BACKPACK_COLS * BACKPACK_ROWS;

export default function LoadoutPanel() {
  const [equipment, setEquipment] = useState<(Item | null)[]>(
    new Array(EQUIPMENT_SLOTS).fill(null)
  );
  const [weapon, setWeapon] = useState<Item | null>(exampleItems[0] || null);
  const [backpack, setBackpack] = useState<(Item | null)[]>(
    new Array(BACKPACK_SLOTS).fill(null)
  );
  const [backpackCount, setBackpackCount] = useState(2);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const { onDragStart, onDragEnd, onDrop, onDragOver } = useDragDrop();

  // Initialize backpack with some items
  useEffect(() => {
    const initialBackpack = new Array(BACKPACK_SLOTS).fill(null);
    exampleItems.slice(1, 3).forEach((item, idx) => {
      if (idx < BACKPACK_SLOTS) {
        initialBackpack[idx] = item;
      }
    });
    setBackpack(initialBackpack);
  }, []);

  const handleDragStart = useCallback(
    (item: Item, type: "equipment" | "weapon" | "backpack", index?: number) =>
      (e: React.DragEvent) => {
        setDraggingIndex(index ?? -1);
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
    <div className="flex-1 bg-panel-bg rounded-panel p-6">
      {/* Loadout Info Row */}
      <div className="mb-4">
        <h2 className="text-[14px] font-[900] text-text-title uppercase tracking-caps mb-2">
          LOADOUT
        </h2>
        <div className="flex items-center gap-4 text-[11px] font-[700] text-text-small">
          <span>16.0/50.0</span>
          <span>7,096</span>
        </div>
      </div>

      {/* Equipment Row */}
      <div className="mb-5">
        <div className="text-[12px] font-[800] text-text-subtitle uppercase tracking-caps mb-3">
          EQUIPMENT
        </div>
        <div className="flex gap-2" onDragOver={onDragOver}>
          {equipment.map((item, index) => (
            <div
              key={index}
              onDrop={(e) => {
                e.preventDefault();
                const result = onDrop("loadout")(e);
                if (result) {
                  const newEquipment = [...equipment];
                  newEquipment[index] = result.item;
                  setEquipment(newEquipment);
                }
              }}
              onDragOver={onDragOver}
              style={{
                opacity: draggingIndex === index ? 0.6 : 1,
              }}
            >
              <ItemCard
                item={item}
                isEquipped={!!item}
                size={64}
                onDragStart={item ? handleDragStart(item, "equipment", index) : undefined}
                onDragEnd={handleDragEnd}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Large Weapon Slot */}
      <div className="mb-4">
        <div
          className="bg-slot-bg border-2 border-border-equipped rounded-slot p-3"
          style={{
            width: "160px",
            height: "120px",
            boxShadow: "0 1px 2px rgba(0,0,0,0.45)",
          }}
          onDrop={(e) => {
            e.preventDefault();
            const result = onDrop("loadout")(e);
            if (result && result.item.type === "weapon") {
              setWeapon(result.item);
            }
          }}
          onDragOver={onDragOver}
        >
          {weapon ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div
                className="w-full h-16 bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: weapon.image ? `url(${weapon.image})` : "none",
                }}
              />
              <div className="mt-2 text-[11px] text-text-small">0/10</div>
              <div className="w-full h-1 bg-border-default rounded mt-1">
                <div className="h-full bg-rarity-rare rounded" style={{ width: "75%" }} />
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-small text-[10px]">
              WEAPON
            </div>
          )}
        </div>
      </div>

      {/* Backpack Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-[12px] font-[800] text-text-subtitle uppercase tracking-caps">
            BACKPACK
          </div>
          <div className="text-[11px] font-[700] text-text-small">
            {backpackCount}/18
          </div>
        </div>
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${BACKPACK_COLS}, 64px)`,
            gap: "8px",
          }}
          onDragOver={onDragOver}
        >
          {backpack.map((item, index) => (
            <div
              key={index}
              onDrop={(e) => {
                e.preventDefault();
                const result = onDrop("loadout")(e);
                if (result) {
                  const newBackpack = [...backpack];
                  newBackpack[index] = result.item;
                  setBackpack(newBackpack);
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
                onDragStart={item ? handleDragStart(item, "backpack", index) : undefined}
                onDragEnd={handleDragEnd}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
