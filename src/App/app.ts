import App from "./lib/App.svelte"

export default function createApp(node:HTMLElement){
	new App({
		target:node,
	})
}
