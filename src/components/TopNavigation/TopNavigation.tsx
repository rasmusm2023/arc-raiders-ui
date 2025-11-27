"use client";

export default function TopNavigation() {
  return (
    <div className="w-full px-8 py-4 flex items-center justify-between border-b border-border-default">
      {/* Left: L1 Button */}
      <div className="flex items-center">
        <button className="px-4 py-2 bg-slot-bg border border-border-default rounded-slot text-text-title text-sm font-[800] uppercase tracking-caps">
          L1
        </button>
      </div>

      {/* Center: Navigation Tabs */}
      <div className="flex items-center gap-8">
        <button className="text-[14px] font-[800] text-text-nav-active uppercase tracking-caps border-b-2 border-text-nav-active pb-1">
          INVENTORY
        </button>
        <button className="text-[14px] font-[800] text-text-nav-inactive uppercase tracking-caps hover:text-text-nav-active transition-colors">
          LOGBOOK
        </button>
        <button className="text-[14px] font-[800] text-text-nav-inactive uppercase tracking-caps hover:text-text-nav-active transition-colors">
          SYSTEM
        </button>
      </div>

      {/* Right: Currency Display */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-text-title rounded"></div>
          <span className="text-[13px] font-[900] text-text-title">8,700</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-rarity-rare rounded"></div>
          <span className="text-[13px] font-[900] text-text-title">3</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-rarity-legendary rounded"></div>
          <span className="text-[13px] font-[900] text-text-title">2,400</span>
        </div>
      </div>
    </div>
  );
}

