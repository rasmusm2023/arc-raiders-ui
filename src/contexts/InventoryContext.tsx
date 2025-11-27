"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Item } from "@/src/data/items";

interface InventoryContextType {
  selectedItem: Item | null;
  setSelectedItem: (item: Item | null) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(
  undefined
);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <InventoryContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
}

