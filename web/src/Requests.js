import axios from "axios";

export const postData = async (url, data, method = 'POST') => {
	try {
		const response = await axios({
			method: method,
			url: url,
			data: data,
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response;
	} catch (error) {
		throw error;
	}
};

export const postFileData = async (url, data, method = 'POST') => {
	try {
		const response = await axios({
			method: method,
			url: url,
			data: data,
			withCredentials: true,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response;
	} catch (error) {
		throw error;
	}
};


export const getData = async (url, method = 'GET') => {
	try {
		const response = await axios({
			method: method,
			url: url,
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response;
	} catch (error) {
		throw error;
	}
};


export const deleteData = async (url, method = 'DELETE') => {
	try {
		const response = await axios({
			method: method,
			url: url,
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response;
	} catch (error) {
		throw error;
	}
};