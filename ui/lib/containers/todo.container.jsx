import React, {Component, Children, cloneElement} from 'react';
import {connect} from 'react-redux';
import {omit} from 'lodash';
import pureRender from 'pure-render-decorator';

import {
	fetchTodos,
	createTodo,
	updateTodo,
	deleteTodo
} from '../actions/todo.actions';

@connect(
	({todo}) => ({todo}),
	{
		fetchTodos,
		createTodo,
		updateTodo,
		deleteTodo
	},
	(state, dispatchers, ownProps) => ({...ownProps, state, dispatchers})
)
@pureRender
export default class TodoContainer extends Component {
	render () {
		const props = omit(this.props, 'children');
		return (
			<div>
				{Children.map(this.props.children, child => cloneElement(child, props))}
			</div>
		);
	}
};
