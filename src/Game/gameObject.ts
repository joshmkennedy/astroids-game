import type Game from "./game"

export type GameObject = {
	update(game:Game):void;
	draw(ctx: CanvasRenderingContext2D ):void;
	init?:(game:Game)=>void;
	cleanUp?:(game:Game)=>void;
}
