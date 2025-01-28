<script lang="ts">
	import {ShipBaseConfig, ShipUpgrades} from "../../storage/shipAttributes"
		
</script>

<div
	class="flex flex-col gap-4 p-3 rounded border border-slate-700 max-w-[33%] w-full flex-1"
>
	<div>
		<h3 class="mb-2 uppercase text-slate-500 text-xs">Ship</h3>
		<div class="font-bold">
			<p>
				Health: <span class="font-light text-green-300"
					>{($ShipUpgrades.health?.value ?? 0) + ShipBaseConfig.health}</span
				>
			</p>
			<p>
				Armor: <span class="font-light text-cyan-300"
					>{($ShipUpgrades.armor?.value ?? 0) * 100}% reduction</span
				>
			</p>
		</div>
	</div>

	<div>
		<h3 class="mb-2 uppercase text-slate-500 text-xs">Cannons</h3>
		<div class="font-bold">
			<p>
				Fire Rate:
				<span class="font-light text-yellow-300">
					{ShipBaseConfig.cooldown - (ShipBaseConfig.cooldown * ($ShipUpgrades.cooldown?.value ?? 0))}ms</span
				>
			</p>
			<p>
				Damage:
				<span class="font-light text-pink-300">
					{ShipBaseConfig.damage + ($ShipUpgrades.damage?.value ?? 0)}
				</span >
			</p>
		</div>
	</div>
</div>
