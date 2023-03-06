import type { GameObject } from "./gameObject"

export default class Game {
	canvasEl:HTMLCanvasElement
	ctx:CanvasRenderingContext2D | null
	shouldEnd:boolean = false
	objects:GameObject[]

	constructor(canvasEl:HTMLCanvasElement, objects: GameObject[]){
		this.canvasEl = canvasEl
		this.canvasEl.height = window.innerHeight
		this.canvasEl.width = window.innerWidth

		const dpi = window.devicePixelRatio;
		this.ctx = this.canvasEl.getContext('2d')
		this.ctx?.scale(dpi, dpi)

		this.objects = objects
	}

	start(){
		// doAction('before_loop')
		
		//start loop
		requestAnimationFrame(this.loop)
	}

	loop = ( delta: number )=>{
		console.log('loop run start')	
		if(!this.ctx) return
		const req = requestAnimationFrame(this.loop)

		this.update(delta)

		// this.draw()

		if(this.shouldEnd){
			cancelAnimationFrame(req)
		}
		console.log('loop run end')
	}

	update(delta:number){
		for ( let i = 0; i < this.objects.length; i++ ) {
			const object = this.objects[i]
			object.update(delta)
		}
	}
}
