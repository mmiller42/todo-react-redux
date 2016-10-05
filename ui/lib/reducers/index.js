import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as uiReducer} from 'redux-ui';

import todoReducer from './todo.reducer';
import asyncReducer from './async.reducer';

export default combineReducers({
	todo: todoReducer,
	async: asyncReducer,
	routing: routerReducer,
	ui: uiReducer
});
