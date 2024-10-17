
export const postData = async (url, data, method = 'POST') => {

		const response = await fetch(url, {
			method: method,
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		// if (!response.ok) {
		// 	const errorPayload = await response.json();
		// 	// console.error(errorPayload);
		// 	throw new Error(errorPayload.error);
		// }

		// return await response.json();
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
