jest.mock('axios', () => {
	const instance = {
		get: jest.fn(),
		post: jest.fn(),
		delete: jest.fn(),
		interceptors: {
			request: { use: jest.fn() },
			response: { use: jest.fn() },
		},
	};
	return {
		__esModule: true,
		default: {
			create: jest.fn(() => instance),
		},
		_instance: instance,
	};
});

import axios from 'axios';
import { deleteData, getData, postData, postFileData } from './requests';

const client = axios._instance;

describe('shared/api/requests', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('getData calls apiClient.get', async () => {
		const response = { data: { ok: true } };
		client.get.mockResolvedValue(response);

		const result = await getData('/test');

		expect(client.get).toHaveBeenCalledWith('/test');
		expect(result).toBe(response);
	});

	it('postData calls apiClient.post', async () => {
		const payload = { a: 1 };
		const response = { data: payload, status: 200 };
		client.post.mockResolvedValue(response);

		const result = await postData('/save', payload);

		expect(client.post).toHaveBeenCalledWith('/save', payload);
		expect(result).toBe(response);
	});

	it('postFileData sets multipart header', async () => {
		const formData = new FormData();
		client.post.mockResolvedValue({ status: 200 });

		await postFileData('/upload', formData);

		expect(client.post).toHaveBeenCalledWith('/upload', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	});

	it('deleteData calls apiClient.delete', async () => {
		client.delete.mockResolvedValue({ status: 204 });

		await deleteData('/item/1');

		expect(client.delete).toHaveBeenCalledWith('/item/1');
	});
});
