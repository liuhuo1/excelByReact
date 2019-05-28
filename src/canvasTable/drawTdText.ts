import { PointData } from '@canvas/interface';
import { TdStyle, TdCoordinate, ScrollPos } from './interface';
import { drawText } from '@canvas/text';

/**
 * canvas
 * startPos
 * coordinate 显示出来的几行几列
 * text
 * config
 * */
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
/**
 * canvas
 * startPos
 * coordinate td的下标
 * text
 * config
 * */
export const drawTdTextByScroll = function (canvas: any, scroll: ScrollPos, coordinate: TdCoordinate, text: string, config: TdStyle) {
	const tdWidth = config.width;
	const tdHeight = config.height;
	let startPos = {
		x: 0 - scroll.x % tdWidth,
		y: 0 - scroll.y % tdHeight
	}
	let showedCoordinate = {
		x: coordinate.x - Math.floor(scroll.x / tdWidth),
		y: coordinate.y - Math.floor(scroll.y / tdHeight)
	}
	drawTdText(canvas, startPos, showedCoordinate, text, config);
}
