import {createActions} from 'redux-actions';
import request from 'superagent';

import promisify from '../utils/promisify-superagent';

export const FETCH_TODOS = 'FETCH_TODOS';
export const CREATE_TODO = 'CREATE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export const {
	fetchTodos,
	createTodo,
	updateTodo,
	deleteTodo
} = createActions({
	[FETCH_TODOS]: () => promisify(request.get(`${ENV.API_URI}/todos`)),
	[CREATE_TODO]: attributes => promisify(request.post(`${ENV.API_URI}/todos`).send(attributes)),
	[UPDATE_TODO]: (id, attributes) => promisify(request.patch(`${ENV.API_URI}/todos/${id}`).send(attributes)),
	[DELETE_TODO]: id => promisify(request.delete(`${ENV.API_URI}/todos/${id}`)).then(() => ({id}))
});
