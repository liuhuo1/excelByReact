import { PointData, HTMLCanvasElement } from '@canvas/interface';
import { TableStyle } from './interface';

export const getDrawSize = function (canvas: any, startPos: PointData, config: TableStyle) {
	const tdWidth = config.tdWidth;
	const tdHeight = config.tdHeight;
	let startWidth = canvas.width - startPos.x;
	let startHeight = canvas.height - startPos.y;
	startWidth = Math.ceil(startWidth / tdWidth) * tdWidth - config.borderWidth;
	startHeight = Math.ceil(startHeight / tdHeight) * tdHeight - config.borderWidth;
	return {
		width: startWidth,
		height: startHeight
	}
}
