import React from 'react';
import ScrollBarY from './scrollBarY';
import ScrollBarX from './scrollBarX';
interface ScrollBarProps {
	type?: string;
	scrollLength: number;
	scrollCb: Function;
	minThumbHeight?: number;
};

export default class ScrollBar extends React.Component<ScrollBarProps> {
	constructor(props: ScrollBarProps) {
		super(props);
	}
	getCom() {
		if (this.props.type === 'x') {
			return ScrollBarX;
		}
		return ScrollBarY;
	}
	render() {
		let Scroll = this.getCom();
		return (
			<Scroll {...this.props}></Scroll>
		);
	}
}

