
export const postData = async (url, data, method = 'POST') => {

		const response = await fetch(url, {
			method: method,
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		return response;
};

export const getData = async (url, method = 'GET') => {

	const response = await fetch(url, {
		method: method,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
	});

	return response;
};


export const deleteData = async (url, method = 'DELETE') => {
	const response = await fetch(url, {
		method: method,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
	});

	return response;
}