import { PointData, HTMLCanvasElement, TextStyle } from './interface';
export const drawText = function (canvas: any, point: PointData, text: string, maxWidth: number, config?: TextStyle) {
	let ctx = canvas.getContext('2d');
	ctx.save();
	if (config) {
		Object.keys(config).forEach((key) => {
			ctx[key] = config[key];
		});
	}
	ctx.fillText(text, point.x, point.y, maxWidth);
	ctx.restore();
}
