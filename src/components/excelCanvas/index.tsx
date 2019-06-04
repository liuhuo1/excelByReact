import React from 'react';
import './style.styl';
import { clearCanvas } from '@src/canvas';
import { drawTableByScroll } from '@src/canvasTable/drawTable';
import { drawTdTextByScroll } from '@src/canvasTable/drawTdText';
import ScrollBar from '@src/scroll/index';
interface commentListProps {
	text?: string;
};
interface ScrollPos {
	x: number;
	y: number;
}
interface ExcelCanvasState {

}
export class ExcelCanvas extends React.Component<commentListProps> {
	constructor(props: commentListProps) {
		super(props);
		this.scrollPos = { x: 0, y: 0 };
	}
	canvas?: any;
	wrapper?: any;
	scrollPos: ScrollPos;
	componentDidMount() {
		this.initCanvas();
		this.resizeCanvas();

	}
	componentWillUnmount() {
		this.cancelListen();
	}
	// 监听窗口大小变化
	initCanvas() {
		window.addEventListener('resize', this.resizeCanvas);
	}
	drawTable() {
		clearCanvas(this.canvas.current, { x: 0, y: 0 }, { width: this.canvas.current.width, height: this.canvas.current.height });
		drawTableByScroll(this.canvas.current, this.scrollPos, {
			borderWidth: 1,
			tdWidth: 80,
			tdHeight: 30
		});
		drawTdTextByScroll(this.canvas.current, this.scrollPos, { x: 0, y: 0 }, 'aa', {
			width: 80,
			height: 30
		});
	}
	// 设置canvas的大小
	resizeCanvas = () => {
		const wrapper = this.wrapper.current;
		const canvas = this.canvas.current;
		canvas.setAttribute('width', wrapper.clientWidth);
		canvas.setAttribute('height', wrapper.clientHeight);
		this.drawTable();
	};
	// 接触监听
	cancelListen() {
		window.removeEventListener('resize', this.resizeCanvas);
	}
	scrollChange = (moveTop: number) => {
		this.scrollPos.y = moveTop;
		this.drawTable();
	}
	scrollXChange = (moveLeft: number) => {
		this.scrollPos.x = moveLeft;
		this.drawTable();
	}
	render() {
		this.wrapper = React.createRef();
		this.canvas = React.createRef();
		let height = 30 * 10;
		let width = 80 * 10;
		return (
			<div className="er-canvas-wrapper" ref={this.wrapper} id="test">
				<canvas id="canvas" ref={this.canvas}></canvas>
				<ScrollBar scrollLength={height} scrollCb={this.scrollChange}></ScrollBar>
				<ScrollBar type="x" scrollLength={width} scrollCb={this.scrollXChange}></ScrollBar>
			</div>
		);
	}
}

