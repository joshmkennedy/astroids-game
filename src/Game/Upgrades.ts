import { Attribute } from "./Attributes";

export const UpgradeAttributes = {
  loadHealthLvl_2(): Attribute {
    return {
      name: "Ship Health lvl 2",
      value: 33,
    };
  },
  loadHealthLvl_3(): Attribute {
    return {
      name: "Ship Health lvl 3",
      value: 50,
    };
  },
  loadHealthLvl_4(): Attribute {
    return {
      name: "Ship Health lvl 4",
      value: 100,
    };
  },
  loadArmorLvl_2(): Attribute {
    return {
      name: "Ship Armor lvl 2",
      value: 0.1,
    };
  },
  loadArmorLvl_3(): Attribute {
    return {
      name: "Ship Armor lvl 3",
      value: 0.25,
    };
  },
  loadArmorLvl_4(): Attribute {
    return {
      name: "Ship Armor lvl 4",
      value: 0.5,
    };
  },
  loadDamageLvl_2(): Attribute {
    return {
      name: "Damage lvl 2",
      value: 0.33,
    };
  },
  loadDamageLvl_3(): Attribute {
    return {
      name: "Damage lvl 3",
      value: .75,
    };
  },
  loadDamageLvl_4(): Attribute {
    return {
      name: "Damage lvl 4",
      value: 1.5,
    };
  },
  loadCooldownLvl_2(): Attribute {
    return {
      name: "Cooldown lvl 2",
      value: 0.2,
    };
  },
  loadCooldownLvl_3(): Attribute {
    return {
      name: "Cooldown lvl 3",
      value: 0.2 * 2,
    };
  },
  loadCooldownLvl_4(): Attribute {
    return {
      name: "Cooldown lvl 4",
      value: 0.2 * 3,
    };
  }
}
