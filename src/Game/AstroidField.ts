import Astroid from "./Astroid";
import Game from "./game";
import { diagonalPoint } from "./utils";

export default class AstroidField {
	size: number;
	pool: Astroid[];
	cooldown: number;
	canFire: boolean;
	canFireTimerRef: number | undefined;
	astroidsCreated: number = 0;
	difficultyIncreasedAt: number = 5;

	constructor() {
		this.size = 100;
		this.pool = this.createPool();
		this.cooldown = 4000;
		this.canFire = true;
	}

	init(game: Game) {
		this.astroidsCreated = 0 
		this.pool.forEach((a) => a.reset());
		this.canFire = true;
		game.events.subscribe("PAUSED", this.clearTimer);
		game.events.subscribe("UNPAUSED", this.startCoolDown);
	}

	createPool() {
		return Array.from({ length: this.size }, () => new Astroid());
	}

	update(game: Game) {
		this.trySpawnAstroid(game.canvasEl.width, game.canvasEl.height);

		for (let i = 0; i < this.size; i++) {
			let astroid = this.pool[i];
			if (astroid.isActive) {
				astroid.update(game);
			}
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		for (let i = 0; i < this.size; i++) {
			let astroid = this.pool[i];
			if (astroid.isActive) {
				astroid.draw(ctx);
			}
		}
	}

	startCoolDown = () => {
		this.canFire = false;
		this.canFireTimerRef = setTimeout(
			() => (this.canFire = true),
			this.cooldown - this.spawnRateDifficulty(),
		);
	};

	clearTimer = () => {
		clearTimeout(this.canFireTimerRef);
	};

	trySpawnAstroid(w: number, h: number) {
		if (!this.canFire) return;
		for (let astroid of this.pool) {
			if (!astroid.isActive) {
				this.startCoolDown();
				let astroidSize = Math.floor(Math.random() * 100) + 25;
				astroid.size = { w: astroidSize, h: astroidSize };
				astroid.speed += this.astroidSpeedDifficulty();
				astroid.health = astroidSize

				let angle = Math.floor(Math.random() * 360);

				let startX = w/2
				let startY = h/2
				astroid.spawn(diagonalPoint({ x: startX, y: startY }, w / 2 + astroidSize, angle), {
					x: w / 2 - astroidSize / 2,
					y: h / 2 - astroidSize / 2,
				});
				console.log("astroids spawned", this.astroidsCreated)
				console.log("astroids difficulty", this.astroidSpeedDifficulty());
				console.log("astroids speed", astroid.speed);
				console.log("astroids spawnRate", this.cooldown - this.spawnRateDifficulty());

				this.astroidsCreated++;
				break;
			}
		}
	}
	astroidSpeedDifficulty() {
		return Math.min(
			.13,
			Math.floor(this.astroidsCreated / this.difficultyIncreasedAt) / 550,
		);
	}
	spawnRateDifficulty() {
		return Math.min(
			2000,
			Math.floor(this.astroidsCreated / this.difficultyIncreasedAt) * 300,
		);
	}
}
