import { Rarity } from "./rarities";

export interface ItemStats {
  damage?: number;
  fireRate?: number;
  accuracy?: number;
  range?: number;
  capacity?: number;
  reloadSpeed?: number;
}

export interface Item {
  id: string;
  name: string;
  type: "weapon" | "module" | "material";
  rarity: Rarity;
  stats: ItemStats;
  image: string;
  description: string;
}

export const exampleItems: Item[] = [
  {
    id: "weapon-1",
    name: "Assault Rifle",
    type: "weapon",
    rarity: "rare",
    stats: {
      damage: 45,
      fireRate: 600,
      accuracy: 75,
      range: 300,
    },
    image: "/assets/weapons/assault-rifle.png",
    description: "A reliable automatic rifle with balanced stats.",
  },
  {
    id: "weapon-2",
    name: "Plasma Cannon",
    type: "weapon",
    rarity: "epic",
    stats: {
      damage: 120,
      fireRate: 200,
      accuracy: 85,
      range: 500,
    },
    image: "/assets/weapons/plasma-cannon.png",
    description: "High-damage energy weapon with excellent range.",
  },
  {
    id: "module-1",
    name: "Damage Boost",
    type: "module",
    rarity: "uncommon",
    stats: {
      damage: 15,
    },
    image: "/assets/modules/damage-boost.png",
    description: "Increases weapon damage output.",
  },
  {
    id: "module-2",
    name: "Speed Module",
    type: "module",
    rarity: "rare",
    stats: {
      fireRate: 100,
    },
    image: "/assets/modules/speed-module.png",
    description: "Enhances weapon fire rate.",
  },
  {
    id: "material-1",
    name: "Energy Core",
    type: "material",
    rarity: "common",
    stats: {},
    image: "/assets/materials/energy-core.png",
    description: "Basic crafting material.",
  },
];

