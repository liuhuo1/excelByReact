import React from 'react';
import './style.styl';
import { drawTable } from '@src/canvasTable/drawTable';
import { drawTdText } from '@src/canvasTable/drawTdText';
interface commentListProps {
	text?: string;
};

export class ExcelCanvas extends React.Component<commentListProps> {
	constructor(props: commentListProps) {
		super(props);
	}
	canvas?: any;
	wrapper?: any;
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
		let date = new Date().getTime();
		drawTable(this.canvas.current, { x: -10, y: -10 }, {
			borderWidth: 1,
			tdWidth: 80,
			tdHeight: 30
		});
		drawTdText(this.canvas.current, { x: -10, y: -10 }, { x: 3, y: 3 }, 'aa', {
			width: 80,
			height: 30
		});
		console.log('duration', new Date().getTime() - date);
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
	render() {
		this.wrapper = React.createRef();
		this.canvas = React.createRef();
		return (
			<div className="er-canvas-wrapper" ref={this.wrapper} id="test">
				<canvas id="canvas" ref={this.canvas}></canvas>
			</div>
		);
	}
}

