export const recalculateIds = (array) => {
	return array.map((question, index) => ({
		...question,
		id: index + 1,
	}));
};