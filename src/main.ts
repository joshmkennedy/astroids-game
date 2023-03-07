import './style.css'
import Game from './game'
import type { GameObject } from './gameObject'
import Player from "./player" 
import Camera from "./camera"
import Scene from "./scene"
import GameArea from './GameArea'


const canvas = document.querySelector<HTMLCanvasElement>("#canvas")
if (!canvas) {
	throw new Error('no canvas element')
}

const aspectRatio = 12 / 16;
const mapRatio = 422/1055;
const mapSize = {w:window.innerWidth * 4, h: ((window.innerWidth * 4) * mapRatio)}

const gameObjects: GameObject[] = [
	//order matters here
	new GameArea('/gamebg.png', mapSize),
	new Player(),
]

const game = new Game(canvas, aspectRatio, gameObjects);
game.start()
