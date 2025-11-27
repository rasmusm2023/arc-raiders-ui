"use client";

import { useState } from "react";
import { Item } from "@/src/data/items";
import { rarityColors } from "@/src/data/rarities";
import { motion } from "framer-motion";

interface EnhancedItemCardProps {
  item: Item;
  size?: number;
  viewMode?: "grid" | "list";
  isFavorite?: boolean;
  isLocked?: boolean;
  isSelected?: boolean;
  onToggleFavorite?: () => void;
  onToggleLock?: () => void;
  onClick?: () => void;
}

export default function EnhancedItemCard({
  item,
  size = 64,
  viewMode = "grid",
  isFavorite = false,
  isLocked = false,
  isSelected = false,
  onToggleFavorite,
  onToggleLock,
  onClick,
}: EnhancedItemCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  if (!item) {
    // Empty slot
    return (
      <div
        className="bg-slot-bg border border-border-default rounded-slot flex items-center justify-center opacity-30"
        style={{
          width: size ? `${size}px` : "100%",
          height: size ? `${size}px` : "auto",
          minHeight: size ? `${size}px` : "64px",
        }}
      >
        <div className="w-8 h-8 border border-border-default rounded flex items-center justify-center">
          <div className="w-4 h-4 bg-text-small/20 rounded"></div>
        </div>
      </div>
    );
  }
  
  const rarityColor = rarityColors[item.rarity];

  if (viewMode === "list") {
    return (
      <motion.div
        className={`bg-slot-bg border rounded-slot p-3 cursor-pointer relative overflow-hidden ${
          isSelected ? "border-2" : "border"
        }`}
        style={{
          borderColor: isSelected ? rarityColor : "#2A2E38",
          boxShadow: isSelected
            ? `0 0 12px ${rarityColor}40, inset 0 0 4px ${rarityColor}20`
            : "0 1px 2px rgba(0,0,0,0.45)",
        }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-3">
          {/* Item Icon */}
          <div
            className="w-12 h-12 rounded-slot bg-panel-inner flex items-center justify-center flex-shrink-0"
            style={{
              border: `2px solid ${rarityColor}`,
              boxShadow: `0 0 8px ${rarityColor}40`,
            }}
          >
            {item.image ? (
              <div
                className="w-full h-full bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${item.image})` }}
              />
            ) : (
              <span className="text-[8px] text-text-small">IMG</span>
            )}
          </div>

          {/* Item Info */}
          <div className="flex-1 min-w-0">
            <div
              className="text-[13px] font-[800] text-text-title uppercase truncate"
              style={{ color: rarityColor }}
            >
              {item.name}
            </div>
            <div className="text-[11px] font-[700] text-text-small uppercase">
              {item.type}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {onToggleFavorite && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite();
                }}
                className={`w-6 h-6 flex items-center justify-center rounded ${
                  isFavorite ? "text-rarity-legendary" : "text-text-small"
                }`}
              >
                ⭐
              </button>
            )}
            {onToggleLock && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleLock();
                }}
                className={`w-6 h-6 flex items-center justify-center rounded ${
                  isLocked ? "text-rarity-rare" : "text-text-small"
                }`}
              >
                🔒
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative"
      style={{ width: `${size}px`, height: `${size}px` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className="bg-slot-bg rounded-slot relative overflow-hidden cursor-pointer"
        style={{
          width: "100%",
          height: "100%",
          border: `${isSelected ? "2px" : "1px"} solid ${isSelected ? rarityColor : "#2A2E38"}`,
          boxShadow: isSelected
            ? `0 0 16px ${rarityColor}50, inset 0 0 6px ${rarityColor}30`
            : isHovered
            ? `0 0 12px ${rarityColor}30`
            : "0 1px 2px rgba(0,0,0,0.45)",
          transition: "all 0.2s ease-out",
        }}
      >
        {/* Rarity Glow Background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(135deg, ${rarityColor}00 0%, ${rarityColor}40 100%)`,
          }}
        />

        {/* Item Image */}
        <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
          {item.image ? (
            <div
              className="w-full h-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${item.image})`,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
              }}
            />
          ) : (
            <span className="text-[10px] text-text-small">IMG</span>
          )}
        </div>

        {/* Item Name Overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 px-1 py-0.5"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
          }}
        >
          <div
            className="text-[9px] font-[800] text-center truncate uppercase"
            style={{ color: rarityColor }}
          >
            {item.name}
          </div>
        </div>

        {/* Favorite & Lock Icons */}
        {(isFavorite || isLocked) && (
          <div className="absolute top-1 right-1 z-30 flex gap-1">
            {isFavorite && (
              <div className="w-3 h-3 text-rarity-legendary text-[8px]">⭐</div>
            )}
            {isLocked && (
              <div className="w-3 h-3 text-rarity-rare text-[8px]">🔒</div>
            )}
          </div>
        )}

        {/* Hover Actions */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-40 bg-black/60 flex items-center justify-center gap-2"
          >
            {onToggleFavorite && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite();
                }}
                className="w-8 h-8 bg-slot-bg rounded flex items-center justify-center hover:bg-panel-inner transition-colors"
              >
                <span className={isFavorite ? "text-rarity-legendary" : "text-text-small"}>
                  ⭐
                </span>
              </button>
            )}
            {onToggleLock && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleLock();
                }}
                className="w-8 h-8 bg-slot-bg rounded flex items-center justify-center hover:bg-panel-inner transition-colors"
              >
                <span className={isLocked ? "text-rarity-rare" : "text-text-small"}>🔒</span>
              </button>
            )}
          </motion.div>
        )}

        {/* Rarity Particle Effect (for exotic/legendary) */}
        {(item.rarity === "exotic" || item.rarity === "legendary") && isHovered && (
          <div
            className="absolute inset-0 z-0"
            style={{
              background: `radial-gradient(circle at center, ${rarityColor}20 0%, transparent 70%)`,
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

