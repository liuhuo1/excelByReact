import { drawLine } from './line';
import { HTMLCanvasElement } from './interface';
export default function (canvas: HTMLCanvasElement) {
	drawLine(canvas, { x: 0, y: 0 }, { x: 0, y: 100 });
	drawLine(canvas, { x: 10, y: 0 }, { x: 10, y: 100 });
	drawLine(canvas, { x: 20, y: 0 }, { x: 20, y: 100 });
	drawLine(canvas, { x: 30, y: 0 }, { x: 30, y: 100 });
	drawLine(canvas, { x: 40, y: 0 }, { x: 40, y: 100 });
}
