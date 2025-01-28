import { ShipConfigType, ShipUpgradesT } from "../storage/shipAttributes";
import Bullet from "./Bullet";
import Game from "./game";
import Player from "./player";
import { diagonalPoint } from "./utils";

export default class BulletPool {
  size: number;
  player: Player;
  pool: Bullet[];
  cooldown: number;
	damage:number;
  canFire: boolean;
  attributes: BulletPoolAttributes;
  constructor(player: Player, config:Pick<ShipConfigType, "cooldown"|"damage">) {
    this.size = 100;
    this.player = player;
    this.pool = this.createPool();
		this.damage = config.damage;
    this.cooldown = config.cooldown;
    this.canFire = true;
    this.attributes = {} as BulletPoolAttributes;
  }
  update(game: Game) {
    for (let i = 0; i < this.size; i++) {
      let bullet = this.pool[i];
      if (bullet.isActive) {
        bullet.update(game);
      }
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.size; i++) {
      let bullet = this.pool[i];
      if (bullet.isActive) {
        bullet.draw(ctx);
      }
    }
  }
  createPool() {
    return Array.from(
      { length: this.size },
      () => new Bullet({ x: this.player.pos.x, y: this.player.pos.y }),
    );
  }
  bulletStartPos() {
    return diagonalPoint(
      {
        x: this.player.pos.x + this.player.size.w / 2,
        y: this.player.pos.y + this.player.size.h / 2,
      },
      this.player.size.w / 2,
      this.player.rotation,
    );
  }
  startCoolDown() {
    this.canFire = false;
    const cooldown =
      this.cooldown -
      (this.attributes.cooldown.value ?? 0) * this.cooldown;
    setTimeout(() => (this.canFire = true), cooldown);
  }

  fire() {
    if (!this.canFire) return false;

    for (let bullet of this.pool) {
      if (!bullet.isActive) {
        this.startCoolDown();
        bullet.damage =
          this.damage + this.damage * (this.attributes.damage.value ?? 0);
        bullet.shoot(this.bulletStartPos(), this.player.rotation);
        break;
      }
    }
    return true;
  }

  loadAttributes(attributes: BulletPoolAttributes) {
    this.attributes = attributes;
  }
}

export type BulletPoolAttributes = Pick<ShipUpgradesT, ("cooldown"| "damage")>
