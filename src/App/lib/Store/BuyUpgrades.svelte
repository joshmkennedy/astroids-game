<script lang="ts">
	import { Level, Shop } from "../../../Shop";
    import PastPurchases from "../../../storage/purchases";
	import PurchaseUpgradeButton from "./PurchaseUpgradeButton.svelte";
	$: wasPurchased = (level:Level) => {
		let purchased = $PastPurchases.includes(level.id);
		return {...level, purchased};
	};

	$: armorUpgrades = (Object.values(Shop.upgrades) as Level[]).filter((u:Level)=>u.category == "armor").map(wasPurchased)
	$: healthUpgrades = (Object.values(Shop.upgrades) as Level[]).filter((u:Level)=>u.category == "health").map(wasPurchased);
	$: damageUpgrades = (Object.values(Shop.upgrades)as Level[]).filter(u=>u.category == "damage").map(wasPurchased);
	$: cooldownUpgrades = (Object.values(Shop.upgrades) as Level[]).filter(u=>u.category == "cooldown").map(wasPurchased);
</script>

<h2 class="text-2xl text-green-200 font-light tracking-wider">Buy Upgrades</h2>
<ul>
	<li class="py-5">
		<h3 class="text-lg mb-5 text-left">{Shop.categories.health.name}</h3>
		<ul class="grid grid-cols-3 rounded p-10 gap-10 content-center">
			{#each healthUpgrades as upgrade}
				<li>
					<PurchaseUpgradeButton {upgrade} upgradeType={"health"} />
				</li>
			{/each}
		</ul>
	</li>
	<li class="py-5">
		<h3 class="text-lg mb-5 text-left">{Shop.categories.armor.name}</h3>
		<ul class="grid grid-cols-3 rounded p-10 gap-10 content-center">
			{#each armorUpgrades as upgrade}
				<li>
					<PurchaseUpgradeButton {upgrade} upgradeType={"armor"} />
				</li>
			{/each}
		</ul>
	</li>
	<li class="py-5">
		<h3 class="text-lg mb-5 text-left">{Shop.categories.damage.name}</h3>
		<ul class="grid grid-cols-3 rounded p-10 gap-10 content-center">
			{#each damageUpgrades as upgrade}
				<li>
					<PurchaseUpgradeButton {upgrade} upgradeType={"damage"} />
				</li>
			{/each}
		</ul>
	</li>
	<li class="py-5">
		<h3 class="text-lg mb-5 text-left">{Shop.categories.cooldown.name}</h3>
		<ul class="grid grid-cols-3 rounded p-10 gap-10 content-center">
			{#each cooldownUpgrades as upgrade}
				<li>
					<PurchaseUpgradeButton {upgrade} upgradeType={"cooldown"} />
				</li>
			{/each}
		</ul>
	</li>
</ul>
