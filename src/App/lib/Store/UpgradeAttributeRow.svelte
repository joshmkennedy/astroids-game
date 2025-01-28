<script lang="ts">
	import { Shop } from "../../../Shop";
    import NextUpgradeCard from "./NextUpgradeCard.svelte";
</script>

<div class="max-w-3xl mx-auto w-full">
	<h3
		class="uppercase font-medium tracking-wide text-slate-500 text-sm text-center mb-4"
	>
		Upgrades
	</h3>
	<!-- 4 col row with upgrade buttons -->
	<div class="grid grid-cols-4 gap-4">
		{#each Object.keys(Shop.categories) as shipCat}
			<NextUpgradeCard category={shipCat}/>
		{/each}
	</div>
</div>
