export default class Keyboard {
	keysPressed: Set<string>
	private modifiers:string[] = ['meta', 'alt','control', 'shift']
	constructor(){
		this.keysPressed = new Set()
		window.addEventListener('keydown', this.addKeys)
		window.addEventListener('keyup', this.removeKeys)
	}

	has(...keys:string[]){
		for(let key of keys){
			if(!this.keysPressed.has(key.toLowerCase())) return false
		}
		return true
	}

	addKeys = (e:KeyboardEvent)=>{
		console.log(e)
		if(!this.modifiers.includes(e.key.toLowerCase())){
			this.keysPressed.add(e.key.toLowerCase())
		}
		if(e.altKey){
			this.keysPressed.add('alt')
		}
		if(e.ctrlKey){
			this.keysPressed.add('control')
		}
		if(e.metaKey){
			this.keysPressed.add('meta')
		}
	}

	removeKeys = (e:KeyboardEvent)=>{
		this.keysPressed.delete(e.key.toLowerCase())
		if(this.modifiers.includes(e.key.toLowerCase())){
			this.keysPressed.clear()
		}
	}

	leftDirection(){
		return this.has("a") || this.has("arrowleft")
	}
	rightDirection(){
		return this.has("d") || this.has("arrowright")
	}
	upDirection(){
		return this.has("w") || this.has("arrowup")
	}
	downDirection(){
		return this.has("s") || this.has("arrowdown")
	}
}
