import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app.component';

import configureStore from './utils/configure-store';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#app')
);
