import { derived } from "svelte/store";
import { Shop, UpgradeIds,ShopCategories, Level } from "../Shop";
import { newPersitentStore } from "./persistentStorage";

export type ShipAttributeStoreT = Record<ShopCategories, UpgradeIds | undefined>

function newShipAttributeStore() {
	const { subscribe, update, set } = newPersitentStore<ShipAttributeStoreT>("shipAttributes", {
		damage: undefined,
		armor: undefined,
		cooldown: undefined,
		health: undefined,
	});

	return {
		subscribe,
		update,
		set,
		setAttribute(key:ShopCategories, id:UpgradeIds){
			update(store=>{
				store[key] = id
				return store
			})	
		},
	};
}

const ShipAttributeStore = newShipAttributeStore();
export default ShipAttributeStore;

export type ShipUpgradesT = Record<ShopCategories,Level>
export const ShipUpgrades = derived(ShipAttributeStore, (store) => {
	return (Object.keys(store) as ShopCategories[]).reduce(function(acc, key: ShopCategories ) {
		//@ts-ignore
		let level:Level = {value:0, id:"", cost:0, name:"<Empty Slot>",category:key } as Level
		if(store[key]){
			level = Shop.upgrades[store[key] as UpgradeIds] 
		}
		acc[key] = level
		return acc
	}, {} as ShipUpgradesT)
})
