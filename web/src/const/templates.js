export const templates = [
	{
		id: 1,
		userId: 1,
		title: 'Шаблон на тему "Экология"',
		topic: 'ecology',
		description: 'Этот шаблон охватывает важные аспекты темы "Экология". Вопросы помогут вам глубже понять различные мнения и подходы к данной теме.',
		tags: ['Экология', 'Наука'],
		questions: [
			{
				name: "Что такое экология?",
				access: "public",
				answerType: "paragraph",
				selectedUsers: [],
				checkboxes: []
			},
			{
				name: "Как экология влияет на наше здоровье?",
				access: "public",
				answerType: "paragraph",
				selectedUsers: [],
				checkboxes: []
			},
			{
				name: "Какие основные проблемы экологии существуют?",
				access: "public",
				answerType: "paragraph",
				selectedUsers: [],
				checkboxes: []
			},
			{
				name: "Что можно сделать для улучшения состояния экологии?",
				access: "public",
				answerType: "paragraph",
				selectedUsers: [],
				checkboxes: []
			},
		],
	},
	{
		id: 2,
		userId: 1,
		title: 'Шаблон на тему "Свадьба"',
		topic: 'wedding',
		description: 'Этот шаблон охватывает важные аспекты организации свадеб. Вопросы помогут вам понять, что необходимо для успешного проведения мероприятия.',
		tags: ['Свадьба', 'Праздник'],
		questions: [
			{
				name: "Как вы планируете бюджет свадьбы?",
				access: "public",
				answerType: "singleLine",
				selectedUsers: [],
				checkboxes: []
			},
			{
				name: "Какие места для проведения свадьбы вы рассматриваете?",
				access: "public",
				answerType: "checkboxes",
				selectedUsers: [],
				checkboxes: [{ value: "Зал" }, { value: "На природе" }, { value: "Дома" }]
			},
			{
				name: "Какой стиль свадьбы вам нравится?",
				access: "public",
				answerType: "singleLine",
				selectedUsers: [],
				checkboxes: []
			},
			{
				name: "Как вы выбираете дату свадьбы?",
				access: "public",
				answerType: "paragraph",
				selectedUsers: [],
				checkboxes: []
			},
		],
	},
	{
		id: 3,
		userId: 1,
		title: 'Шаблон на тему "Родительство"',
		topic: 'parenting',
		description: 'Этот шаблон охватывает важные аспекты хорошего родительства. Вопросы помогут вам понять различные подходы к воспитанию детей.',
		tags: ['Родительство', 'Семья'],
		questions: [
			{
				name: "Как вы определяете хорошее родительство?",
				access: "public",
				answerType: "paragraph",
				selectedUsers: [],
				checkboxes: []
			},
			{
				name: "Как вы помогаете своему ребенку развивать навыки?",
				access: "restricted",
				answerType: "singleLine",
				selectedUsers: [{ id: 3, first_name: "Светлана", last_name: "Кузнецова", email: "svetlana@example.com" }],
				checkboxes: []
			},
			{
				name: "Как вы выбираете книги для своего ребенка?",
				access: "public",
				answerType: "checkboxes",
				selectedUsers: [],
				checkboxes: [{ value: "Сказки" }, { value: "Образовательные книги" }, { value: "Приключенческие книги" }]
			},
			{
				name: "Что для вас самое важное в воспитании детей?",
				access: "public",
				answerType: "paragraph",
				selectedUsers: [],
				checkboxes: []
			},
		],
	},
];
