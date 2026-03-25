import axios from "axios";

const apiClient = axios.create({
	baseURL: '/api',
	withCredentials: true,
});

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			console.warn('Session expired or unauthorized');
		}
		return Promise.reject(error);
	},
);

export const postData = (url, data) =>
	apiClient.post(url, data);

export const postFileData = (url, data) =>
	apiClient.post(url, data, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});

export const getData = (url) =>
	apiClient.get(url);

export const deleteData = (url) =>
	apiClient.delete(url);
