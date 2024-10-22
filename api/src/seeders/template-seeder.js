'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const templates = [
			{
				id:1,
				userId: 1,
				img: "https://res.cloudinary.com/dewxfivxh/image/upload/v1729586264/planet_mvfsx5.jpg",
				title: 'Шаблон на тему "Экология"',
				topic: 'Экология',
				description: 'Этот шаблон охватывает важные аспекты темы "Экология". Вопросы помогут вам глубже понять различные мнения и подходы к данной теме.',
				tags: JSON.stringify(['Экология', 'Наука']), // Измените на JSON-строку
				questions: JSON.stringify([  // Измените на JSON-строку
					{
						name: "Что такое экология?",
						access: "public",
						answerType: "paragraph",
						selectedUsers: [], // Обязательно указать пустой массив
						checkboxes: [] // Обязательно указать пустой массив
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
				]),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id:2,
				userId: 1,
				img: "https://res.cloudinary.com/dewxfivxh/image/upload/v1729586264/merry_njpuyv.jpg",
				title: 'Шаблон на тему "Свадьба"',
				topic: 'Свадьба',
				description: 'Этот шаблон охватывает важные аспекты организации свадеб. Вопросы помогут вам понять, что необходимо для успешного проведения мероприятия.',
				tags: JSON.stringify(['Свадьба', 'Праздник']),
				questions: JSON.stringify([
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
				]),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id:3,
				userId: 1,
				img:"https://res.cloudinary.com/dewxfivxh/image/upload/v1729586265/family_ggc73k.jpg",
				title: 'Шаблон на тему "Родительство"',
				topic: 'Родительство',
				description: 'Этот шаблон охватывает важные аспекты хорошего родительства. Вопросы помогут вам понять различные подходы к воспитанию детей.',
				tags: JSON.stringify(['Родительство', 'Семья']),
				questions: JSON.stringify([
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
				]),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];

		try {
			await queryInterface.bulkDelete('templates', null, {});
			return await queryInterface.bulkInsert('templates', templates, {});
		} catch (error) {
			console.error('Error inserting templates:', error);
			throw error; // Пробросим ошибку дальше
		}
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('templates', null, {});
	}
};
