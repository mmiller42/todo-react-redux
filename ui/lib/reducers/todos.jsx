import {createReducer} from 'redux-act';

import * as actions from '../actions/';

const todos = createReducer(
	{
		[actions.requestFetchTodos]: state => {
			return {...state, isFetching: true};
		},
		
		[actions.receiveFetchTodos]: (state, items) => {
			return {...state, items, isFetching: false};
		},
		
		[actions.requestSaveTodo]: (state, todo) => {
			return {...state, isSaving: true};
		},
		
		[actions.receiveSaveTodo]: (state, todo) => {
			let {items} = state;
			
			if (items.find(({id}) => id === todo.id)) {
				items = items.map(_todo => {
					if (_todo.id === todo.id) {
						return {..._todo, ...todo};
					} else {
						return _todo;
					}
				});
			} else {
				items = [...items, todo];
			}
			
			items.sort((a, b) => a.id - b.id);
			
			return {...state, items, editingTodo: null, isSaving: false};
		},
		
		[actions.requestDeleteTodo]: (state, todo) => {
			return {...state, isSaving: true};
		},
		
		[actions.receiveDeleteTodo]: (state, todo) => {
			return {
				...state,
				items: items.filter(({id}) => id !== todo.id),
				editingTodo: null,
				isSaving: false
			};
		},
	
		[actions.requestMarkTodoAsComplete]: (state, todo) => {
			return {...state, isSaving: true};
		},
			
		[actions.receiveMarkTodoAsComplete]: (state, todo) => {
			return {
				...state,
				items: items.map(_todo => {
					if (_todo.id === todo.id) {
						return {..._todo, ...todo};
					} else {
						return _todo;
					}
				})
			};
		},
		
		[actions.setEditingTodo]: (state, editingTodo) => {
			return {
				...state,
				editingTodo
			};
		}
	},
	{
		items: [],
		isFetching: false,
		isSaving: false,
		editingTodo: null
	}
);

export default todos;