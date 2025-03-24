export const configReducer = (state, action) => {
	switch(action.type) {
		case 'BASE_CONFIG':
			return {
				...state,
				baseConfig: action.payload,
			};
		case 'INIT_QUESTION_LIST':
			return {
				...state,
				questionList: action.payload,
			};
		case 'ADD_NEW_QUESTION':
			return {
				...state,
				questionList: [...(state.questionList || []), action.payload],
			};
		case 'TOGGLE_QUESTION_MODE':
			return {
				...state,
				questionList: state.questionList.map((item) => {
					if (item.id === action.payload.id) {
						if (item.question === 'edit') {
							return { ...item, question: 'readOnly', checkboxMode:'readOnly' };
						} else if (item.question === 'readOnly') {
							return { ...item, question: 'edit', checkboxMode:'edit' };
						}
					}
					return item;
				}),
			}
		case 'REMOVE_QUESTION':
			return {
				...state,
				questionList: action.payload.map((config, index) => ({
					...config,
					id: index + 1,
				}))
			}
	}
}