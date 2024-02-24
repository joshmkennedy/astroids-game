import Bullet from "./Bullet";
import Game from "./game";
import { GameObject } from "./gameObject";
import Player from "./player";
import Shape from "./Shape";

export default class Astroid extends Shape {
	isActive: boolean = false;
	angle: number = 0;
	startPos: { x: number; y: number } = { x: 0, y: 0 };
	speed: number = 0.1;
	startHealth: number = 100;
	health: number;
	damagePercent: number;
	image: HTMLImageElement;
	rotationDirection: -1 | 1;
	constructor() {
		super();
		this.image = new Image();
		this.image.src = "/sprites/Rock1.png";
		this.color = "white";
		this.size = { w: 200, h: 200 };
		this.health = this.startHealth;
		this.damagePercent = 0.1;
		this.rotationDirection = Math.random() > 0.5 ? 1 : -1;
	}

	update(game: Game) {
		if (!this.isActive) return;
		this.pos = this.findNextPos();
		this.rotation += this.rotationDirection;
		if (
			this.pos.x > game.canvasEl.width + 400 ||
			this.pos.y > game.canvasEl.height + 400 ||
			this.pos.x < -400 ||
			this.pos.y < -400
		) {
			this.reset();
		}
		if (this.health <= 0) {
			this.reset();
			game.events.emit("ASTROID_DESTROYED", this.size);
		}
	}
	draw(ctx: CanvasRenderingContext2D) {
		if (this.isActive) {
			this.rotateShape(ctx);

			let astroidWidth = this.size.w + 20;
			let x = this.pos.x + this.size.w / 2 - astroidWidth / 2;
			let y = this.pos.y + this.size.h / 2 - astroidWidth / 2;
			ctx.drawImage(this.image, x, y, astroidWidth, astroidWidth);
			ctx.restore();
		}
	}

	onCollision(obj: GameObject) {
		if (obj instanceof Player) {
			this.reset();
		}
		if (obj instanceof Bullet) {
			console.log("damaged by bullet");
			this.health -= obj.damage;
		}
	}

	findNextPos(): { x: number; y: number } {
		return {
			x: this.pos.x + this.speed * Math.cos((Math.PI * 2 * this.angle) / 360),
			y: this.pos.y + this.speed * Math.sin((Math.PI * 2 * this.angle) / 360),
		};
	}

	spawn(startPos: { x: number; y: number }, center: { x: number; y: number }) {
		this.isActive = true;
		let radians = Math.atan2(center.y - startPos.y, center.x - startPos.x);
		if (radians < 0) {
			radians += Math.PI * 2;
		}

		this.angle = radians * (180 / Math.PI);
		this.startPos = startPos;
		this.pos = startPos;
	}

	reset() {
		this.isActive = false;
		this.health = this.startHealth;
		this.pos = this.startPos;
	}

	getDamage() {
		return this.size.w * this.damagePercent;
	}
}
