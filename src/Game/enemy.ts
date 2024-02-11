import Game from "./game";
import GameArea from "./GameArea";
import { GameObject } from "./gameObject";
import Player from "./player";
import Shape from "./Shape";

export default class Enemy extends Shape {
  gameArea?: GameArea;
  root: { x: number; y: number };
  speed: number;
  path: { x: number; y: number }[];
  currentPathStepIdx: number;
  positionInPath: { x: number; y: number };
  image: HTMLImageElement;
  direction: "left" | "right" | "up" | "down";
  spritesPos: Record<
    "up" | "down" | "left" | "right",
    { w: number; h: number }
  >;

  constructor(root: { x: number; y: number }) {
    super();
    this.root = { ...root };
    this.pos = { x: 10, y: 100 };
    this.size = { w: 100, h: 100 };
    this.color = "limegreen";
    this.speed = 10;
    this.path = [
      { x: 400, y: 0 },
      { x: -400, y: 0 },
    ];
    this.positionInPath = { x: this.path[0].x, y: this.path[0].y };
    this.currentPathStepIdx = 1;
    this.direction = "right";

    this.image = new Image();
    this.image.src = "/sprites/shark.png";
    this.spritesPos = {
      right: { h: -18, w: 5 },
      left: { h: -18, w: this.size.w  },
      up: { h: 16, w: 5 },
      down: { h: 16, w: 5 },
    };
  }
  init(game: Game) {
    const gameArea = game.objects.find(
      (object) => object instanceof GameArea,
    ) as GameArea;
    if (!gameArea) {
      throw new Error("Couldnt find Player Object");
    }
    this.gameArea = gameArea;

    this.pos.x = this.gameArea?.pos.x + this.root.x + this.positionInPath.x;
    this.pos.y = this.gameArea?.pos.y + this.root.y + this.positionInPath.y;
  }

  onCollision(object: GameObject) {
    if (object instanceof Player) {
      console.log("collided with player");
    }
  }

  update(_: Game) {
    if (!this.gameArea) return;
    this.moveTowardsStep();
    this.pos.x = this.gameArea?.pos.x + this.root.x + this.positionInPath.x;
    this.pos.y = this.gameArea?.pos.y + this.root.y + this.positionInPath.y;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.spritesPos[this.direction].w,
      this.spritesPos[this.direction].h,
      this.size.w,
      this.size.h,
      this.pos.x,
      this.pos.y,
      this.size.w,
      this.size.h,
    );
  }

  moveTowardsStep() {
    let goalX = this.path[this.currentPathStepIdx].x;
    let goalY = this.path[this.currentPathStepIdx].y;
    let updatedX = this.positionInPath.x;
    let updatedY = this.positionInPath.y;

    if (goalX < 0 && updatedX >= goalX) {
			this.direction = "left"
      updatedX -= this.speed;
    } else if (goalX >= 0 && updatedX <= goalX) {
			this.direction = "right"
      updatedX += this.speed;
    }
    if (goalY < 0 && updatedY >= goalY) {
      updatedY -= this.speed;
    } else if (goalY >= 0 && updatedY <= goalY) {
      updatedY += this.speed;
    }
    if (
      updatedX == this.positionInPath.x &&
      updatedY == this.positionInPath.y
    ) {
      this.currentPathStepIdx =
        (this.currentPathStepIdx + 1) % this.path.length;
    }

    this.positionInPath = {
      x: updatedX,
      y: updatedY,
    };
  }
}
