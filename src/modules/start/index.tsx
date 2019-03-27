import React from 'react';

interface SquareProps {
	value: number;
	onClick: () => void;
}
// interface SquareState {
// 	value: string;
// }
// class Square extends React.Component<SquareProps, SquareState> {
// 	constructor(props: SquareProps) {
// 		super(props);
// 		this.state = {
// 			value: '.',
// 		}
// 	}
// 	static defaultProps = {
// 		value: 0
// 	}

// 	private click = () => {
// 		this.setState({ value: 'X' });
// 	}

// 	render() {
// 		const { value, onClick } = this.props;
// 		return (
// 			<button
// 				className="square"
// 				onClick={() => { onClick() }}>
// 				{value}
// 			</button>
// 		);
// 	}
// }
function Square(props: SquareProps) {
	return (
		<button
			className="square"
			onClick={props.onClick}
		>
			{props.value}
		</button>
	);
}
interface BoardState {
	squares: Array<any>
};
class Board extends React.Component<any, BoardState> {
	constructor(props: any) {
		super(props);
		this.state = {
			squares: Array(9).fill(1),
		};
	}
	private handleClick = (i: number) => {
		const squares = this.state.squares.slice();
		squares[i] = 'X';
		this.setState({ squares: squares });
	}
	renderSquare(i: number) {
		return <Square
			value={this.state.squares[i]}
			onClick={() => this.handleClick(i)}
		/>;
	}

	render() {
		const status = 'Next player: X';

		return (
			<div>
				<div className="status">{status}</div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

export class Game extends React.Component {
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

