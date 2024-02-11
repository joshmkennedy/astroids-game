<script lang="ts">
import {GameState} from "../store"
import IoMdPlay from 'svelte-icons/io/IoMdPlay.svelte'
import IoMdPause from 'svelte-icons/io/IoMdPause.svelte'
import IoMdRepeat from 'svelte-icons/io/IoMdRepeat.svelte'
import IoMdArrowBack from 'svelte-icons/io/IoMdArrowBack.svelte'
import MdVolumeUp from 'svelte-icons/md/MdVolumeUp.svelte'
	export let quit:()=>void;
	export let play:()=>void;
	export let restart:()=>void;
	export let pause:()=>void;
	export let toggleSound:()=>void;
</script>

<div class="flex gap-2 items-center">
	<button
		class="flex items-center py-1 bg-white bg-opacity-15 hover:text-pink-400 hover:bg-pink-600 px-2 hover:bg-opacity-25"
		on:click={quit}
	>
		<span class="w-6 inline-block"><IoMdArrowBack class="icon" /></span>
		Quit
	</button>
	{#if $GameState == "PLAYING"}
		<button
			class="flex items-center py-1 bg-white bg-opacity-15 px-2 hover:bg-opacity-25 hover:bg-cyan-600
			hover:text-cyan-400"
			on:click={pause}
		>
			<span class="w-6 inline-block"><IoMdPause class="icon" /></span>
		</button>
	{:else if $GameState == "PAUSED"}
		<button
			class="flex items-center py-1 bg-white bg-opacity-15 px-2 hover:bg-opacity-25 hover:text-cyan-400
			hover:bg-cyan-600"
			on:click={play}
		>
			<span class="w-6 inline-block"><IoMdPlay class="icon" /></span>
		</button>
	{/if}
	<button
		class="flex items-center py-1 bg-white bg-opacity-15 px-2 hover:bg-opacity-25 hover:bg-lime-600 hover:text-lime-400"
		on:click={restart}
	>
		<span class="w-6 inline-block"><IoMdRepeat class="icon" /></span>
	</button>
	<button
		class="flex items-center py-1 bg-white bg-opacity-15 px-2 hover:bg-opacity-25 "
		on:click={toggleSound}
	>
		<span class="w-6 inline-block"><MdVolumeUp class="icon" /></span>
	</button>
</div>
