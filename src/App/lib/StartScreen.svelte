<script lang="ts">
	import IoMdPlay from "svelte-icons/io/IoMdPlay.svelte";
	import MdAttachMoney from "svelte-icons/md/MdAttachMoney.svelte";
	import Bank from "../../storage/bank";
	import { currentScreen } from "../store";
</script>

<div
	class="w-full flex flex-col gap-20 text-white justify-center items-center min-h-screen"
>
	<div>
		<h1 class="game-title uppercase font-extrabold rover-font text-slate-200">
			Astroids!
		</h1>
	</div>
	<div class="flex gap-10 max-w-md justify-center">
		<button
			on:click={() => currentScreen.set("Game")}
			class="flex gap-2 items-center justify-center bg-pink-400 text-pink-400 bg-opacity-25 hover:bg-opacity-30 hover:text-pink-300 font-bold
			hover:shadow-pink-900 px-20 hover:shadow-2xl uppercase py-5"
		>
			<span class="w-6 inline-block"><IoMdPlay class="icon" /></span>
			Start
		</button>
		<button
			on:click={() => currentScreen.set("Store")}
			class="flex gap-2 items-center bg-yellow-400 text-yellow-400 bg-opacity-25 hover:bg-opacity-30 hover:text-yellow-300 font-bold
			hover:shadow-yellow-900 px-20 hover:shadow-2xl uppercase py-5"
		>
			<span class="w-6 inline-block"><MdAttachMoney class="icon" /></span>
			Store
			<span class="text-sm font-thin italic"
				>(${$Bank.balance.toFixed(2)})</span
			>
		</button>
	</div>
</div>
