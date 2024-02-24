import { derived } from "svelte/store";
import { Shop, UpgradeIds, Level, ShopCategories } from "../Shop";
import { newPersitentStore } from "./persistentStorage";
function newPurchasesStore() {
  const { subscribe, update, set } = newPersitentStore<UpgradeIds[]>(
    "purchases",
    [],
  );

  return {
    subscribe,
    update,
    set,
    append(id: UpgradeIds) {
      update((store) => {
        store.push(id);
        return store;
      });
    },
  };
}

const PastPurchases = newPurchasesStore();
export default PastPurchases;

export const PastPurchaseUpgrades = derived(PastPurchases, (store) => {
  return store.map(function (key: UpgradeIds) {
    let upgrade = Shop.upgrades[key];
    return upgrade;
  }, [] as Level[]);
});

export const CategorizedPurchasedUpgrades = derived(
  PastPurchaseUpgrades,
  (store) => {
    return store.reduce(
      function (acc, level) {
        acc[level.category].push(level);
        return acc;
      },
      {
        cooldown: [],
        damage: [],
        armor: [],
        health: [],
      } as Record<ShopCategories, Level[]>,
    );
  },
);
