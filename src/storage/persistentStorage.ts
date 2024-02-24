import { writable } from "svelte/store";

export function newPersitentStore<T>(storeName: string, defaultValue: T) {
  const initialValue = localStorage.getItem(storeName);

  let initialStore: T = initialValue
    ? (JSON.parse(initialValue) as T)
    : defaultValue;
		 
  const { subscribe, update: _update, set: _set } = writable<T>(initialStore);
  return {
    subscribe,
    update(cb: (store: T) => T) {
      _update((store) => {
        const value = cb(store);
        localStorage.setItem(storeName, JSON.stringify(value));
        return value;
      });
    },
    set(value: T) {
      _set(value);
      localStorage.setItem(storeName, JSON.stringify(value));
    },
  };
}
