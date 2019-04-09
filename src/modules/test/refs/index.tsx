import React from 'react';

const FancyButton = React.forwardRef((props: any, ref: any) => (
	<button ref={ref} className="FancyButton">
		{props.children}
	</button>
));

export class Fancy extends React.Component {
	constructor(props: any) {
		super(props);
		// 创建一个 ref 来存储 textInput 的 DOM 元素
		this.btn = React.createRef();
	}
	btn: any;
	click = (ref: any) => {
		console.log(this.btn);
	}
	render() {
		const ref = React.createRef();
		return (
			<div>
				<FancyButton ref={ref} />
				<span ref={this.btn} onClick={() => {
					this.click(ref);
				}}>惦记我</span>
			</div>
		);
	}
}

interface MouseState {
	x: number,
	y: number
};

interface CatProps {
	mouse: {
		x: number,
		y: number
	}
}
class Cat extends React.Component<CatProps> {
	render() {
		const mouse = this.props.mouse;
		return (
			<img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
		);
	}
}

interface MouseProps {
	render: any
}
class Mouse extends React.Component<MouseProps> {
	constructor(props: any) {
		super(props);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.state = { x: 0, y: 0 };
	}

	handleMouseMove(event: any) {
		this.setState({
			x: event.clientX,
			y: event.clientY
		});
	}

	render() {
		return (
			<div style={{ height: '100px' }} onMouseMove={this.handleMouseMove}>

				{/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
				{this.props.render(this.state)}
			</div>
		);
	}
}

export class MouseTracker extends React.Component {
	render() {
		return (
			<div>
				<h1>移动鼠标!</h1>
				<Mouse render={(mouse: any) => (
					<Cat mouse={mouse} />
				)} />
			</div>
		);
	}
}
