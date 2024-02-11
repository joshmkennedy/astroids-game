import Astroid from "./Astroid";
import Game from "./game";
import { GameObject } from "./gameObject";
import Shape from "./Shape";

export default class Bullet extends Shape {
	speed: number;
	angle: number;
	isActive: boolean;
	startPos: { x: number; y: number };
	damage:number = 25;
	constructor(pos: { x: number; y: number }) {
		super();
		this.isActive = false;
		this.startPos = pos;
		this.pos = pos;
		this.size = { w: 10, h: 10 };
		this.color = "red";
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
			this.isActive = false;
			this.angle = 0;
			this.pos = { ...this.startPos };
		}
	}
	draw(ctx: CanvasRenderingContext2D) {
		if (this.isActive) {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
		}
	}

	shoot(start: { x: number; y: number }, angle: number) {
		console.log("shooting");
		this.angle = angle;
		this.pos = start;
		this.isActive = true;
	}
	onCollision(obj:GameObject){
		if( obj instanceof Astroid){
			this.isActive = false
			this.pos = this.startPos
		}
		
	}
	findNextPos(): { x: number; y: number } {
		return {
			x: this.pos.x + this.speed * Math.cos((Math.PI * 2 * this.angle) / 360),
			y: this.pos.y + this.speed * Math.sin((Math.PI * 2 * this.angle) / 360),
		};
	}
}
