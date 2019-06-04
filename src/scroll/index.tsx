import React from 'react';
import './style.styl';
import domDrag from '@src/common/js/drag';
import { getStyle } from '@src/common/js/dom';

interface ScrollBarProps {
	type?: string;
	width?: number;
	height: number;
	scrollCb: Function;
	minThumbHeight?: number;
};
interface ScrollBarState {
	realThumbHeight: number;
	thumbHeight: number;
	scrollTop: number;
};

const MinThumbHeight = 60;

export default class ScrollBar extends React.Component<ScrollBarProps> {
	constructor(props: ScrollBarProps) {
		super(props);
		this.state = {
			realThumbHeight: 0,
			thumbHeight: 0,
			scrollTop: 0
		};
		this.minThumbHeight = props.minThumbHeight || MinThumbHeight;
	}
	wrapper: any;
	thumb: any;
	minThumbHeight: number;
	state: ScrollBarState;
	componentDidMount() {
		this.bindEvent();
		this.setThumbHeight();
	}
	componentDidUpdate() {
		this.moving();
	}
	componentWillUnmount() {
		this.removeBind();
	}
	bindEvent() {
		if (this.props.type !== 'x') {
			this.wrapper.current.parentNode.addEventListener('mousewheel', this.moveScrollY);
		}
	}
	moveScrollY = (e: any) => {
		let scrollTop = this.state.scrollTop;
		let clientHeight = this.wrapper.current.parentNode.clientHeight;
		let maxScrollTop = clientHeight - this.state.thumbHeight;
		let wheelDeltaY = e.wheelDeltaY;
		wheelDeltaY = wheelDeltaY * clientHeight / this.props.height;
		scrollTop = scrollTop - wheelDeltaY;
		if (scrollTop < 0) {
			scrollTop = 0;
		}
		if (scrollTop > maxScrollTop) {
			scrollTop = maxScrollTop;
		}
		this.setState({
			scrollTop
		})
	}
	removeBind() {
		this.wrapper.current.parentNode.removeEventListener(this.moveScrollY);
	}
	setThumbHeight() {
		let parentHeight = this.wrapper.current.parentNode.clientHeight;
		let thumbHeight = Math.ceil((parentHeight * parentHeight) / this.props.height);
		let realThumbHeight = thumbHeight > this.minThumbHeight ? thumbHeight : this.minThumbHeight;
		this.setState({ thumbHeight });
		this.setState({ realThumbHeight })
		domDrag(this.thumb.current, this.wrapper.current, undefined, this.movingCb);
	}
	movingCb = (pos) => {
		this.setState({
			scrollTop: pos.top
		})
	}
	moving = () => {
		let top = parseInt(getStyle(this.thumb.current, 'top')) || 0;
		let thumbHeight = this.thumb.current.clientHeight;
		let wrapperHeight = this.wrapper.current.clientHeight;
		let height = this.props.height;
		let moveTop = top * (height - wrapperHeight) / (wrapperHeight - thumbHeight);
		this.props.scrollCb(moveTop);
	}
	render() {
		this.wrapper = React.createRef();
		this.thumb = React.createRef();
		let { realThumbHeight, scrollTop } = this.state;
		let thumbStyle = {
			height: `${realThumbHeight}px`,
			top: `${scrollTop}px`
		};
		return (
			<div className="er-scrollbar-wrapper" ref={this.wrapper} >
				<div className="er-scroll-track">
					<div className="er-scroll-thumb" ref={this.thumb} style={thumbStyle}></div>
				</div>
			</div>
		);
	}
}

