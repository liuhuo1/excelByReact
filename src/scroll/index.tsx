import React from 'react';
import ScrollBarY from './scrollBarY';
import ScrollBarX from './scrollBarX';
interface ScrollBarProps {
	type?: string;
	distance: number;
	scrollCb: Function;
	minThumbHeight?: number;
};

export default class ScrollBar extends React.Component<ScrollBarProps> {
	constructor(props: ScrollBarProps) {
		super(props);
	}
	com: any;
	getCom() {
		if (this.props.type === 'x') {
			return ScrollBarX;
		}
		return ScrollBarY;
	}
	resetThumbHeight() {
		this.com.current.setThumbHeight();
	}
	render() {
		this.com = React.createRef();
		let Scroll = this.getCom();
		return (
			<Scroll ref={this.com} {...this.props}></Scroll>
		);
	}
}
