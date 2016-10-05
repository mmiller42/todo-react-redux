import React, {Component} from 'react';
import ui from 'redux-ui';
import pureRender from 'pure-render-decorator';

import '../styles/todo.component.css';

@ui({
	state: {
		description: props => props.todo ? props.todo.description : '',
		isCompleted: props => props.todo ? props.todo.isCompleted : false
	}
})
@pureRender
export default class Todo extends Component {
	render () {
		const {todo} = this.props;

		return (
			<div className="todo">
				{
					this.props.ui.selectedTodoId === (todo ? todo.id : '0')
						? this.renderEditMode()
						: this.renderViewMode()
				}
			</div>
		);
	}
	
	renderEditMode () {
		const {ui, todo} = this.props;
		
		return (
			<form className={todo ? 'input-group' : ''} onSubmit={
				e => {
					e.preventDefault();
					this.save();
					this.props.updateUI('selectedTodoId', null);
					if (!todo) {
						setTimeout(() => this.props.updateUI('description', ''), 0);
					}
				}
			}>
				<input type="text" required autoFocus value={ui.description} className="form-control"
					onChange={e => this.props.updateUI('description', e.target.value)}
				 onKeyDown={e => e.key === 'Escape' && this.props.updateUI('selectedTodoId', null)}
					placeholder={todo ? todo.description : 'New todo'} />
				{
					todo
						? <span className="input-group-btn">
								<button type="button" className="btn btn-default"
									onClick={() => {
										this.delete();
										this.props.updateUI('selectedTodoId', null);
									}}>
									<span className="glyphicon glyphicon-trash"></span>
								</button>
							</span>
						: null
				}
			</form>
		);
	}
	
	renderViewMode () {
		const {todo, ui} = this.props;
		
		return (
			<div className="form-inline">
				<div className="form-group">
					<label className={todo ? '' : ' hidden'}>
						<input type="checkbox" checked={ui.isCompleted}
							onChange={e => this.toggleIsCompleted(e.target.checked)} />
					</label>
					<p className="form-control-static" onClick={() => this.selectTodo()}>
						{todo ? this.renderDescription() : <i className="text-muted">New todo</i>}
					</p>
				</div>
			</div>
		);
	}

	renderDescription () {
		const {description, isCompleted} = this.props.todo;
		return isCompleted ? <s className="text-muted">{description}</s> : description;
	}

	selectTodo () {
		const {todo} = this.props;
		this.props.updateUI('selectedTodoId', todo ? todo.id : '0');
	}

	toggleIsCompleted (isCompleted) {
		this.props.updateUI('isCompleted', isCompleted);
		setTimeout(() => this.save(), 0);
	}
	
	save () {
		const {todo, ui} = this.props;
		const attributes = {description: ui.description, isCompleted: ui.isCompleted};

		if (todo) {
			this.props.dispatchers.updateTodo(todo.id, attributes);
		} else {
			this.props.dispatchers.createTodo(attributes);
		}
	}

	delete () {
		const {todo} = this.props;

		this.props.dispatchers.deleteTodo(todo.id);
	}
};
