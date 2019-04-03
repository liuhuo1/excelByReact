import React from 'react';

export class Table extends React.Component {
	render() {
		return (
			<table>
				<tbody>
					<tr>
						<Columns />
					</tr>
				</tbody>
			</table>
		);
	}
}

class Columns extends React.Component {
	render() {
		return (
			<React.Fragment>
				<td>Hello</td>
				<td>World</td>
			</React.Fragment>
		);
	}
}
