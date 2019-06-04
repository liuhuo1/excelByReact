import React from 'react';
import './style.styl';
import domDrag from '@src/common/js/drag';
import { getStyle } from '@src/common/js/dom';

interface ScrollBarProps {
	type?: string;
	scrollLength: number;
	scrollCb: Function;
	minThumbHeight?: number;
};
interface ScrollBarState {
	thumbHeight: number;
	scrollTop: number;
};

const MinThumbHeight = 60;

export default class ScrollBarY extends React.Component<ScrollBarProps> {
	constructor(props: ScrollBarProps) {
		super(props);
		this.state = {
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
		this.wrapper.current.parentNode.addEventListener('mousewheel', this.moveScrollY);
	}
	moveScrollY = (e: any) => {
		if (this.state.thumbHeight === 0) {
			return;
		}
		let scrollTop = this.state.scrollTop;
		let clientHeight = this.wrapper.current.parentNode.clientHeight;
		let maxScrollTop = clientHeight - this.state.thumbHeight;
		let wheelDeltaY = e.wheelDeltaY;
		wheelDeltaY = wheelDeltaY * clientHeight / this.props.scrollLength;
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
		let thumbHeight = Math.ceil((parentHeight * parentHeight) / this.props.scrollLength);
		thumbHeight = thumbHeight > this.minThumbHeight ? thumbHeight : this.minThumbHeight;
		if (thumbHeight >= parentHeight) {
			thumbHeight = 0;
		}
		this.setState({ thumbHeight });
		domDrag(this.thumb.current, this.wrapper.current, undefined, this.movingCb);
	}
	movingCb = (pos) => {
		this.setState({
			scrollTop: pos.top
		})
	}
	moving = () => {
		let top = parseInt(getStyle(this.thumb.current, 'top')) || 0;
		let thumbHeight = this.state.thumbHeight;
		let wrapperHeight = this.wrapper.current.clientHeight;
		let height = this.props.scrollLength;
		let moveTop = top * (height - wrapperHeight) / (wrapperHeight - thumbHeight);
		this.props.scrollCb(moveTop);
	}
	render() {
		this.wrapper = React.createRef();
		this.thumb = React.createRef();
		let { thumbHeight, scrollTop } = this.state;
		let thumbStyle = {
			height: `${thumbHeight}px`,
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

