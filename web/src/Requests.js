
export const postData = async (url, data, method = 'POST') => {
	try {
		const response = await fetch(url, {
			method: method,
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error while request send:", error);
		throw error;
	}
};
