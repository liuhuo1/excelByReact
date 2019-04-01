import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeApp } from '@src/modules/context';
ReactDOM.render(
	<div>
		{new Array(3).fill(1).map((val, index) => {
			console.log(index);
			return <ThemeApp key={index} />;
		})}
	</div>,
	document.getElementById('root'),
)
