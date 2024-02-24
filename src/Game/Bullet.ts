import Astroid from "./Astroid";
import Game from "./game";
import { GameObject } from "./gameObject";
import Shape from "./Shape";

export default class Bullet extends Shape {
	speed: number;
	angle: number;
	isActive: boolean;
	startPos: { x: number; y: number };
	baseDamage: number = 25;
	damage: number;
	constructor(pos: { x: number; y: number }) {
		super();
		this.isActive = false;
		this.startPos = pos;
		this.pos = pos;
		this.size = { w: 10, h: 10 };
		this.color = "#FA00FF";
		this.damage = this.baseDamage;
		//playing
		this.speed = 10;
		this.angle = 0;
	}

	update(game: Game) {
		if (!this.isActive) return;
		this.pos = this.findNextPos();
		if (
			this.pos.x > game.canvasEl.width ||
			this.pos.y > game.canvasEl.height ||
			this.pos.x < 0 ||
			this.pos.y < 0
		) {
			this.reset();
		}
	}
	draw(ctx: CanvasRenderingContext2D) {
		if (this.isActive) {
			ctx.fillStyle = this.color;
			let bulletWidth = this.size.w / 4;
			let x = this.pos.x + this.size.w / 2 - bulletWidth / 2;
			this.rotateShape(ctx);
			ctx.fillRect(x, this.pos.y, bulletWidth, this.size.h);
			ctx.restore();
		}
	}

	shoot(start: { x: number; y: number }, angle: number) {
		console.log("shooting");
		this.angle = angle;
		this.pos = start;
		this.rotation = this.angle + 90;
		this.isActive = true;
	}
	onCollision(obj: GameObject) {
		if (obj instanceof Astroid) {
			this.reset();
		}
	}
	findNextPos(): { x: number; y: number } {
		return {
			x: this.pos.x + this.speed * Math.cos((Math.PI * 2 * this.angle) / 360),
			y: this.pos.y + this.speed * Math.sin((Math.PI * 2 * this.angle) / 360),
		};
	}

	reset() {
		this.isActive = false;
		this.pos = this.startPos;
		this.rotation = 0;
		this.damage = this.baseDamage;
	}
}
