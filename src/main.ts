import './style.css'
import Game from './game'
import type { GameObject } from './gameObject'
import Player from "./player" 


const canvas = document.querySelector<HTMLCanvasElement>("#canvas")
if (!canvas) {
	throw new Error('no canvas element')
}

const gameObjects: GameObject[] = [
	new Player()
]

const game = new Game(canvas, gameObjects);
game.start()
