import React, {Component} from 'react';
import ui from 'redux-ui-shallow';
import pureRender from 'pure-render-decorator';

import '../styles/todo.component.css';

@ui({
	state: {
		description: props => props.todo ? props.todo.description : '',
		isCompleted: props => props.todo ? props.todo.isCompleted : false
	},
	shallowCompare: true
})
@pureRender
export default class Todo extends Component {
	constructor (props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
		this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.selectTodo = this.selectTodo.bind(this);
		this.save = this.save.bind(this);
	}

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
			<form className={todo ? 'input-group' : ''} onSubmit={this.handleSubmit}>
				<input type="text" required autoFocus value={ui.description} className="form-control"
					onChange={this.handleInputChange}
				 onKeyDown={this.handleInputKeyDown}
					placeholder={todo ? todo.description : 'New todo'} />
				{
					todo
						? <span className="input-group-btn">
								<button type="button" className="btn btn-default"
									onClick={this.handleDeleteButtonClick}>
									<span className="glyphicon glyphicon-trash"></span>
								</button>
							</span>
						: null
				}
			</form>
		);
	}

	handleSubmit (e) {
		const {todo} = this.props;

		e.preventDefault();
		this.save();
		this.props.updateUI('selectedTodoId', null);
		if (!todo && this.props.ui.description !== '') {
			setTimeout(() => this.props.updateUI('description', ''), 0);
		}
	}

	handleInputChange (e) {
		this.props.updateUI('description', e.target.value);
	}

	handleInputKeyDown (e) {
		if (e.key === 'Escape') {
			this.props.updateUI('selectedTodoId', null)
		}
	}

	handleDeleteButtonClick () {
		this.delete();
		this.props.updateUI('selectedTodoId', null);
	}
	
	renderViewMode () {
		const {todo, ui} = this.props;
		
		return (
			<div className="form-inline">
				<div className="form-group">
					<label className={todo ? '' : ' hidden'}>
						<input type="checkbox" checked={ui.isCompleted}
							onChange={this.handleCheckboxChange} />
					</label>
					<p className="form-control-static" onClick={this.selectTodo}>
						{todo ? this.renderDescription() : <i className="text-muted">New todo</i>}
					</p>
				</div>
			</div>
		);
	}

	handleCheckboxChange (e) {
		this.toggleIsCompleted(e.target.checked);
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
		setTimeout(this.save, 0);
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
