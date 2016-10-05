import {Model} from 'autonym';
import InMemoryStore from '../stores/in-memory.store';

class Todo extends Model {
	static _init () {
		super._implementDefaultStoreCrudMethods(new InMemoryStore());
	}

	static _serialize (attributes) {
		if ('id' in attributes) {
			attributes.id = String(attributes.id);
		}
		return attributes;
	}
}

export default Todo;
