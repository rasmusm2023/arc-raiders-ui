"use client";

import { useState } from "react";
import { Item } from "@/src/data/items";
import { rarityColors } from "@/src/data/rarities";
import { motion } from "framer-motion";

interface ItemCardProps {
  item: Item | null;
  isSelected?: boolean;
  isDragging?: boolean;
  isEquipped?: boolean;
  quantity?: number;
  size?: number;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

export default function ItemCard({
  item,
  isSelected = false,
  isDragging = false,
  isEquipped = false,
  quantity,
  size = 64,
  onClick,
  onDragStart,
  onDragEnd,
}: ItemCardProps) {
  const rarityColor = item ? rarityColors[item.rarity] : undefined;
  const [isHovered, setIsHovered] = useState(false);
  
  const borderColor = isEquipped
    ? "#3CE38C"
    : isSelected && rarityColor
    ? rarityColor
    : isDragging
    ? "#4AA4FF"
    : isHovered && item
    ? "#5C6B82"
    : "#2A2E38";

  const borderWidth = isSelected || isEquipped ? "2px" : "1px";

  return (
    <motion.div
      className="relative"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        cursor: item ? (isDragging ? "grabbing" : "grab") : "default",
      }}
      onClick={onClick}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      draggable={!!item}
      whileHover={item ? {
        scale: 1.02,
        transition: {
          duration: 0.15,
          ease: "easeOut",
        },
      } : {}}
      whileTap={item ? {
        scale: 0.97,
        transition: {
          duration: 0.1,
        },
      } : {}}
    >
      <div
        className="bg-slot-bg relative overflow-hidden"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "4px",
          border: `${borderWidth} solid ${borderColor}`,
          boxShadow: isSelected
            ? "0 1px 2px rgba(0,0,0,0.45), inset 0 0 4px rgba(255,255,255,0.08)"
            : "0 1px 2px rgba(0,0,0,0.45)",
          transition: "border-color 150ms ease-out",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {item ? (
          <>
            {/* Item Image */}
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                backgroundImage: item.image ? `url(${item.image})` : "none",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
              }}
            >
              {!item.image && (
                <span className="text-text-small text-[10px]">IMG</span>
              )}
            </div>

            {/* Quantity Badge */}
            {quantity !== undefined && quantity > 1 && (
              <div className="absolute bottom-0 right-0 px-1 bg-black/60 rounded-tl">
                <span className="text-[11px] text-text-title font-[700]">
                  {quantity}
                </span>
              </div>
            )}

            {/* Rarity Glow */}
            {isSelected && rarityColor && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: `0 0 0 2px ${rarityColor}40`,
                  borderRadius: "4px",
                }}
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-30">
            <div className="w-8 h-8 border border-border-default rounded flex items-center justify-center">
              <div className="w-4 h-4 bg-text-small/20 rounded"></div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
