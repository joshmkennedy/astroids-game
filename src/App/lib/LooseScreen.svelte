<script lang="ts">
	import { PlayerStats } from "../store";
	import IoMdRepeat from "svelte-icons/io/IoMdRepeat.svelte";
	import IoMdArrowBack from "svelte-icons/io/IoMdArrowBack.svelte";
	export let quit: () => void;
	export let restart: () => void;
</script>

<div
	class="z-20 absolute border-pink-600 border rounded-md inset-32 bg-black bg-opacity-15 backdrop-blur"
>
	<div
		class="text-white text-center p-3 flex flex-col gap-10 justify-center items-center h-full"
	>
		<header class="-mt-5 ">
			<h2 class="font-bold rover-font game-title uppercase text-6xl mb-4 text-pink-500 glow-heading"
			style="--title-size:60px">Crashed!</h2>
			<p>Your ship was destroyed by an astroid</p>
			<p />
		</header>
		<div>
			<p>You Earned:</p>
			<p />
			<p class="text-2xl font-mono">${$PlayerStats.money.toFixed(2).toString()}</p>
		</div>
		<div class="flex gap-3 justify-center items-center">
			<button
				class="flex gap-2 items-center py-1 bg-pink-600 text-pink-400 bg-opacity-15 px-2 hover:bg-opacity-25"
				on:click={quit}
			>
				<span class="w-6 inline-block"><IoMdArrowBack class="icon" /></span>
				Quit
			</button>
			<button
				class="flex gap-2 items-center py-1 bg-lime-600 text-lime-400 bg-opacity-15 px-2 hover:bg-opacity-25"
				on:click={restart}
			>
				<span class="w-6 inline-block"><IoMdRepeat class="icon" /></span> Restart
			</button>
		</div>
	</div>
</div>
