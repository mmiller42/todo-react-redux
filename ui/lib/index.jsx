import promise from 'redux-promise';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import configureStore from './configure-store';
import createRoutes from './routes';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}>
		<Router routes={createRoutes(store)} history={history} />
	</Provider>,
	document.querySelector('#app')
);