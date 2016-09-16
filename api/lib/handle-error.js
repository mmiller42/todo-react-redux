import instanceOf from 'instance-of-name';

function handleError (err) {
	if (instanceOf(err, 'ClientError')) {
		console.log('Client-generated error:', err.message);
	} else {
		setImmediate(() => { throw err; });
	}
}

export default handleError;