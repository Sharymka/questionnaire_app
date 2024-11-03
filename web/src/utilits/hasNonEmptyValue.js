export function hasNonEmptyValues(obj) {
	return Object.keys(obj).length > 0 &&
		Object.values(obj).every(value => value !== undefined && value !== null && value !== '');
}