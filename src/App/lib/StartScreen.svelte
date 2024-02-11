<script lang="ts">
	import IoMdPlay from "svelte-icons/io/IoMdPlay.svelte";
	import { currentScreen } from "../store";
</script>

<div
	class="w-full flex flex-col gap-20 text-white justify-center items-center min-h-screen"
>
	<div>
		<h1 class="text-6xl uppercase font-extrabold text-slate-200">Astroids!</h1>
	</div>
	<div class="flex gap-10 max-w-md justify-center flex-col">
		<button
			on:click={() => currentScreen.set("Game")}
			class="flex gap-2 items-center bg-pink-400 text-pink-400 bg-opacity-25 hover:bg-opacity-30 hover:text-pink-300 font-bold
			hover:shadow-pink-900 px-20 hover:shadow-2xl uppercase py-5"
		>
			<span class="w-6 inline-block"><IoMdPlay class="icon" /></span>
			Start
		</button>
	</div>
</div>
