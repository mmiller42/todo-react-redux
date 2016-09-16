import {createAction as createActionCreator} from 'redux-act';
import request from 'superagent';

const API_URI = 'http://localhost:3000/todos';

export const requestFetchTodos = createActionCreator('REQUEST - fetch todos');
export const receiveFetchTodos = createActionCreator('RECEIVE - fetch todos');
export const receiveFetchTodosError = createActionCreator('RECEIVE - fetch todos error');

export function fetchTodos () {
	return dispatch => {
		dispatch(requestFetchTodos());
		return request.get(API_URI)
			.then(res => dispatch(receiveFetchTodos(res.body)))
			.catch(err => dispatch(receiveFetchTodosError(err)));
	};
}

export const requestSaveTodo = createActionCreator('REQUEST - save todo');
export const receiveSaveTodo = createActionCreator('RECEIVE - save todo');
export const receiveSaveTodoError = createActionCreator('RECEIVE - save todo error');

export function saveTodo (todo) {
	return dispatch => {
		dispatch(requestSaveTodo(todo));
		
		let req;
		if (todo.id) {
			req = request.patch(`${API_URI}/${todo.id}`);
		} else {
			req = request.post(API_URI);
		}
		
		return req.type('json').send(todo)
			.then(res => dispatch(receiveSaveTodo(res.body)))
			.catch(err => dispatch(receiveSaveTodoError(err)));
	};
}

export const requestDeleteTodo = createActionCreator('REQUEST - delete todo');
export const receiveDeleteTodo = createActionCreator('RECEIVE - delete todo');
export const receiveDeleteTodoError = createActionCreator('RECEIVE - delete todo error');

export function deleteTodo (todo) {
	return dispatch => {
		dispatch(requestDeleteTodo(todo));
		return request.delete(`${API_URI}/${todo.id}`)
			.then(res => dispatch(receiveDeleteTodo(todo)))
			.catch(err => dispatch(receiveDeleteTodoError(err)));
	};
}

export const requestMarkTodoAsComplete = createActionCreator('REQUEST - mark todo as complete');
export const receiveMarkTodoAsComplete = createActionCreator('RECEIVE - mark todo as complete');
export const receiveMarkTodoAsCompleteError = createActionCreator('RECEIVE - mark todo as complete error');

export function markTodoAsComplete (todo) {
	return dispatch => {
		dispatch(requestMarkTodoAsComplete(todo));
		return request.patch(`${API_URI}/${todo.id}`).type('json').send({completed: true})
			.then(res => dispatch(receiveMarkTodoAsComplete(res.body)))
			.catch(err => dispatch(receiveMarkTodoAsCompleteError(err)));
	};
}

export const setEditingTodo = createActionCreator('Set editing todo');