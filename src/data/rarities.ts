export const rarityColors = {
  common: "#8F9AA8",
  uncommon: "#3CE38C",
  rare: "#4AA4FF",
  epic: "#C47BFF",
  legendary: "#FFB547",
  exotic: "#FF5563",
};

export type Rarity = keyof typeof rarityColors;
