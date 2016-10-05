const INITIAL_STATE = {
	isPending: false,
	lastError: null
};

let operationsCount = 0;

export default function asyncReducer (state = INITIAL_STATE, {type, payload, error}) {
	if (type.endsWith('_PENDING')) {
		++operationsCount;

		if (!state.isPending) {
			return {...state, isPending: true};
		}
	} else if (type.endsWith('_COMPLETE')) {
		--operationsCount;

		if (error) {
			state = {...state, lastError: payload};
		}

		if (state.isPending && operationsCount === 0) {
			return {...state, isPending: false};
		}
	}

	return state;
};
