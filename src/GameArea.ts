import type Game from "./game";
import Player from "./player";

export default class GameArea {
	bgImage: CanvasImageSource;
	pos: { x: number; y: number };
	size: { w: number; h: number };
	speed: number;
	player?: Player;
	// blocked:{l:boolean,r:boolean,t:boolean,b:boolean};
	constructor(bgImageUrl: string, size: { w: number; h: number }) {
		// this.pos = {x:0,y:0},
		this.size = size;
		// this.pos = {x:(this.size.w / 2)*-1, y:-100},
		(this.pos = { x: 0, y: -100 }),
			(this.bgImage = new Image(this.size.w, this.size.h));
		this.bgImage.src = bgImageUrl;
		this.speed = 4;
		// this.blocked = {l:false,r:false,t:false,b:false};
	}

	init(game: Game) {
		const player = game.objects.find(
			(object) => object instanceof Player,
		) as Player;
		if (!player) {
			throw new Error("Couldnt find Player Object");
		}
		this.player = player;
	}
	update(game: Game) {
		if (!this.player) {
			throw new Error("Still dont have Player Object");
		}

		if (game.keys.leftDirection()) {
			this.tryMoveRight(game);
		}

		if (game.keys.rightDirection()) {
			this.tryMoveLeft(game);
		}

		if (game.keys.upDirection()) {
			this.tryMoveDown(game);
		}
		if (game.keys.downDirection()) {
			this.tryMoveUp(game);
		}
	}
	draw(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(
			this.bgImage,
			this.pos.x,
			this.pos.y,
			this.size.w,
			this.size.h,
		);
	}

	tryMoveRight(game: Game) {
		if (
			this.player?.isLeftCenter(game)
		) {
			if (this.pos.x < 0) {
				this.pos.x += this.speed;
			}
		}
	}
	tryMoveLeft(game: Game) {
		if (
			this.player?.isRightCenter(game)
		) {
			if (this.pos.x > (this.size.w - game.canvasEl.width) * -1) {
				this.pos.x -= this.speed;
			}
		}
	}
	tryMoveUp(game: Game) {
		if (
			this.player?.isBelowCenter(game)
		) {
			if (this.pos.y > (this.size.h - game.canvasEl.height) * -1) {
				this.pos.y -= this.speed;
			}
		}
	}
	tryMoveDown(game: Game) {
		if (
			this.player?.isAboveCenter(game)
		) {
			if (this.pos.y < 0) {
				this.pos.y += this.speed;
			}
		}
	}

	isAtXEnd(game: Game) {
		return (
			this.pos?.x >= 0 || this.pos.x <= (this.size.w - game.canvasEl.width) * -1
		);
	}
	isAtYEnd(game: Game) {
		return this.pos?.y >= 0 || this.pos.y <= (this.size.h - game.canvasEl.height) * -1;
	}
}
