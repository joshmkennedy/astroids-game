import type Game from "./game";
import GameArea from "./GameArea";
import Shape from "./Shape";

export default class Player extends Shape {
	direction: 1 | -1;
	speed: number;
	locked: { x: boolean; y: boolean };
	gameArea?: GameArea;
	constructor() {
		super();
		//these are base attributes all object will probably need
		(this.pos = { x: 10, y: 100 }),
			(this.size = { w: 100, h: 100 }),
			(this.color = "red"),
			(this.locked = { x: false, y: false });
		//playing
		this.speed = 4;
		this.direction = 1;
	}
	velocity() {
		return this.direction * this.speed;
	}
	init(game: Game) {
		const gameArea = game.objects.find(
			(object) => object instanceof GameArea,
		) as GameArea;
		if (!gameArea) {
			throw new Error("cant find gameArea object");
		}
		this.gameArea = gameArea;

		this.pos = {
			x: game.canvasEl.width / 2 - this.size.w / 2,
			y: game.canvasEl.height / 2 - this.size.h / 2,
		};
		this.locked = { x: true, y: true };
	}

	update(game: Game) {
		if (!this.gameArea) {
			throw new Error("Still don't have GameArea Object");
		}

		if (game.keys.leftDirection()) {
			this.tryMoveLeft(game);
		}
		if (game.keys.rightDirection()) {
			this.tryMoveRight(game);
		}
		if (game.keys.has("arrowup")) {
			this.tryMoveUp(game);
		}
		if (game.keys.has("arrowdown")) {
			this.tryMoveDown(game);
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = this.color;
		ctx[this.drawShape](this.pos.x, this.pos.y, this.size.w, this.size.h);
	}

	tryMoveLeft(game: Game) {
		if (this.gameArea?.isAtXEnd(game)) {
			if (this.pos.x > 0) {
				this.pos.x -= this.speed;
			}
		}
	}

	tryMoveRight(game: Game) {
		if (this.gameArea?.isAtXEnd(game)) {
			if (this.pos.x < game.canvasEl.width - this.size.w) {
				this.pos.x += this.speed;
			}
		}
	}

	tryMoveUp(game: Game) {
		if (this.gameArea?.isAtYEnd(game)) {
			if (this.pos.y > 0) {
				this.pos.y -= this.speed;
			}
		}
	}

	tryMoveDown(game: Game) {
		if (this.gameArea?.isAtYEnd(game)) {
			if (this.pos.y < game.canvasEl.height - this.size.h) {
				this.pos.y += this.speed;
			}
		}
	}

	isAboveCenter(game: Game) {
		return this.pos.y <= game.canvasEl.height / 2 - this.size.h / 2;
	}
	isBelowCenter(game: Game) {
		return this.pos.y >= game.canvasEl.height / 2 - this.size.h / 2;
	}
	isLeftCenter(game: Game) {
		return this?.pos?.x <= game.canvasEl.width / 2 - this.size.w / 2;
	}
	isRightCenter(game: Game) {
		return this.pos?.x >= game.canvasEl.width / 2 - this.size.w / 2;
	}
}
