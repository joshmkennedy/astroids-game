
export default class EventBus {
	lastId: number = 0;
	subscriptions: Record<string, Record<string, (data: any) => void>>;
	constructor() {
		this.subscriptions = {};
	}

	subscribe(event: string, cb: (data: any) => void) {
		let id = this.getUniqueId();
		if (!this.subscriptions[event]) {
			this.subscriptions[event] = {};
		}
		this.subscriptions[event][id] = cb;
		return {
			unsubscribe: () => {
				delete this.subscriptions[event][id];
				if (Object.keys(this.subscriptions[event]).length === 0) {
					delete this.subscriptions[event];
				}
			},
		};
	}

	emit(event: string, data: any ) {
		if(!this.subscriptions[event]) {
			return
		}
		for (let cb of Object.values(this.subscriptions[event])) {
			cb(data);
		}
	}

	getUniqueId() {
		this.lastId++;
		return this.lastId;
	}

	clear(){
		this.subscriptions = {}
		this.lastId = 0
	}
}
