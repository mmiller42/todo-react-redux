import {combineReducers} from 'redux';
import {reducer as uiReducer} from 'redux-ui-shallow';

import todoReducer from './todo.reducer';
import asyncReducer from './async.reducer';

export default combineReducers({
	todo: todoReducer,
	async: asyncReducer,
	ui: uiReducer
});
