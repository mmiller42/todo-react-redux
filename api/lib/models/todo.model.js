import {Model} from 'autonym';
import {NotFoundError, BadRequestError, InvalidPayloadError} from 'autonym-client-errors';

class Todo extends Model {
	static _create (attributes) {
		const id = ++Todo._counter;
		const todo = {...attributes, id};
		Todo._todos.push(todo);
		Todo._todosById[id] = todo;
		return Promise.resolve(todo);
	}
	
	static _find (query) {
		return Promise.resolve(Todo._todos);
	}
	
	static _findOne (id) {
		const todo = Todo._todosById[id];
		if (todo) {
			return Promise.resolve(todo);
		} else {
			return Promise.reject(new NotFoundError('No resource found that meets the given criteria.'));
		}
	}
	
	static _findOneAndUpdate (id, attributes) {
		const todo = Todo._todosById[id];
		if (todo) {
			return Promise.resolve(Object.assign(todo, attributes));
		} else {
			return Promise.reject(new NotFoundError('No resource found that meets the given criteria.'));
		}
	}
	
	static _findOneAndDelete (id) {
		const todo = Todo._todosById[id];
		const index = Todo._todos.indexOf(todo);
		if (index > -1) {
			Todo._todos.splice(index, 1);
			delete Todo._todosById[id];
			return Promise.resolve(null);
		} else {
			return Promise.reject(new NotFoundError('No resource found that meets the given criteria.'));
		}
	}
}

Todo._todos = [];
Todo._todosById = {};
Todo._counter = 0;

export default Todo;