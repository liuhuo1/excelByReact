import { drawLine } from '@canvas/line.ts';
import { PointData, HTMLCanvasElement } from '@canvas/interface';
import { TableStyle } from './interface';
import { getDrawSize } from './helper';


export const drawTable = function (canvas: any, startPos: PointData, config: TableStyle) {
	const startTdWidth = config.tdWidth - config.borderWidth;
	const startTdHeight = config.tdHeight - config.borderWidth;
	const size = getDrawSize(canvas, startPos, config);
	let curX = startPos.x + startTdWidth;
	let curY = startPos.y + startTdHeight;

	while (curY <= size.height) {
		drawLine(canvas, {
			x: startPos.x,
			y: curY
		}, {
				x: startPos.x + size.width,
				y: curY
			});
		curY = curY + config.tdHeight;
	}

	while (curX <= size.width) {
		drawLine(canvas, {
			x: curX,
			y: startPos.y
		}, {
				x: curX,
				y: startPos.y + size.height
			});
		curX = curX + config.tdWidth;
		curY = curY + config.tdHeight
	}
}
