

export const SINGLE_LINE ='singleLine';
export const PARAGRAPH ='paragraph';

export const NUMBER ='number';

export const CHECKBOXES ='checkboxes';

export const answerTypeName = {
	singleLine:'Краткий ответ',
	paragraph: 'Развернутый ответ',
	number:'Числовой ответ',
	checkboxes:'Варианты ответа',
};



export const  textFieldNames = {
	title: 'Название',
	topic: 'Тема',
	description: 'Описание',
	tags: 'Теги',
	question: 'задайте вопрос',
	checkbox: 'введите вариант',
	answerType: 'Ответ'
}


export const questionTopics = {
	'education':'Образование',
	'work':'Работа',
	'quiz':'Викторина',
	'ecology': 'Экология',
	'event':'Мероприятие',
	'wedding': 'Свадба',
	'parenting': 'Родительство',
	'other':'Другое'
};

export const accessOptions = {
	'public':'Общедоступный',
	'restricted':'Ограниченный'
}
export const LABEL_USERS='Пользователи';
export const LABEL_TAGS='Теги';

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

export const initialTags = [
	{ id: 1, label: "Наука" },
	{ id: 2, label: "Технологии" },
	{ id: 3, label: "Искусственный интеллект" },
	{ id: 4, label: "Здоровье" },
	{ id: 5, label: "Образование" },
	{ id: 6, label: "Развлечения" },
	{ id: 7, label: "Спорт" },
	{ id: 8, label: "Путешествия" },
	{ id: 9, label: "Финансы" },
	{ id: 10, label: "Кулинария" },
	{ id: 11, label: "Искусство" },
	{ id: 12, label: "Мероприятие" },
	{ id: 13, label: "Экология" },
	{ id: 14, label: "Литература" },
	{ id: 15, label: "Музыка" },
	{ id: 16, label: "Фотография" },
	{ id: 17, label: "Семья" },
	{ id: 18, label: "Психология" },
	{ id: 19, label: "Маркетинг" },
	{ id: 20, label: "Социальные сети" },
	{ id: 21, label: "Праздник" },
	{ id: 22, label: "День Рождение" },
	{ id: 23, label: "Приглашение" },
];