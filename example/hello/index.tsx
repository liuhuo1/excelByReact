import React from 'react';
interface ClockState {
	date: Date,
	numbers: Array<number>
}
export class Clock extends React.Component<any, ClockState> {
	constructor(props: any) {
		super(props);
		this.state = {
			date: new Date(),
			numbers: [1, 2, 3, 4, 5]
		};
	}
	private timerID: number = 0;
	private tick = () => {
		this.setState({
			date: new Date()
		});
	}
	componentDidMount() {
		console.log(123);
		this.timerID = window.setInterval(
			() => this.tick(),
			1000
		);
	}

	componentWillUnmount() {
		window.clearInterval(this.timerID);
	}

	render() {
		const { numbers, date } = this.state;
		return (
			<div>
				<h1>Hello, world!</h1>
				{numbers.map((number, index) =>
					<li key={index}>{number}</li>
				)}
				<h2>It is {date.toLocaleTimeString()}.</h2>
			</div>
		);
	}
}
