import type Game from "./game";

export default class GameArea {
	bgImage: CanvasImageSource;
	pos: { x: number; y: number };
	size: { w: number; h: number };
	speed: number;
	constructor(bgImageUrl: string, size: { w: number; h: number }) {
		this.size = size;
		this.pos = { x: 0, y: 0 };
		this.bgImage = new Image(this.size.w, this.size.h);
		this.bgImage.src = bgImageUrl;
		this.speed = 4;
	}

	init(_: Game) {}
	update(_: Game) {}
	draw(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(
			this.bgImage,
			this.pos.x,
			this.pos.y,
			this.size.w,
			this.size.h,
		);
	}
}
