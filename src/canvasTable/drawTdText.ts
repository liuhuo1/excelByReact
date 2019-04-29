import { PointData } from '@canvas/interface';
import { TdStyle, TdCoordinate } from './interface';
import { drawText } from '@canvas/text';


export const drawTdText = function (canvas: any, startPos: PointData, coordinate: TdCoordinate, text: string, config: TdStyle) {
	let pos;
	pos = {
		x: startPos.x + config.width * coordinate.x + 2,
		y: startPos.y + config.height * (coordinate.y + 1) - 2
	}
	drawText(canvas, pos, text, config.width, {
		font: '18px serif',
		textBaseline: 'bottom'
	});
}
