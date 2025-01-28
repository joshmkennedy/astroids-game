<script lang="ts">
	import { onMount } from "svelte";
	import { PlayerStats, navigate } from "../store";
	import GameScreenControls from "./GameScreenControls.svelte";
	import Game from "../../Game/game";

	import createGame from "../../Game/main";
	import PlayerStatsDisplay from "./PlayerStatsDisplay.svelte";
	import LooseScreen from "./LooseScreen.svelte";

	import EventBorderIndicator from "./EventBorderIndicator.svelte";
  import Bank from "../../storage/bank";

	let game: Game;
	let canvasEl: HTMLCanvasElement;
	let winHeight = window.innerHeight;

	let showDamageHappen: () => void;
	function addListeners(game: Game) {
		game.events.subscribe("PLAYER_DESTROYED", onLoose);
		game.events.subscribe("PLAYER_DAMAGED", showDamageHappen);
	}
	onMount(() => {
		const { width, height } = canvasEl.getBoundingClientRect();
		canvasEl.width = width;
		canvasEl.height = height;
		game = createGame(canvasEl);
		addListeners(game);
		game.start();
	});

	let playerDied = false;
	function onLoose() {
		Bank.increaseMoney($PlayerStats.money);
		playerDied = true;
	}

	function pause() {
		if (game instanceof Game) {
			game.pause();
		}
	}

	function play() {
		if (game instanceof Game) {
			game.unpause();
		}
		canvasEl.focus();
	}

	function quit() {
		playerDied = false;
		if (game instanceof Game) {
			game.stop();
		}
		navigate("Start");
	}

	function restart() {
		playerDied = false;
		if (game instanceof Game) {
			game.restart();
			addListeners(game);
		}
		canvasEl.focus();
	}

	function toggleSound() {
		if (game instanceof Game) {
			if (game.soundboard.isOn) {
				game.soundboard.turnOff();
			} else {
				game.soundboard.turnOn();
			}
		}
		canvasEl.focus();
	}
</script>

<div
	class="fixed translate-x-[-50%] left-[50%] p-5"
	style={`width:${winHeight}px; height:${winHeight}px`}
>
	<div class="relative w-full h-full">
		<div
			class="z-10 absolute top-0 left-0 text-white flex justify-between w-full font-bold px-2"
		>
			<GameScreenControls {toggleSound} {play} {pause} {restart} {quit} />
			<PlayerStatsDisplay />
		</div>
		<canvas
			tabindex="-1"
			class="absolute shadow-2xl shadow-cyan-800 focus:outline-0 inset-0 w-full h-full"
			bind:this={canvasEl}
		/>
	</div>
	<EventBorderIndicator bind:showDamageHappen />
	{#if playerDied}
		<LooseScreen {restart} {quit} />
	{/if}
</div>
