"use client";

import { useState, useCallback } from "react";
import { Item } from "@/src/data/items";

export type DropZone = "inventory" | "stash" | "loadout";

interface DragState {
  item: Item | null;
  source: DropZone | null;
  isDragging: boolean;
}

export function useDragDrop() {
  const [dragState, setDragState] = useState<DragState>({
    item: null,
    source: null,
    isDragging: false,
  });

  const onDragStart = useCallback(
    (item: Item, source: DropZone) => (e: React.DragEvent) => {
      setDragState({ item, source, isDragging: true });
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", item.id);
    },
    []
  );

  const onDragEnd = useCallback(() => {
    setDragState({ item: null, source: null, isDragging: false });
  }, []);

  const onDrop = useCallback(
    (target: DropZone) => (e: React.DragEvent) => {
      e.preventDefault();
      const itemId = e.dataTransfer.getData("text/plain");
      
      if (dragState.item && dragState.source) {
        // Validate move
        const isValidMove =
          (dragState.source === "stash" && target === "inventory") ||
          (dragState.source === "inventory" && target === "loadout") ||
          (dragState.source === "loadout" && target === "inventory");

        if (isValidMove) {
          // Move logic will be handled by parent component
          return { item: dragState.item, from: dragState.source, to: target };
        }
      }
      return null;
    },
    [dragState]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  return {
    dragState,
    onDragStart,
    onDragEnd,
    onDrop,
    onDragOver,
  };
}
