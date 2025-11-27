"use client";

import TopNavigation from "@/src/components/TopNavigation";
import EnhancedInventory from "@/src/components/EnhancedInventory";
import { InventoryProvider } from "@/src/contexts/InventoryContext";

export default function Home() {
  return (
    <InventoryProvider>
      <div className="min-h-screen bg-bg-main relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(74, 164, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(74, 164, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        
        <TopNavigation />
        <EnhancedInventory />
      </div>
    </InventoryProvider>
  );
}
