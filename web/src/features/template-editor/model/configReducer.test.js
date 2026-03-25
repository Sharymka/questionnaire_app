import { configReducer } from './configReducer';
import { CONFIG_ACTIONS } from './configActionTypes';

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
		const next = configReducer(initialState, { type: CONFIG_ACTIONS.BASE_CONFIG, payload });
		expect(next).toEqual({
			...initialState,
			baseConfig: payload,
		});
	});

	it('REMOVE_QUESTION filters by id and re-indexes', () => {
		const state = {
			baseConfig: { foo: 1 },
			questionList: [
				{ id: 1, question: 'readOnly' },
				{ id: 2, question: 'edit' },
				{ id: 3, question: 'readOnly' },
			],
		};
		const next = configReducer(state, { type: CONFIG_ACTIONS.REMOVE_QUESTION, payload: 2 });
		expect(next.questionList).toEqual([
			{ id: 1, question: 'readOnly' },
			{ id: 2, question: 'readOnly' },
		]);
		expect(next.baseConfig).toEqual({ foo: 1 });
	});

	it('TOGGLE_QUESTION_MODE switches edit to readOnly', () => {
		const state = {
			baseConfig: null,
			questionList: [
				{ id: 1, question: 'edit', checkboxMode: 'edit' },
				{ id: 2, question: 'readOnly', checkboxMode: 'readOnly' },
			],
		};
		const next = configReducer(state, { type: CONFIG_ACTIONS.TOGGLE_QUESTION_MODE, payload: 1 });
		expect(next.questionList[0]).toEqual({ id: 1, question: 'readOnly', checkboxMode: 'readOnly' });
		expect(next.questionList[1]).toEqual({ id: 2, question: 'readOnly', checkboxMode: 'readOnly' });
	});

	it('TOGGLE_QUESTION_MODE switches readOnly to edit', () => {
		const state = {
			baseConfig: null,
			questionList: [
				{ id: 1, question: 'readOnly', checkboxMode: 'readOnly' },
			],
		};
		const next = configReducer(state, { type: CONFIG_ACTIONS.TOGGLE_QUESTION_MODE, payload: 1 });
		expect(next.questionList[0]).toEqual({ id: 1, question: 'edit', checkboxMode: 'edit' });
	});

	it('TOGGLE_QUESTION_MODE with unknown question value returns item unchanged', () => {
		const state = {
			baseConfig: null,
			questionList: [
				{ id: 1, question: 'unknown', checkboxMode: 'unknown' },
			],
		};
		const next = configReducer(state, { type: CONFIG_ACTIONS.TOGGLE_QUESTION_MODE, payload: 1 });
		expect(next.questionList[0]).toEqual({ id: 1, question: 'unknown', checkboxMode: 'unknown' });
	});

	it('RESET_QUESTION_LIST clears questionList and sets baseConfig', () => {
		const state = {
			baseConfig: { old: true },
			questionList: [
				{ id: 1, question: 'edit' },
				{ id: 2, question: 'readOnly' },
			],
		};
		const newBaseConfig = { new: true };
		const next = configReducer(state, { type: CONFIG_ACTIONS.RESET_QUESTION_LIST, payload: newBaseConfig });
		expect(next.questionList).toEqual([]);
		expect(next.baseConfig).toEqual({ new: true });
	});
});
