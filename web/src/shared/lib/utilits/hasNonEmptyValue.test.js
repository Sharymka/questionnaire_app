import { hasNonEmptyValues } from './hasNonEmptyValue';

describe('hasNonEmptyValues', () => {
	it('returns false for empty object', () => {
		expect(hasNonEmptyValues({})).toBe(false);
	});

	it('returns true when all values are non-empty', () => {
		expect(hasNonEmptyValues({ a: 'x', b: 0 })).toBe(true);
	});

	it('returns false when a value is empty string', () => {
		expect(hasNonEmptyValues({ a: 'ok', b: '' })).toBe(false);
	});
});
