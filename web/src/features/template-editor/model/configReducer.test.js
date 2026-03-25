import { configReducer } from './configReducer';

describe('configReducer', () => {
	const initialState = {
		baseConfig: { foo: 1 },
		questionList: [{ id: 1, question: 'readOnly' }],
	};

	it('returns previous state for unknown action', () => {
		const next = configReducer(initialState, { type: 'UNKNOWN_ACTION', payload: null });
		expect(next).toBe(initialState);
	});

	it('applies BASE_CONFIG', () => {
		const payload = { x: 2 };
		const next = configReducer(initialState, { type: 'BASE_CONFIG', payload });
		expect(next).toEqual({
			...initialState,
			baseConfig: payload,
		});
	});
});
