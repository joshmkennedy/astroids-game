export type Level = {
  category: ShopCategories;
  id: UpgradeIds;
  name: string;
  value: number;
  cost: number;
};

export type UpgradeIds =
  | "cooldown_lvl_1"
  | "cooldown_lvl_2"
  | "cooldown_lvl_3"
  | "armor_lvl_1"
  | "armor_lvl_2"
  | "armor_lvl_3"
  | "health_lvl_1"
  | "health_lvl_2"
  | "health_lvl_3"
  | "damage_lvl_1"
  | "damage_lvl_2"
  | "damage_lvl_3";

export type ShopCategories = "cooldown" | "damage" | "armor" | "health";
export type CategoryType = {
  id: ShopCategories;
  name: string;
  description: string;
  lvlDescriptionTemplate: string;
  templateFunc: (v: number) => number;
};
export type ShopType = {
  categories: Record<ShopCategories, CategoryType>;
  upgrades: Record<UpgradeIds, Level>;
};
export const Shop: ShopType = {
  categories: {
    cooldown: {
      id: "cooldown",
      name: "Gun Fire Rate",
      description: "Increase the rate at which you can fire bullets",
      lvlDescriptionTemplate: "Increases fire rate by {{value}}%",
      templateFunc: (value: number) => value * 100,
    },
    damage: {
      id: "damage",
      name: "Damage",
      description: "Increase the damage done by your ships guns",
      lvlDescriptionTemplate:
        "Increase the damage dealt to astroids by {{value}}%",
      templateFunc: (value: number) => value * 100,
    },
    health: {
      id: "health",
      name: "Ship Health",
      description: "Increase the amount of damage your ship can take",
      lvlDescriptionTemplate: "Increase your ship's health by {{value}}",
      templateFunc: (value: number) => value,
    },
    armor: {
      name: "Ship Armor",
      id: "armor",
      description: "Decrease the amount of damage taken",
      lvlDescriptionTemplate: "Take {{value}}% less damage",
      templateFunc: (value: number) => value * 100,
    },
  },

  upgrades: {
    cooldown_lvl_1: {
      id: "cooldown_lvl_1",
      name: "Fire Rate I",
      value: 0.2,
      cost: 2_300,
      category: "cooldown",
    },
    cooldown_lvl_2: {
      id: "cooldown_lvl_2",
      name: "Fire Rate II",
      value: 0.4,
      cost: 3_500,
      category: "cooldown",
    },
    cooldown_lvl_3: {
      id: "cooldown_lvl_3",
      name: "Fire Rate III",
      value: 0.6,
      cost: 5_700,
      category: "cooldown",
    },
    armor_lvl_1: {
      id: "armor_lvl_1",
      name: "Armor I",
      value: 0.1,
      cost: 1_500,
      category: "armor",
    },
    armor_lvl_2: {
      id: "armor_lvl_2",
      name: "Armor II",
      value: 0.25,
      cost: 2_000,
      category: "armor",
    },
    armor_lvl_3: {
      id: "armor_lvl_3",
      name: "Armor III",
      value: 0.5,
      cost: 3_000,
      category: "armor",
    },
    health_lvl_1: {
      id: "health_lvl_1",
      name: "Health I",
      value: 33,
      cost: 2_000,
      category: "health",
    },
    health_lvl_2: {
      id: "health_lvl_2",
      name: "Health II",
      value: 55,
      cost: 3_000,
      category: "health",
    },
    health_lvl_3: {
      id: "health_lvl_3",
      name: "Health III",
      value: 100,
      cost: 5_000,
      category: "health",
    },
    damage_lvl_1: {
      id: "damage_lvl_1",
      name: "Damage I",
      value: 0.33,
      cost: 2_500,
      category: "damage",
    },
    damage_lvl_2: {
      id: "damage_lvl_2",
      name: "Damage II",
      value: 0.75,
      cost: 4_100,
      category: "damage",
    },
    damage_lvl_3: {
      id: "damage_lvl_3",
      name: "Damage III",
      value: 1.5,
      cost: 6_000,
      category: "damage",
    },
  },
} as const;
