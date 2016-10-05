import React from 'react';
import {Route} from 'react-router';

import App from './components/app.component';

export default store => (
	<Route path="/" component={App}>
	</Route>
);
