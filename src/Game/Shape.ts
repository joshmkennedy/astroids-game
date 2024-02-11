export default class Shape {
  pos: { x: number; y: number } = { x: 0, y: 0 };
  size: { w: number; h: number } = { w: 10, h: 10 };
  color: string = "black";
  drawShape: "fillRect" | "rect" = "fillRect";
	rotation:number = 0;
	isActive = true
	

	rotateShape(ctx:CanvasRenderingContext2D){
		ctx.save();
		ctx.translate(this.pos.x + this.size.w / 2, this.pos.y + this.size.h / 2);
		ctx.rotate((this.rotation * Math.PI) / 180);
		ctx.translate(
			-1 * (this.pos.x + this.size.w / 2),
			-1 * (this.pos.y + this.size.h / 2),
		);
	}
}

