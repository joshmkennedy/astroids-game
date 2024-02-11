import createApp from "./App/app";
import "./tailwind.css";
let node = document.querySelector<HTMLDivElement>("#app");
if (node) {
	createApp(node);
}
