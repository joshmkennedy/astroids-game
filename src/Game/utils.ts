/**
 * @param start the x, y coordinates of where to start from
 * @param distance how long is the line
 * @param angle the angle of the line
 */
export function diagonalPoint(
	start: { x: number; y: number },
	distance: number,
	angle: number,
): { x: number; y: number } {
	return {
		x: start.x + distance * Math.cos((Math.PI * 2 * angle) / 360),
		y: start.y + distance * Math.sin((Math.PI * 2 * angle) / 360),
	};
}
