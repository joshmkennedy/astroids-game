import Astroid from "./Astroid";
import BulletPool from "./bulletPool";
import type Game from "./game";
import GameArea from "./GameArea";
import { GameObject } from "./gameObject";
import Shape from "./Shape";
import { PlayerStats, PlayerStatsT } from "../App/store";

export default class Player extends Shape {
	direction: "left" | "right" | "up" | "down";
	speed: number;
	rotation: number;
	health: number;
	startHealth: number = 100;
	image: HTMLImageElement;
	bulletPool: BulletPool;
	money: number;
	spritesPos: Record<
		"up" | "down" | "left" | "right",
		{ w: number; h: number }
	>;
	constructor() {
		super();
		//these are base attributes all object will probably need
		this.pos = { x: 10, y: 100 };
		this.size = { w: 40, h: 40 };
		this.color = "red";
		//playing
		this.speed = 3;
		this.direction = "right";
		this.rotation = 0;
		this.bulletPool = new BulletPool(this);
		this.image = new Image();
		this.image.src = "/sprites/ship1.png";
		this.health = this.startHealth;
		this.money = 0;

		this.spritesPos = {
			right: { h: -18, w: 5 },
			left: { h: -18, w: this.size.w + 20 },
			up: { h: 16, w: 5 },
			down: { h: 16, w: 5 },
		};
	}
	init(game: Game) {
		this.reset();
		const gameArea = game.objects.find(
			(object) => object instanceof GameArea,
		) as GameArea;
		if (!gameArea) {
			throw new Error("cant find gameArea object");
		}

		this.pos = {
			x: game.canvasEl.width / 2 - this.size.w / 2,
			y: game.canvasEl.height / 2 - this.size.h / 2,
		};

		game.events.subscribe("ASTROID_DESTROYED", this.incMoney);
	}

	cleanUp(_:Game){
		this.reset()
	}

	update(game: Game) {
		if (game.keys.leftDirection()) {
			this.tryMoveLeft(game);
			this.direction = "left";
		}
		if (game.keys.rightDirection()) {
			this.tryMoveRight(game);
			this.direction = "right";
		}
		if (game.keys.has(" ")) {
			let fired = this.bulletPool.fire();
			if(fired){
				game.events.emit("PLAYER_SHOOT", null)
			}

		}

		this.bulletPool.update(game);

		if (this.health <= 0) {
			game.events.emit("PLAYER_DESTROYED", null);
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		this.rotateShape(ctx);
		// ctx.drawImage(this.image, this.spritesPos[this.direction].w, this.spritesPos[this.direction].h,this.size.w, this.size.h, this.pos.x, this.pos.y, this.size.w, this.size.h)
		// ctx.fillStyle ="green"
		// ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
		ctx.drawImage(this.image, this.pos.x, this.pos.y-2, this.size.w, this.size.h);
		ctx.restore();
		this.bulletPool.draw(ctx);
	}

	onCollision(object: GameObject, game:Game) {
		if (object instanceof Astroid) {
			this.updateHealth(this.health - object.getDamage() );
			game.events.emit("PLAYER_DAMAGED", null)
		}
	}

	tryMoveLeft(_: Game) {
		console.log("left?");
		this.rotation = this.rotation - (this.speed % 360);
	}

	tryMoveRight(_: Game) {
		this.rotation = (this.rotation + this.speed) % 360;
	}

	reset() {
		this.rotation = 0;
		this.updateHealth(this.startHealth);
		this.updateMoney(0)
	}

	updateHealth(health:number) {
		this.health = health
		PlayerStats.update((stats: PlayerStatsT) => {
			stats.health = this.health;
			return stats;
		});
	}

	incMoney = ()=> {
		this.updateMoney(this.money + 10);
	}

	//this is a callback so it needs to be an arrow fn
	updateMoney = (money:number) => {
		this.money = money
		PlayerStats.update((stats: PlayerStatsT) => {
			stats.money = this.money;
			return stats;
		});
	};


}
