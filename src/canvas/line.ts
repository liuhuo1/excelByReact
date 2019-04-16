import { PointData, HTMLCanvasElement, LineStyle } from './interface';
export const drawLine = function (canvas: HTMLCanvasElement, start: PointData, end: PointData, config?: LineStyle) {
	let ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.moveTo(start.x, start.y);
	ctx.lineTo(end.x, end.y);
	ctx.stroke();
}
