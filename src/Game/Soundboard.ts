import Game from "./game";

export default class Soundboard {
	sounds: Record<string, HTMLAudioElement>;
	isOn: boolean = false;
	constructor() {
		this.sounds = {
			shoot: new Audio("/sounds/gun-blast.wav"),
			astroidDestroyed: new Audio("/sounds/impact01.wav"),
			shipWrek: new Audio("/sounds/shipwrek.wav"),
			bgMusic: new Audio("/sounds/bg-music.wav"),
		};
	}

	shoot = () => {
		this.sounds.shoot.volume = 0.5;
		this.play("shoot");
	};
	astroidDestroyed = () => {
		this.play("astroidDestroyed");
	};
	shipWrek = () => {
		this.play("shipWrek");
	};
	startMusic = () => {
		this.sounds.bgMusic.loop = true;
		this.sounds.bgMusic.volume = 0.2;
		if(this.isOn){
			this.sounds.bgMusic.play();
		}
	};
	pauseBgMusic = () => {
		this.sounds.bgMusic.pause();
	};
	unPauseBgMusic = () => {
		if(this.isOn){
			this.sounds.bgMusic.play();
		}
	};

	setupListeners(game: Game) {
		game.events.subscribe("PLAYER_SHOOT", this.shoot);
		game.events.subscribe("PLAYER_DESTROYED", this.shipWrek);
		game.events.subscribe("PLAYER_DAMAGED", this.astroidDestroyed);
		game.events.subscribe("ASTROID_DESTROYED", this.astroidDestroyed);
		game.events.subscribe("PAUSED", this.pauseBgMusic);
		game.events.subscribe("UNPAUSED", this.unPauseBgMusic);
	}

	cleanUp() {
		for (let sound of Object.values(this.sounds)) {
			sound.pause();
		}
	}

	play(key: string) {
		if (this.isOn) {
			this.sounds[key].currentTime = 0;
			this.sounds[key].play();
		}
	}

	turnOn() {
		this.isOn = true;
		this.startMusic()
	}
	turnOff() {
		this.isOn = false;
		this.cleanUp()
		this.pauseBgMusic();
	}
}
