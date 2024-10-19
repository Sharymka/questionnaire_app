export const templates = [
	{
		id: 1,
		userId: 1,
		title: 'Шаблон на тему "Экология"',
		topic: 'other',
		description: 'Этот шаблон охватывает важные аспекты темы "Экология". Вопросы помогут вам глубже понять различные мнения и подходы к данной теме.',
		selectedTags: [{id:1, label: 'Экология'}, {id:1, label: 'Наука'}],
		questions: [
			{
				name: "Что такое экология?",
				access: "public",
				answerType: "paragraph",
				selectedUsers: [],
				checkboxOptions: []
			},
			{
				name: "Как экология влияет на наше здоровье?",
				access: "public",
				answerType: "paragraph",
				selectedUsers: [],
				checkboxOptions: []
			},
			{
				name: "Какие основные проблемы экологии существуют?",
				access: "public",
				answerType: "paragraph",
				selectedUsers: [],
				checkboxOptions: []
			},
			{
				name: "Что можно сделать для улучшения состояния экологии?",
				access: "public",
				answerType: "paragraph",
				selectedUsers: [],
				checkboxOptions: []
			},
		],
	},
	{
		id: 2,
		userId: 1,
		title: 'Шаблон на тему "Свадьба"',
		topic: 'other',
		description: 'Этот шаблон охватывает важные аспекты организации свадеб. Вопросы помогут вам понять, что необходимо для успешного проведения мероприятия.',
		selectedTags: ['Свадьба', 'Праздник'],
		questions: [
			{
				name: "Как вы планируете бюджет свадьбы?",
				access: "public",
				answerType: "singleLine",
				selectedUsers: [],
				checkboxOptions: []
			},
			{
				name: "Какие места для проведения свадьбы вы рассматриваете?",
				access: "public",
				answerType: "checkboxes",
				selectedUsers: [],
				checkboxOptions: [{ value: "Зал" }, { value: "На природе" }, { value: "Дома" }]
			},
			{
				name: "Какой стиль свадьбы вам нравится?",
				access: "public",
				answerType: "singleLine",
				selectedUsers: [],
				checkboxOptions: []
			},
			{
				name: "Как вы выбираете дату свадьбы?",
				access: "public",
				answerType: "paragraph",
				selectedUsers: [],
				checkboxOptions: []
			},
		],
	},
	{
		id: 3,
		userId: 1,
		title: 'Шаблон на тему "Родительство"',
		topic: 'other',
		description: 'Этот шаблон охватывает важные аспекты хорошего родительства. Вопросы помогут вам понять различные подходы к воспитанию детей.',
		selectedTags: ['Семья'],
		questions: [
			{
				name: "Как вы определяете хорошее родительство?",
				access: "public",
				answerType: "paragraph",
				selectedUsers: [],
				checkboxOptions: []
			},
			{
				name: "Как вы помогаете своему ребенку развивать навыки?",
				access: "restricted",
				answerType: "singleLine",
				selectedUsers: [{ id: 3, first_name: "Светлана", last_name: "Кузнецова", email: "svetlana@example.com" }],
				checkboxOptions: []
			},
			{
				name: "Как вы выбираете книги для своего ребенка?",
				access: "public",
				answerType: "checkboxes",
				selectedUsers: [],
				checkboxOptions: [{ value: "Сказки" }, { value: "Образовательные книги" }, { value: "Приключенческие книги" }]
			},
			{
				name: "Что для вас самое важное в воспитании детей?",
				access: "public",
				answerType: "paragraph",
				selectedUsers: [],
				checkboxOptions: []
			},
		],
	},
];
