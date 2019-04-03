import React from 'react';

const FancyButton = React.forwardRef((props, ref: any) => (
	<button ref={ref} className="FancyButton">
		{props.children}
	</button>
));

export class Fancy extends React.Component {
	click = (ref: any) => {
		console.log(ref)
	}
	render() {
		const ref = React.createRef();
		return (
			<div>
				<FancyButton ref={ref} />
				<span onClick={() => {
					this.click(ref);
				}}>惦记我</span>
			</div>
		);
	}
}
