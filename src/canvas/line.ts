import { PointData, HTMLCanvasElement, LineStyle } from './interface';
export const drawLine = function (canvas: HTMLCanvasElement, start: PointData, end: PointData, config?: LineStyle) {
	let ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.moveTo(start.x + 0.5, start.y + 0.5);
	ctx.lineTo(end.x + 0.5, end.y + 0.5);
	ctx.stroke();
}
