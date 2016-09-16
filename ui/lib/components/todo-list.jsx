import React, {Component} from 'react';

import connect from '../connect';
import Todo from './todo';
import {fetchTodos} from '../actions/';

class TodoList extends Component {
	componentDidMount () {
		this.props.dispatch(fetchTodos());
	}
	
	render () {
		const state = this.props.state.todos;
		
		if (state.isFetching) {
			return (
				<div className="loading">Loading</div>
			);
		}
		
		return (
			<ul className="todo-list">
				{
					[
						...state.items.map(todo => {
							return <li key={todo.id}><Todo todo={todo} /></li>;
						}),
						<li key="0"><Todo todo={null} /></li>
					]
				}
			</ul>
		);
	}
}

export default connect(TodoList);
