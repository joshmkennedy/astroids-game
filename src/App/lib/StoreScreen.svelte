<script lang="ts">
	import Bank from "../../storage/bank";
	import { navigate } from "../store";
	import BuyUpgrades from "./Store/BuyUpgrades.svelte";
	import MyShip from "./Store/MyShip.svelte";
	import IoMdArrowBack from "svelte-icons/io/IoMdArrowBack.svelte";
	let CurrentStoreScreen: "Buy" | "Ship" = "Buy";
	function navigateStore(screen: "Buy" | "Ship") {
		CurrentStoreScreen = screen;
	}
</script>

<div class="flex-col flex min-h-screen">
	<header class="sticky top-0 left-0 w-full z-10 bg-slate-950 border-b-slate-800 border-b">
		<div
			class="flex justify-between items-center px-5 py-3 max-w-screen-lg mx-auto w-full"
		>
			<div class="flex gap-2 lg:-ml-10 items-center">
				<button
					on:click={() => navigate("Start")}
					class="w-8 h-8 rounded p-2 hover:bg-white hover:bg-opacity-20"
				>
					<IoMdArrowBack />
				</button>
				<h1
					class="text-lg font-bold rover-font capitalize tracking-widest text-slate-200"
				>
					Store
				</h1>
			</div>
			<div>
				<nav class="flex justify-end gap-2">
					<button
						on:click={() => navigateStore("Buy")}
						class="py-1 px-2 text-green-100 font-medium uppercase tracking-wide text-sm hover:text-green-400 hover:bg-green-600 hover:bg-opacity-20 rounded"
						>Buy Upgrades</button
					>
					<button
						on:click={() => navigateStore("Ship")}
						class="py-1 px-2 text-purple-100 font-medium uppercase tracking-wide text-sm hover:text-purple-400
					hover:bg-purple-600 hover:bg-opacity-20 rounded">My Ship</button
					>
				</nav>
			</div>
		</div>
	</header>
	<main class=" flex-1 h-full">
		<div class="max-w-screen-lg h-full mx-auto px-5 py-3">
			{#if CurrentStoreScreen == "Buy"}
				<BuyUpgrades />
			{:else if CurrentStoreScreen == "Ship"}
				<MyShip />
			{/if}
		</div>
	</main>
	<footer
		class="sticky border-t-slate-800 border-t bottom-0 left-0 w-full bg-slate-950"
	>
		<div class="flex px-5 py-3 max-w-screen-lg mx-auto gap-3 text-xl">
			<p>Current Balance:</p>
			<p class="text-yellow-400 font-bold">
				${$Bank.balance.toFixed(2).toString()}
			</p>
		</div>
	</footer>
</div>
