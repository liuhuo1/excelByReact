import React from 'react';
import ReactDOM from 'react-dom';
import { Clock } from '@src/modules/hello';
ReactDOM.render(
	<div>
		{new Array(3).fill(1).map((val, index) => {
			console.log(index);
			return <Clock key={index} />;
		})}
	</div>,
	document.getElementById('root'),
)
