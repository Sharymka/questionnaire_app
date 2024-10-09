export const answerTypeName = {
	'Текст (строка)': 'singleLine',
	'Текст (абзац)': 'paragraph',
	'Число': 'number',
	'Флажки': 'checkboxes',
};

export const questionTopics = {
	'Образование': 'education',
	'Работа': 'work',
	'Викторина': 'quiz',
	'Другое': 'other',
};

export const users = [
	{
		id: 1,
		first_name: 'Ivan',
		last_name: 'Petrov',
		email: 'ivan.petrov@example.com',
		password: 'securepassword123',
		role: 'user',
		status: 'active',
	},
	{
		id: 2,
		first_name: 'Maria',
		last_name: 'Ivanova',
		email: 'maria.ivanova@example.com',
		password: 'anothersecurepassword',
		role: 'admin',
		status: 'active',
	},
	{
		id: 3,
		first_name: 'Alex',
		last_name: 'Sidorov',
		email: 'alex.sidorov@example.com',
		password: 'yetanothersecurepassword',
		role: 'user',
		status: 'blocked',
	},
	]