import {newPersitentStore} from "./persistentStorage"

function newBank (){
	const {
		subscribe,
		update,
		set
	} = newPersitentStore<{balance:number;}>("bank", {balance:0})

	return {
		subscribe,
		update,
		set,

		spendMoney(amount: number) {
			update((storage) => {
				storage.balance -= amount;
				return storage;
			});
		},
		increaseMoney(money: number) {
			update((storage) => {
				storage.balance += money;
				return storage;
			});
		},
	}
}

const Bank = newBank();
export default Bank
