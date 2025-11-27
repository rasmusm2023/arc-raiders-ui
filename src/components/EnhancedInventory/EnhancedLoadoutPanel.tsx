"use client";

import { useState, useCallback, useMemo } from "react";
import { Item } from "@/src/data/items";
import { exampleItems } from "@/src/data/items";
import { rarityColors } from "@/src/data/rarities";
import EnhancedItemCard from "./EnhancedItemCard";
import { motion } from "framer-motion";

const EQUIPMENT_SLOTS = 5;
const BACKPACK_SLOTS = 20;

interface LoadoutPreset {
  id: string;
  name: string;
  equipment: (Item | null)[];
  weapon: Item | null;
  backpack: (Item | null)[];
}

export default function EnhancedLoadoutPanel() {
  const [equipment, setEquipment] = useState<(Item | null)[]>(
    new Array(EQUIPMENT_SLOTS).fill(null)
  );
  const [weapon, setWeapon] = useState<Item | null>(exampleItems[0] || null);
  const [backpack, setBackpack] = useState<(Item | null)[]>(
    new Array(BACKPACK_SLOTS).fill(null)
  );
  const [presets, setPresets] = useState<LoadoutPreset[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const savePreset = useCallback(() => {
    const preset: LoadoutPreset = {
      id: Date.now().toString(),
      name: `PRESET ${presets.length + 1}`,
      equipment: [...equipment],
      weapon,
      backpack: [...backpack],
    };
    setPresets([...presets, preset]);
  }, [equipment, weapon, backpack, presets]);

  const loadPreset = useCallback((preset: LoadoutPreset) => {
    setEquipment([...preset.equipment]);
    setWeapon(preset.weapon);
    setBackpack([...preset.backpack]);
    setSelectedPreset(preset.id);
  }, []);

  const totalWeight = useMemo(() => {
    // Mock weight calculation
    return 16.0;
  }, [equipment, weapon, backpack]);

  const totalScore = useMemo(() => {
    // Mock score calculation
    return 7096;
  }, [equipment, weapon, backpack]);

  return (
    <div className="flex-1 bg-panel-bg rounded-panel p-6 flex flex-col relative overflow-hidden">
      {/* Holographic glow effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rarity-uncommon to-transparent opacity-50" />

      {/* Header with Presets */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[18px] font-[900] text-text-title uppercase tracking-caps">
            LOADOUT
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={savePreset}
              className="px-3 py-1.5 bg-rarity-rare/20 text-rarity-rare border border-rarity-rare rounded-slot text-[11px] font-[800] uppercase hover:bg-rarity-rare/30 transition-colors"
            >
              SAVE
            </button>
          </div>
        </div>

        {/* Presets */}
        {presets.length > 0 && (
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => loadPreset(preset)}
                className={`px-3 py-1.5 rounded-slot text-[10px] font-[800] uppercase whitespace-nowrap transition-all ${
                  selectedPreset === preset.id
                    ? "bg-rarity-uncommon/30 text-rarity-uncommon border-2 border-rarity-uncommon"
                    : "bg-slot-bg text-text-small border border-border-default hover:border-border-hover"
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-6 text-[12px] font-[800]">
          <div className="flex items-center gap-2">
            <span className="text-text-subtitle">WEIGHT:</span>
            <span className="text-text-title">{totalWeight.toFixed(1)}/50.0</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-text-subtitle">SCORE:</span>
            <span className="text-rarity-legendary">{totalScore.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Equipment Row */}
      <div className="mb-6">
        <div className="text-[13px] font-[800] text-text-subtitle uppercase tracking-caps mb-3 flex items-center gap-2">
          <span>⚔️</span> EQUIPMENT
        </div>
        <div className="flex gap-2">
          {equipment.map((item, index) => (
            <div key={index} className="relative">
              <EnhancedItemCard
                item={item}
                size={64}
                onClick={() => {
                  // Open item selection
                }}
              />
              {item && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-full h-1 bg-border-default rounded">
                  <div
                    className="h-full bg-rarity-uncommon rounded"
                    style={{ width: "75%" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Large Weapon Slot */}
      <div className="mb-6">
        <motion.div
          className="bg-slot-bg border-2 border-rarity-uncommon rounded-slot p-4 relative overflow-hidden"
          style={{
            minHeight: "140px",
            boxShadow: "0 0 20px rgba(60, 227, 140, 0.3)",
          }}
          whileHover={{ scale: 1.02 }}
        >
          {weapon ? (
            <>
              <div className="flex items-center justify-between mb-3">
                <div
                  className="text-[16px] font-[900] uppercase"
                  style={{ color: rarityColors[weapon.rarity] }}
                >
                  {weapon.name}
                </div>
                <div className="text-[11px] font-[700] text-text-small">0/10</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-panel-inner rounded-slot flex items-center justify-center">
                  {weapon.image ? (
                    <div
                      className="w-full h-full bg-contain bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${weapon.image})` }}
                    />
                  ) : (
                    <span className="text-text-small text-[10px]">WEAPON</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <div className="text-[11px] font-[700] text-text-small mb-1">DURABILITY</div>
                    <div className="w-full h-2 bg-border-default rounded">
                      <div
                        className="h-full bg-rarity-rare rounded"
                        style={{ width: "75%" }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 bg-slot-bg border border-border-default rounded flex items-center justify-center"
                      >
                        <span className="text-[8px]">⚙️</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-text-small text-[12px] uppercase">
              DRAG WEAPON HERE
            </div>
          )}
        </motion.div>
      </div>

      {/* Backpack Grid */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[13px] font-[800] text-text-subtitle uppercase tracking-caps flex items-center gap-2">
            <span>🎒</span> BACKPACK
          </div>
          <div className="text-[11px] font-[700] text-text-small">
            {backpack.filter((i) => i !== null).length}/20
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2 flex-1 overflow-y-auto pr-2">
          {backpack.map((item, index) => (
            <EnhancedItemCard
              key={index}
              item={item}
              size={64}
              onClick={() => {
                // Open item details
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

