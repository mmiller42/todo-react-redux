export default function promisifySuperagent (request) {
	return request
		.then(res => res.body)
		.catch(err => {
			throw err.response ? err.response.body : err;
		});
};
