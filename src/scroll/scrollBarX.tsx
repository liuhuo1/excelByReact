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
	scrollLeft: number;
};

const MinThumbHeight = 60;

export default class ScrollBarX extends React.Component<ScrollBarProps> {
	constructor(props: ScrollBarProps) {
		super(props);
		this.state = {
			thumbHeight: 0,
			scrollLeft: 0
		};
		this.minThumbHeight = props.minThumbHeight || MinThumbHeight;
	}
	wrapper: any;
	thumb: any;
	minThumbHeight: number;
	state: ScrollBarState;
	componentDidMount() {
		this.setThumbHeight();
		domDrag(this.thumb.current, this.wrapper.current, undefined, this.movingCb);
	}
	componentDidUpdate() {
		this.moving();
	}

	setThumbHeight() {
		let parentWidth = this.wrapper.current.parentNode.clientWidth;
		let thumbHeight = Math.ceil((parentWidth * parentWidth) / this.props.scrollLength);
		thumbHeight = thumbHeight > this.minThumbHeight ? thumbHeight : this.minThumbHeight;
		if (thumbHeight >= parentWidth) {
			thumbHeight = 0;
		}
		this.setState({ thumbHeight });
	}
	movingCb = (pos) => {
		this.setState({
			scrollLeft: pos.left
		})
	}
	moving = () => {
		let left = parseInt(getStyle(this.thumb.current, 'left')) || 0;
		let thumbHeight = this.state.thumbHeight;
		let wrapperHeight = this.wrapper.current.clientWidth;
		let scrollLength = this.props.scrollLength;
		let moveDistance = left * (scrollLength - wrapperHeight) / (wrapperHeight - thumbHeight);
		this.props.scrollCb(moveDistance);
	}
	render() {
		this.wrapper = React.createRef();
		this.thumb = React.createRef();
		let { thumbHeight, scrollLeft } = this.state;
		let thumbStyle = {
			width: `${thumbHeight}px`,
			left: `${scrollLeft}px`
		};
		return (
			<div className="er-scrollbarx-wrapper" ref={this.wrapper} >
				<div className="er-scrollx-track">
					<div className="er-scrollx-thumb" ref={this.thumb} style={thumbStyle}></div>
				</div>
			</div>
		);
	}
}

