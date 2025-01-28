import Game from "./game";
import type { GameObject } from "./gameObject";
import Player from "./player";
import GameArea from "./GameArea";
import AstroidField from "./AstroidField";
import BulletPool from "./bulletPool";
import { ShipBaseConfig } from "../storage/shipAttributes";

export default function createGame(canvas: HTMLCanvasElement):Game{
	const mapSize = { w: canvas.width, h: canvas.height };
	let astroidField = new AstroidField();
	let player = new Player(ShipBaseConfig)
	let bulletPool = new BulletPool(player, {damage:ShipBaseConfig.damage, cooldown:ShipBaseConfig.cooldown})
	player.bulletPool = bulletPool

	const gameObjects: GameObject[] = [
		//order matters here
		new GameArea("/bg.png", mapSize),
		player,
		astroidField,
		...astroidField.pool,
		...bulletPool.pool
	];

	const game = new Game(canvas, gameObjects);
	return game
}
