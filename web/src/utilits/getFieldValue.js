
export function getFieldValue(value, firstKey) {
	let fieldValue;

	switch (true) {
		case value[firstKey] === undefined:
			fieldValue = 'Значение не найдено';
			break;
		case value[firstKey] === null:
			fieldValue = 'Значение не найдено';
			break;
		case value[firstKey] === '':
			fieldValue = '';
			break;
		case value[firstKey] === 0:
			fieldValue = 'Ноль';
			break;
		case value[firstKey] === false:
			fieldValue = 'Ложное значение';
			break;
		default:
			fieldValue = value[firstKey] || 'Неизвестное значение';
	}

	return fieldValue;
}
