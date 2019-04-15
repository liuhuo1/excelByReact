import React from 'react';
import './style.styl';
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
	// 设置canvas的大小
	resizeCanvas = () => {
		const wrapper = this.wrapper.current;
		const canvas = this.canvas.current;
		canvas.setAttribute('width', wrapper.clientWidth);
		canvas.setAttribute('height', wrapper.clientHeight);
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
				<canvas ref={this.canvas}></canvas>
			</div>
		);
	}
}

