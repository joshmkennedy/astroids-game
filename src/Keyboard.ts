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

		console.log([...this.keysPressed])
	}

	removeKeys = (e:KeyboardEvent)=>{
		console.log(e)
		this.keysPressed.delete(e.key.toLowerCase())
		if(this.modifiers.includes(e.key.toLowerCase())){
			this.keysPressed.clear()
		}
		console.log([...this.keysPressed])
	}
}
