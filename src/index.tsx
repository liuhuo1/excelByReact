import React from 'react';
import ReactDOM from 'react-dom';
import { ExcelCanvas } from '@src/components/excelCanvas';
import '@src/common/style/index.styl';
ReactDOM.render(
	<div>
		<ExcelCanvas></ExcelCanvas>
	</div>,
	document.getElementById('root'),
)
