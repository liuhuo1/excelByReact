import * as line from './line';
import * as text from './text';
import { PointData, HTMLCanvasElement, Size } from './interface';
export const clearCanvas = function (canvas: HTMLCanvasElement, start: PointData, size: Size) {
	let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
	ctx.clearRect(start.x, start.y, size.width, size.height);
}


export default {
	line,
	text,
	clearCanvas
}
