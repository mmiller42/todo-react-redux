import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import rootReducer from '../reducers/';

export default function configureStore (initialState = {}) {
	const store = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(promiseMiddleware({
				promiseTypeSuffixes: ['PENDING', 'COMPLETE', 'COMPLETE']
			})),
			process.env.NODE_ENV !== 'production' && window.devToolsExtension
				? window.devToolsExtension()
				: f => f
		)
	);
	
	if (module.hot) {
		module.hot.accept('../reducers/', () => {
			const nextRootReducer = require('../reducers/').default;
			store.replaceReducer(nextRootReducer);
		});
	}
	
	return store;
};
