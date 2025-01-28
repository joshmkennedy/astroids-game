<script lang="ts">
	import type { Level } from "../../../Shop";
	import { Shop } from "../../../Shop";
	export let buttonText = "Use Upgrade";
	export let upgrade: Level;
	export let isDisabled = false;
	export let action: undefined | ((upgrade: Level) => void) = undefined;

	const tempFunc = Shop.categories[upgrade.category].templateFunc;

	$: description = Shop.categories[
		upgrade.category
	].lvlDescriptionTemplate.replace(
		"{{value}}",
		tempFunc(upgrade.value).toString()
	);
</script>

<div
	class={`text-center flex flex-col gap-2 border rounded border-slate-700 p-2`}
>
	<h4 class="text-md font-light text-slate-300">
		{upgrade.name}
	</h4>
	<p class="text-sm font-extralight text-slate-400">
		{description}
	</p>
	{#if action}
		<div>
			<button
				class=" disabled:text-slate-500 disabled:bg-slate-800 disabled:hover:cursor-no-drop bg-green-600 bg-opacity-25 text-green-400 font-mono w-full py-2 rounded hover:bg-opacity-50 hover:text-green-200"
				on:click={() => action?.(upgrade)}
				disabled={isDisabled}
			>
				{buttonText}
			</button>
		</div>
	{/if}
</div>
