import { PointData, HTMLCanvasElement, TextStyle } from './interface';
export const drawText = function (canvas: HTMLCanvasElement, point: PointData, text: string, config?: TextStyle) {
	let ctx = canvas.getContext('2d');
	ctx.fillText(text, point.x, point.y);
}
