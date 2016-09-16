import React, {Component} from 'react';

import TodoList from './todo-list';

class App extends Component {
	render () {
		return (
			<div>
				<h1>Todos</h1>
				<TodoList />
			</div>
		)
	}
}

export default App;
