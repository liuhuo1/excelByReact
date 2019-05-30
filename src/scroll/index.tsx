import React from 'react';
import './style.styl';
import domDrag from '@src/common/js/drag';
import { getStyle } from '@src/common/js/dom';

interface ScrollBarProps {
	type?: string;
	width?: number;
	height: number;
	scrollCb: Function
};
interface ScrollBarState {
	thumbHeight: number;
	scrollTop: number;
};
export default class ScrollBar extends React.Component<ScrollBarProps> {
	constructor(props: ScrollBarProps) {
		super(props);
		this.state = {
			thumbHeight: 0,
			scrollTop: 0
		};
	}
	wrapper: any;
	thumb: any;
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
		this.wrapper.current.parentNode.addEventListener('mousewheel', this.moveScroll);
	}
	moveScroll = (e: any) => {
		let scrollTop = this.state.scrollTop;
		let maxScrollTop = this.wrapper.current.parentNode.clientHeight - this.state.thumbHeight;
		scrollTop = scrollTop - e.wheelDeltaY;
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
		this.wrapper.current.parentNode.removeEventListener(this.moveScroll);
	}
	setThumbHeight() {
		let parentHeight = this.wrapper.current.parentNode.clientHeight;
		let thumbHeight = Math.ceil((parentHeight * parentHeight) / this.props.height);
		this.setState({ thumbHeight: thumbHeight });
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

