import React, {Component} from 'react';
import ui from 'redux-ui';
import pureRender from 'pure-render-decorator';

import Todo from './todo.component';
import Loading from './loading.component';

@ui({
	state: {
		selectedTodoId: null
	}
})
@pureRender
export default class TodoList extends Component {
	constructor (props) {
		super(props);

		this.refresh = this.refresh.bind(this);
	}

	componentDidMount () {
		this.refresh();
	}

	refresh () {
		this.props.dispatchers.fetchTodos();
	}

	render () {
		const todoState = this.props.state.todo;

		if (todoState.isFetching) {
			return <Loading />;
		}
		
		return (
			<div>
				{
					this.props.ui.selectedTodoId
						? null
						: <div className="pull-right">
								<button type="button" onClick={this.refresh} className="btn btn-lg btn-link">
									<span className="glyphicon glyphicon-refresh"></span>
								</button>
							</div>
				}
				<ul className="list-unstyled todo-list">
					{
						[
							...todoState.order.map(id => {
								const todo = todoState.todos[id];
								return <li key={todo.id}><Todo dispatchers={this.props.dispatchers} todo={todo} /></li>;
							}),
							<li key="0"><Todo dispatchers={this.props.dispatchers} todo={null} /></li>
						]
					}
				</ul>
			</div>
		);
	}
};
