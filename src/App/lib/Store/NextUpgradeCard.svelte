<script lang="ts">
	import {
		loadNextPurchaseableUpgrade,
		Shop,
		ShopCategories,
	} from "../../../Shop";
	import PastPurchases from "../../../storage/purchases";
	import ShipAttributeStore from "../../../storage/shipAttributes";
	import Bank from "../../../storage/bank";

	function purchase() {
		// if cant find upgrade or dont have enough money bail
		if (!upgrade || ($Bank.balance ?? 0) < upgrade.cost) return;
		PastPurchases.append(upgrade.id);
		ShipAttributeStore.setAttribute(upgrade.category, upgrade.id);
		Bank.spendMoney(upgrade.cost);
	}
	export let category: ShopCategories;

	$: upgrade = loadNextPurchaseableUpgrade($PastPurchases, category);

	$: upgradeValue = upgrade
		? Shop.categories[category].templateFunc(upgrade?.value)
		: 0;

	$: description = upgrade
		? Shop.categories[category].lvlDescriptionTemplate.replace(
				"{{value}}",
				upgradeValue.toString()
		  )
		: "";

</script>

{#if upgrade}
	<div
		class="text-center flex flex-col gap-2 border rounded border-slate-700 p-2"
	>
		<h4 class="text-slate-50 uppercase text-sm">{upgrade.name}</h4>
		<p class="flex-1 text-xs text-slate-300">{description}</p>
		<div class="">
		<button
			on:click={purchase}
			class=" disabled:text-slate-500 disabled:bg-slate-800 disabled:hover:cursor-no-drop bg-green-600 bg-opacity-25 text-green-400 font-mono w-full py-2 rounded hover:bg-opacity-50 hover:text-green-200"
			disabled={$Bank.balance < upgrade.cost}
		>
			upgrade
		</button>
		</div>
	</div>
{/if}
