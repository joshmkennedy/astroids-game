import type Game from "./game"
import Shape from "./Shape"

export default class Player extends Shape {
	direction:1|-1
	speed:number
	constructor(
	){
		super()
		//these are base attributes all object will probably need
		this.pos = {x:10, y:100},
		this.size = {w:100, h:100},
		this.color = "red",

		//playing
		this.speed = 4
		this.direction = 1
	}
	velocity(){
		return this.direction * this.speed
	}
	update(game:Game){
		this.pos = {
			x: game.canvasEl.width / 2 - (this.size.w / 2),
			y: game.canvasEl.height / 2 - (this.size.h / 2)
		}

		// // if ((this.pos.x + this.size.w) >= game.canvasEl.width / 3){
		// // 	console.log("changing direction")
		// // 	this.direction = -1
		// // } else if(this.pos.x < 0){
		// // 	this.direction = 1
		// // }
		// this.pos.x += this.velocity()
	}

	draw(ctx:CanvasRenderingContext2D){
		ctx.fillStyle = this.color
		ctx[this.drawShape](this.pos.x, this.pos.y, this.size.w, this.size.h )
	}
}
