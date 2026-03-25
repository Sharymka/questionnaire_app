import { CONFIG_ACTIONS } from './configActionTypes';
import { recalculateIds } from '@/shared/lib/utilits/recalculateIds';

export const configReducer = (state, action) => {
	switch (action.type) {
		case CONFIG_ACTIONS.BASE_CONFIG:
			return {
				...state,
				baseConfig: action.payload,
			};
		case CONFIG_ACTIONS.RESET_QUESTION_LIST:
			return {
				...state,
				baseConfig: action.payload,
				questionList: [],
			};
		case CONFIG_ACTIONS.INIT_QUESTION_LIST:
			return {
				...state,
				questionList: action.payload,
			};
		case CONFIG_ACTIONS.ADD_NEW_QUESTION:
			return {
				...state,
				questionList: [...(state.questionList || []), action.payload],
			};
		case CONFIG_ACTIONS.TOGGLE_QUESTION_MODE:
			return {
				...state,
				questionList: state.questionList.map((item) => {
					if (item.id !== action.payload) return item;

					if (item.question === 'edit') {
						return { ...item, question: 'readOnly', checkboxMode: 'readOnly' };
					}

					if (item.question === 'readOnly') {
						return { ...item, question: 'edit', checkboxMode: 'edit' };
					}

					return item;
				}),
			};
		case CONFIG_ACTIONS.REMOVE_QUESTION:
			return {
				...state,
				questionList: recalculateIds(
					state.questionList.filter((item) => item.id !== action.payload)
				),
			};
		default:
			return state;
	}
};
