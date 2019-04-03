import React from 'react';
import ReactDOM from 'react-dom';
import { withSubscription, BlogPost } from '@src/modules/test/higherOrderComponent';

ReactDOM.render(
	<div>
		{withSubscription(BlogPost, { text: 1 })}
	</div>,
	document.getElementById('root'),
)
