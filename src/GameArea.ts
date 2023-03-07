import type Game from "./game";

export default class GameArea{
	bgImage:CanvasImageSource;
	pos:{x:number, y:number};
	size:{w:number, h:number};
	speed:number;
	constructor(bgImageUrl:string, size:{w:number,h:number}){
		// this.pos = {x:0,y:0},
		this.pos = {x:-2664,y:0},
		this.size = size
		this.bgImage = new Image(this.size.w, this.size.h);
		this.bgImage.src = bgImageUrl
		this.speed = 4
	}
	update(game:Game){
		if( game.keys.has('arrowleft') ){
			this.tryMoveRight(game)
		}

		if( game.keys.has('arrowright') ){
			this.tryMoveLeft(game)
		}

		if( game.keys.has('arrowup') ){
			this.tryMoveDown(game)
		}
		if( game.keys.has('arrowdown') ){
			this.tryMoveUp(game)
		}

	}
	draw(ctx:CanvasRenderingContext2D){
		ctx.drawImage(this.bgImage,this.pos.x,this.pos.y, this.size.w, this.size.h);
	}

	tryMoveRight(game:Game){
		if( this.pos.x < 0){
			console.log(this.pos.x, this.size.w)
			this.pos.x+= this.speed
		} else {
			console.log(this.pos.x, this.size.w)
		}
	}
	tryMoveLeft(game:Game){
		console.log(this.pos.x, this.size.w)
		if( this.pos.x > (this.size.w - game.canvasEl.width) * -1){
			this.pos.x -= this.speed
		}
	}
	tryMoveUp(game:Game){
		if( this.pos.y > (this.size.h - game.canvasEl.height) * -1){
			this.pos.y -= this.speed
		}
	}
	tryMoveDown(game:Game){
		if( this.pos.y < 0 ){
			this.pos.y += this.speed
		}
	}
}
