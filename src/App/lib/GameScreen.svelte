<script lang="ts">
	import { onMount } from "svelte";
	import { navigate  } from "../store";
	import GameScreenControls from "./GameScreenControls.svelte";
	import Game from "../../Game/game";

	import createGame from "../../Game/main";
    import PlayerStatsDisplay from "./PlayerStatsDisplay.svelte";
    import LooseScreen from "./LooseScreen.svelte";
	let game: Game;
	let canvasEl: HTMLCanvasElement;
	let winHeight = window.innerHeight;
	onMount(() => {
		canvasEl.width = winHeight;
		canvasEl.height = winHeight;
		game = createGame(canvasEl);
		game.events.subscribe("PLAYER_DESTROYED", showLooseOverlay);
		game.start();
	});

	let playerDied = false;
	function showLooseOverlay() {
		console.log("Player died")
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
			game.events.subscribe("PLAYER_DESTROYED", showLooseOverlay)
		}
		canvasEl.focus();
	}
	function toggleSound(){
		if(game instanceof Game){
			if(game.soundboard.isOn){
				game.soundboard.turnOff()
			}else{
				game.soundboard.turnOn()
			}
		}
		canvasEl.focus();
	}
</script>

<div class="fixed translate-x-[-50%] left-[50%]" style={`width:${winHeight}px; height:${winHeight}px`}>
	<div
		class="z-10 absolute top-0 left-0 text-white flex justify-between w-full font-bold"
	>
		<GameScreenControls { toggleSound } {play} {pause} {restart} {quit} />
		<PlayerStatsDisplay/>
	</div>

	<canvas
		tabindex="-1"
		class="absolute focus:outline-0 inset-0 w-full h-full"
		bind:this={canvasEl}
	/>
	{#if playerDied }
		<LooseScreen {restart} {quit}/>
	{/if}
</div>
