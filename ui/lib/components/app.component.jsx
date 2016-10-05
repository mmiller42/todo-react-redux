import React, {Component} from 'react';
import ui from 'redux-ui';
import pureRender from 'pure-render-decorator';

import '../styles/app.component.css';
import AsyncContainer from '../containers/async.container';
import ErrorMessage from './error-message.component';
import TodoContainer from '../containers/todo.container';
import TodoList from './todo-list.component';

@ui()
@pureRender
export default class App extends Component {
	render () {
		return (
			<div className="container">
				<div className="header clearfix">
					<h3 className="text-muted">Todos</h3>
				</div>
				<div>
					<AsyncContainer>
						<ErrorMessage />
					</AsyncContainer>
					<TodoContainer>
						<TodoList />
					</TodoContainer>
				</div>
				<div className="footer">
					<p>
						© <a href="https://mmiller.me/" target="_blank">Matt Miller</a>.
						Powered by <a href="http://reactjs.com/" target="_blank">React</a>,{' '}
						<a href="http://redux.js.org/" target="_blank">Redux</a>, and{' '}
						<a href="https://autonym.io/" target="_blank">Autonym</a>.
					</p>
				</div>
			</div>
		)
	}
};
