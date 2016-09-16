import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/';

function configureStore (initialState = {}) {
	const store = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(thunk),
			process.env.NODE_ENV !== 'production' && window.devToolsExtension
				? window.devToolsExtension()
				: f => f
		)
	);
	
	if (module.hot) {
		module.hot.accept('./reducers/', () => {
			const nextRootReducer = require('./reducers/').default;
			store.replaceReducer(nextRootReducer);
		});
	}
	
	return store;
}

export default configureStore;