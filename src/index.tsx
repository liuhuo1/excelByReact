import React from 'react';
import ReactDOM from 'react-dom';
import { withSubscription, BlogPost } from '@src/modules/test/higherOrderComponent';

const Ata = withSubscription(BlogPost, { value: 1 });
ReactDOM.render(
	<div>
		<Ata></Ata>
	</div>,
	document.getElementById('root'),
)
