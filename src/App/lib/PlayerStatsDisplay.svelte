<script lang='ts'>
	import {PlayerStats} from "../store"
</script>
		<div class="flex text-right flex-col gap-1 font-medium">
			<div class="">
				<progress value={($PlayerStats.health / 100).toFixed(2).toString()} />
				<span>: Health</span>
			</div>
			<div class="">
				<span class="font-bold font-mono">${$PlayerStats.money.toString()}</span
				>
			</div>
		</div>
