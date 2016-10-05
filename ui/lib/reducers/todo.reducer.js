import {handleActions} from 'redux-actions';
import {keyBy, map, omitBy} from 'lodash';

import {
	FETCH_TODOS,
	CREATE_TODO,
	UPDATE_TODO,
	DELETE_TODO
} from '../actions/todo.actions';

const INITIAL_STATE = {
	todos: {},
	order: [],
	isFetching: false,
	isSaving: false
};

export default handleActions(
	{
		[`${FETCH_TODOS}_PENDING`]: state => ({
			...state,
			isFetching: true
		}),

		[`${FETCH_TODOS}_COMPLETE`]: {
			next: (state, {payload: todos}) => ({
				...state,
				todos: keyBy(todos, 'id'),
				order: map(todos, 'id'),
				isFetching: false
			})
		},

		[`${CREATE_TODO}_COMPLETE`]: {
			next: (state, {payload: todo}) => ({
				...state,
				todos: {
					...state.todos,
					[todo.id]: todo
				},
				order: [...state.order, todo.id]
			})
		},

		[`${UPDATE_TODO}_COMPLETE`]: {
			next: (state, {payload: todo}) => ({
				...state,
				todos: {
					...state.todos,
					[todo.id]: todo
				}
			})
		},

		[`${DELETE_TODO}_COMPLETE`]: {
			next: (state, {payload}) => ({
				...state,
				todos: omitBy(state.todos, todo => todo.id === payload.id),
				order: state.order.filter(id => id !== payload.id)
			})
		}
	},
	INITIAL_STATE
);
