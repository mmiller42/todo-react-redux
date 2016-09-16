import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/app';

export default store => (
	<Route path="/" component={App}>
	</Route>
);

/*<Route path="pages">
 <IndexRoute component={ManagePagesScreen} />
 <Route path=":id" component={ConfigurePageScreen} />
 </Route>*/
