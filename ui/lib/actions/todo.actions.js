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
	[FETCH_TODOS]: () => promisify(request.get('https://api-ubacslavwb.now.sh/todos')),
	[CREATE_TODO]: attributes => promisify(request.post('https://api-ubacslavwb.now.sh/todos').send(attributes)),
	[UPDATE_TODO]: (id, attributes) => promisify(request.patch(`https://api-ubacslavwb.now.sh/todos/${id}`).send(attributes)),
	[DELETE_TODO]: id => promisify(request.delete(`https://api-ubacslavwb.now.sh/todos/${id}`)).then(() => ({id}))
});
