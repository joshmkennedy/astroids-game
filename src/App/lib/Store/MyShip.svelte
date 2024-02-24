<script lang="ts">
	import { Level, Shop, ShopCategories, UpgradeIds } from "../../../Shop";
	import { CategorizedPurchasedUpgrades } from "../../../storage/purchases";
	import ShipAttributeStore, {
		ShipUpgrades,
	} from "../../../storage/shipAttributes";
	import UseUpgradeCard from "./UseUpgradeCard.svelte";

	$: categories = Object.keys(
		$CategorizedPurchasedUpgrades
	) as ShopCategories[];

	console.log($CategorizedPurchasedUpgrades, $ShipUpgrades);
	function useUpgrade(upgrade: Level) {
		ShipAttributeStore.setAttribute(upgrade.category, upgrade.id);
	}
	$: isInUse = function (id: UpgradeIds) {
		return Object.values($ShipAttributeStore).includes(id);
	};
</script>

<article class="h-full">
	<header class="mb-8">
		<h2 class="text-2xl text-green-200 font-light tracking-wider">My Ship</h2>
	</header>
	<div class="md:flex gap-8 items-start">
		<div class="">
			<h3 class="mb-4 uppercase tracking-wide">Ship's Current Upgrades</h3>
			<div class="grid-cols-2 grid gap-5">
				{#each categories as category}
					<div class=" ">
						<h4 class="text-slate-200 capitalize">{category}</h4>
						{#if $ShipUpgrades[category]}
							<UseUpgradeCard upgrade={$ShipUpgrades[category]} />
						{:else}
							<div
								class="text-center flex flex-col gap-2 border rounded border-slate-700 p-2 min-h-[70px] justify-center"
							>
								<p class="text-md font-light text-slate-500">Empty Slot</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<div class="flex-1 w-full order-1 h-[calc(100vh-120px)] overflow-y-auto">
			<h3 class="uppercase tracking-wide mb-4">Past Purchases</h3>
			{#each categories as category}
				{#if $CategorizedPurchasedUpgrades[category].length}
					<h4 class="capitalize">{category}</h4>
					<ul class="grid grid-cols-1 rounded py-5 gap-10 content-center">
						{#each $CategorizedPurchasedUpgrades[category] as upgrade}
							<li>
								<UseUpgradeCard
									{upgrade}
									action={isInUse(upgrade.id) ? () => null : useUpgrade}
									buttonText={isInUse(upgrade.id) ? "In Use" : "Use Upgrade"}
									isDisabled={isInUse(upgrade.id)}
								/>
							</li>
						{/each}
					</ul>
				{/if}
			{/each}
		</div>
	</div>
</article>
