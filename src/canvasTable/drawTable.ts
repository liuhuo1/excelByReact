import { drawLine } from '@canvas/line.ts';
import { PointData, HTMLCanvasElement } from '@canvas/interface';
import { TableStyle } from './interface';

const getDrawSize = function (canvas: any, startPos: PointData, config: TableStyle) {
	const width = canvas.width;
	const height = canvas.height;
	const tdWidth = config.tdWidth;
	const tdHeight = config.tdHeight;
	let startWidth = width - startPos.x;
	let startHeight = height - startPos.y;
	startWidth = Math.ceil(startWidth / tdWidth) * tdWidth - config.borderWidth;
	startHeight = Math.ceil(startHeight / tdHeight) * tdHeight - config.borderWidth;
	return {
		width: startWidth,
		height: startHeight
	}
}

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
