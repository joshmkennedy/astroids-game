import {writable} from "svelte/store"
export type Route = "Start"|"Store"|"Game"
export const currentScreen = writable<Route>("Start")

export function navigate(path:Route){
	currentScreen.set(path)
}

export const GameState = createGameStateStore("STOPPED")
export type GAMESTATE = ("STOPPED"|"PLAYING"|"PAUSED")
function createGameStateStore(initial:GAMESTATE){
	const {subscribe, set} = writable<GAMESTATE>(initial)
	return {
		subscribe,
		start(){
			set("PLAYING")
		},
		stop(){
			set("STOPPED")
		},
		pause(){
			set("PAUSED")
		},
	}
}

export type PlayerStatsT = {health:number, money:number}
export const PlayerStats = writable<PlayerStatsT>({health:100, money:0})
