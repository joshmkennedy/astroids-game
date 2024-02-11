import Keyboard from "./Keyboard";
import type { GameObject } from "./gameObject";
import Shape from "./Shape";
import EventBus from "./eventBus";
import { GameState } from "../App/store";
import Soundboard from "./Soundboard";

export default class Game {
	canvasEl: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D | null;
	shouldEnd: boolean = false;
	lastTime: number | undefined;
	objects: GameObject[];
	interval = 6;
	keys: Keyboard;
	events: EventBus;
	soundboard: Soundboard;
	// store:Store
	constructor(canvasEl: HTMLCanvasElement, objects: GameObject[]) {
		this.canvasEl = canvasEl;

		const dpi = window.devicePixelRatio;
		this.ctx = this.canvasEl.getContext("2d");
		this.ctx?.scale(dpi, dpi);
		this.canvasEl.height = window.innerHeight;
		this.canvasEl.width = window.innerHeight;

		// this.store = new Store();
		this.keys = new Keyboard();

		this.objects = objects;
		this.events = new EventBus();
		this.soundboard = new Soundboard();
	}

	start() {
		GameState.start();
		this.shouldEnd = false;
		this.keys.start();

		this.events.subscribe("PLAYER_DESTROYED", this.stopWithoutClearing);
		this.soundboard.setupListeners(this);
		this.soundboard.startMusic();
		for (let object of this.objects) {
			if ("init" in object) {
				object.init?.(this);
			}
		}
		//start loop
		console.log("start");
		this.startLoop();
	}

	startLoop() {
		requestAnimationFrame(this.loop);
	}
	//Need to be a arrow function so that we can
	//retain this to be Game when called from requestAnimationFrame
	loop = (delta: number) => {
		const req = requestAnimationFrame(this.loop);
		// console.log("loop run start");
		if (!this.ctx) return;
		if (!this.lastTime) {
			this.lastTime = delta;
		}
		const elapsedTime = delta - this.lastTime;
		if (elapsedTime > this.interval) {
			this.ctx.clearRect(
				0,
				0,
				this.canvasEl.width + 1,
				this.canvasEl.height + 17,
			);

			this.update(this);

			this.detectCollisions(this);

			this.draw(this.ctx);

			this.lastTime = delta;
		}

		if (this.shouldEnd) {
			cancelAnimationFrame(req);
		}
		// console.log("loop run end");
	};

	update(game: Game) {
		for (let i = 0; i < this.objects.length; i++) {
			const object = this.objects[i];
			object.update(game);
		}
	}

	detectCollisions(_: Game) {
		let collidableObjects = this.objects;

		for (let i = 0; i < collidableObjects.length; i++) {
			const objectA: GameObject & {
				onCollision?: (gameObject: GameObject, game: Game) => void;
			} = collidableObjects[i];
			if (
				!(objectA instanceof Shape) ||
				!("onCollision" in objectA) ||
				!objectA.isActive
			)
				continue;
			for (let j = 0; j < collidableObjects.length; j++) {
				const objectB: GameObject & {
					onCollision?: (gameObject: GameObject, game: Game) => void;
				} = collidableObjects[j];
				if (
					!(objectB instanceof Shape) ||
					!("onCollision" in objectB) ||
					!objectB.isActive
				)
					continue;
				if (this.collides(objectA, objectB)) {
					//@ts-ignore
					objectA.onCollision(objectB, this);
					//@ts-ignore
					objectB.onCollision(objectA, this);
				}
			}
		}
	}

	collides(a: Shape, b: Shape) {
		const aLeft = a.pos.x;
		const aRight = a.pos.x + a.size.w;
		const bLeft = b.pos.x;
		const bRight = b.pos.x + b.size.w;
		const aTop = a.pos.y;
		const aBottom = a.pos.y + a.size.h;
		const bTop = b.pos.y;
		const bBottom = b.pos.y + b.size.h;

		return (
			aLeft <= bRight && aRight > bLeft && aTop < bBottom && aBottom > bTop
		);
	}

	draw(ctx: CanvasRenderingContext2D) {
		for (let i = 0; i < this.objects.length; i++) {
			const object = this.objects[i];
			object.draw(ctx);
		}
	}

	pause = () => {
		this.events.emit("PAUSED", null);
		this.shouldEnd = true;
		GameState.pause();
	};

	unpause = () => {
		this.shouldEnd = false;
		this.events.emit("UNPAUSED", null);
		this.startLoop();
		GameState.start();
	};

	stop = () => {
		this.shouldEnd = true;
		this.cleanUp();
		GameState.stop();
	};

	stopWithoutClearing = () => {
		this.shouldEnd = true;
		GameState.stop();
	};

	restart = () => {
		GameState.stop();
		this.stop();
		this.start();
		GameState.start();
	};

	cleanUp() {
		this.keys.stop();
		this.events.clear();
		this.soundboard.cleanUp();
		for (let i = 0; i < this.objects.length; i++) {
			const object = this.objects[i];
			object.cleanUp?.(this);
		}
	}
}
