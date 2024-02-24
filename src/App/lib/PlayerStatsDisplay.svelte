<script lang='ts'>
	import {PlayerStats} from "../store"
    import HealthBar from "./HealthBar.svelte";
</script>
		<div class="flex text-right flex-col gap-1 mt-5 mr-1 font-medium">
			<div class="">
				<HealthBar value={$PlayerStats.health} />
				<span>: Health</span>
			</div>
			<div class="">
				<span class="font-bold font-mono">${$PlayerStats.money.toFixed(2).toString()}</span
				>
			</div>
		</div>
