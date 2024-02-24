<script lang="ts">
	import type { Level,  ShopCategories } from "../../../Shop";
	import { Shop } from "../../../Shop";
    import Bank from "../../../storage/bank";
		import PastPurchases from "../../../storage/purchases";
    import ShipAttributeStore from "../../../storage/shipAttributes";

	export let upgrade: { purchased: boolean } & Level;
	export let upgradeType: ShopCategories
	const tempFunc = Shop.categories[upgradeType].templateFunc;

	$: description = Shop.categories[upgradeType].lvlDescriptionTemplate.replace(
		"{{value}}",
		tempFunc(upgrade.value).toString()
	);

	function purchase() {
			// if cant find upgrade or dont have enough money bail
			if (!upgrade || ($Bank.balance ?? 0) < upgrade.cost) return;
			PastPurchases.append(upgrade.id);
			ShipAttributeStore.setAttribute(upgradeType,upgrade.id); 
			Bank.spendMoney(upgrade.cost)
	}
</script>

<div class={`${upgrade.purchased ? 'opacity-50':''} text-center flex flex-col gap-2 border rounded border-slate-700 p-2`} >
	<h4 class="text-md font-light text-slate-300">{upgrade.name}</h4>
	<p class="text-sm font-extralight text-slate-400">{description}</p>
	<div>
		<button
			class=" disabled:text-slate-500 disabled:bg-slate-800 disabled:hover:cursor-no-drop bg-green-600 bg-opacity-25 text-green-400 font-mono w-full py-2 rounded hover:bg-opacity-50 hover:text-green-200"

			on:click={purchase}
			disabled={upgrade.cost > $Bank.balance || upgrade.purchased}
		>
			${upgrade.cost.toFixed(2).toString()}
		</button>
	</div>
</div>
