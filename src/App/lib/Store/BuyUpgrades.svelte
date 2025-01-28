<script lang="ts">
	import Player from "../../../Game/player";
    import DisplayShipStats from "../DisplayShipStats.svelte";
    import UpgradeAttributeRow from "./UpgradeAttributeRow.svelte";


</script>

<h2 class="text-2xl text-green-200 font-light tracking-wider">Buy Upgrades</h2>
<div class="text-slate-300 py-8 flex flex-col gap-6">
	<div class="flex justify-center gap-4 max-w-3xl w-full mx-auto">
		<!-- Ships current values  -->
		<DisplayShipStats />
		<!--  Image of ship  -->
		<div
			class="flex-1 flex items-center justify-center border border-slate-700 bg-slate-900 rounded"
		>
			<figure>
				<img class="-rotate-90" src="/sprites/ship1.png" alt="my-ship" />
			</figure>
		</div>
	</div>
	<UpgradeAttributeRow />
</div>

