import {newPersitentStore} from "./persistentStorage"
function newSoundStore (){
	const {
		subscribe,
		update,
		set
	} = newPersitentStore<number>("volume", .9)

	return {
		subscribe,
		update,
		set,
	}
}

const SoundStore = newSoundStore();
export default SoundStore

