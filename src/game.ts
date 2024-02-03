import Keyboard from "./Keyboard";
import type { GameObject } from "./gameObject";

export default class Game {
  canvasEl: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  shouldEnd: boolean = false;
  lastTime: number | undefined;
  objects: GameObject[];
  interval = 6;
  keys: Keyboard;
  aspectRatio: number;
  // store:Store
  constructor(
    canvasEl: HTMLCanvasElement,
    aspectRatio: number,
    objects: GameObject[]
  ) {
    this.canvasEl = canvasEl;

    const dpi = window.devicePixelRatio;
    this.ctx = this.canvasEl.getContext("2d");
    this.ctx?.scale(dpi, dpi);
    this.aspectRatio = aspectRatio
    this.canvasEl.width = window.innerWidth;
    this.canvasEl.height = window.innerHeight * this.aspectRatio;


    // this.store = new Store();
    this.keys = new Keyboard();

    this.objects = objects;
  }

  start() {
    // doAction('before_loop')
    for( let object of this.objects ){
      if('init' in object){
        object.init?.(this) 
      }
    }
    //start loop
    requestAnimationFrame(this.loop);
  }

  //Need to be a arrow function so that we can
  //retain this to be Game when called from requestAnimationFrame
  loop = (delta: number) => {
    const req = requestAnimationFrame(this.loop);
    // console.log("loop run start");
    if (!this.ctx) return;
    if (!this.lastTime) {
      this.lastTime = delta;
    }
    const elapsedTime = delta - this.lastTime;
    if (elapsedTime > this.interval) {
      this.ctx.clearRect(
        0,
        0,
        this.canvasEl.width + 1,
        this.canvasEl.height + 17
      );

      this.update(this);

      this.draw(this.ctx);

      this.lastTime = delta;
    }

    if (this.shouldEnd) {
      cancelAnimationFrame(req);
    }
    // console.log("loop run end");
  };

  update(game: Game) {
    for (let i = 0; i < this.objects.length; i++) {
      const object = this.objects[i];
      object.update(game);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.objects.length; i++) {
      const object = this.objects[i];
      object.draw(ctx);
    }
  }
}
