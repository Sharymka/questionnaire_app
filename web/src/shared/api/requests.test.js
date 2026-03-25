jest.mock('axios', () => ({
	__esModule: true,
	default: {
		get: jest.fn(),
		post: jest.fn(),
		delete: jest.fn(),
	},
}));

import axios from 'axios';
import { deleteData, getData, postData, postFileData } from './requests';

describe('shared/api/requests', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('getData calls axios.get with withCredentials', async () => {
		const response = { data: { ok: true } };
		axios.get.mockResolvedValue(response);

		const result = await getData('/api/test');

		expect(axios.get).toHaveBeenCalledWith('/api/test', { withCredentials: true });
		expect(result).toBe(response);
	});

	it('postData calls axios.post with withCredentials', async () => {
		const payload = { a: 1 };
		const response = { data: payload, status: 200 };
		axios.post.mockResolvedValue(response);

		const result = await postData('/api/save', payload);

		expect(axios.post).toHaveBeenCalledWith('/api/save', payload, {
			withCredentials: true,
		});
		expect(result).toBe(response);
	});

	it('postFileData sets multipart header', async () => {
		const formData = new FormData();
		axios.post.mockResolvedValue({ status: 200 });

		await postFileData('/api/upload', formData);

		expect(axios.post).toHaveBeenCalledWith('/api/upload', formData, {
			withCredentials: true,
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	});

	it('deleteData calls axios.delete with withCredentials', async () => {
		axios.delete.mockResolvedValue({ status: 204 });

		await deleteData('/api/item/1');

		expect(axios.delete).toHaveBeenCalledWith('/api/item/1', {
			withCredentials: true,
		});
	});
});
