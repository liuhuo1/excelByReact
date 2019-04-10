import React from 'react';

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
	initCanvas() {
		window.addEventListener('resize', this.resizeCanvas);
	}
	resizeCanvas = () => {
		const wrapper = this.wrapper.current;
		const canvas = this.canvas.current;
		canvas.setAttribute('width', wrapper.clientWidth);
		canvas.setAttribute('height', wrapper.clientHeight);
	};
	cancelListen() {
		window.removeEventListener('resize', this.resizeCanvas);
	}
	render() {
		this.wrapper = React.createRef();
		this.canvas = React.createRef();
		return (
			<div className="" ref={this.wrapper}>
				<canvas ref={this.canvas}></canvas>
			</div>
		);
	}
}

