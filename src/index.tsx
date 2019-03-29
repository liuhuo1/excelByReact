import React from 'react';
import ReactDOM from 'react-dom';
import { Clock } from '@src/modules/hello';
ReactDOM.render(
	<div>
		<Clock />
		<Clock />
		<Clock />
	</div>,
	document.getElementById('root'),
)
