import {NotFoundError} from 'autonym-client-errors';

class InMemoryStore {
	constructor () {
		this._records = [];
		this._recordsById = {};
		this._counter = 0;
	}

	create (attributes) {
		const id = ++this._counter;
		const record = {...attributes, id};
		this._records.push(record);
		this._recordsById[id] = record;
		return Promise.resolve(record);
	}

	find (query) {
		return Promise.resolve(this._records);
	}

	findOne (id) {
		const record = this._recordsById[id];
		if (record) {
			return Promise.resolve(record);
		} else {
			return Promise.reject(new NotFoundError('No resource found that meets the given criteria.'));
		}
	}

	findOneAndUpdate (id, attributes) {
		const record = this._recordsById[id];
		if (record) {
			return Promise.resolve(Object.assign(record, attributes));
		} else {
			return Promise.reject(new NotFoundError('No resource found that meets the given criteria.'));
		}
	}

	findOneAndDelete (id) {
		const record = this._recordsById[id];
		const index = this._records.indexOf(record);
		if (index > -1) {
			this._records.splice(index, 1);
			delete this._recordsById[id];
			return Promise.resolve(null);
		} else {
			return Promise.reject(new NotFoundError('No resource found that meets the given criteria.'));
		}
	}
}

export default InMemoryStore;
