<script lang="ts">
	import { currentScreen } from "../store";
	import GameScreen from "./GameScreen.svelte";
	import StoreScreen from "./StoreScreen.svelte";
	import StartScreen from "./StartScreen.svelte";
</script>

{#if $currentScreen == "Start"}
	<StartScreen />
{:else if $currentScreen == "Store"}
	<StoreScreen />
{:else if $currentScreen == "Game"}
	<GameScreen />
{/if}
