import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderRadius: {
      DEFAULT: '4px',
      'slot': '4px',
      'panel': '8px',
    },
    extend: {
      colors: {
        // Backgrounds
        "bg-main": "#0D0F12",
        "panel-bg": "#11131A",
        "slot-bg": "#1A1D25",
        "icon-bg": "#1C1F26",
        
        // Borders
        "border-default": "#2A2E38",
        "border-hover": "#5C6B82",
        "border-equipped": "#3CE38C",
        
        // Text
        "text-title": "#FFFFFF",
        "text-subtitle": "#CCD0D9",
        "text-small": "#A8ADB9",
        "text-nav-active": "#FFFFFF",
        "text-nav-inactive": "#6F7586",
        "text-icon": "#D5DAE4",
        
        // Rarity Colors (NEW SPEC)
        "rarity-common": "#8F9AA8",
        "rarity-uncommon": "#3CE38C",
        "rarity-rare": "#4AA4FF",
        "rarity-epic": "#C47BFF",
        "rarity-legendary": "#FFB547",
        "rarity-exotic": "#FF5563",
      },
      fontFamily: {
        sans: ['"Michroma"', '"Orbitron"', '"Eurostile"', '"Inter"', 'sans-serif'],
      },
      letterSpacing: {
        'caps': '0.75px',
        'tight': '0.5px',
      },
      boxShadow: {
        'slot-base': '0 1px 2px rgba(0,0,0,0.45)',
        'slot-selected': 'inset 0 0 4px rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
