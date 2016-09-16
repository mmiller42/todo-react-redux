import React, {Component} from 'react';

import connect from '../connect';
import {setEditingTodo, saveTodo} from '../actions/';

class Todo extends Component {
	render () {
		const state = this.props.state.todos;
		
		return (
			<div className="todo">
				{
					(state.editingTodo === this.props.todo) && !state.isSaving
						? this.renderEditMode()
						: this.renderViewMode()
				}
			</div>
		);
	}
	
	renderEditMode () {
		const {todo} = this.props;
		
		return (
			<form onSubmit={
				e => {
					e.preventDefault();
					this.save();
				}
			}>
				<input type="text" required="required" ref="description" defaultValue={todo ? todo.description : ''} />
			</form>
		);
	}
	
	renderViewMode () {
		const {todo} = this.props;
		
		return (
			<div>
				{todo ? <input type="checkbox" /> : undefined}
				<span onClick={() => this.changeToEditMode()}>
					{todo ? todo.description : 'New todo'}
				</span>
			</div>
		);
	}
	
	changeToEditMode () {
		this.props.dispatch(setEditingTodo(this.props.todo));
		setTimeout(() => this.refs.description.focus(), 10);
	}
	
	save () {
		this.props.dispatch(saveTodo({
			...this.props.todo,
			description: this.refs.description.value
		}));
	}
}

export default connect(Todo);