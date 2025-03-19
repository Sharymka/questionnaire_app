'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const templates = [
			{
				id: 1,
				userId: 1,
				img: "https://res.cloudinary.com/dewxfivxh/image/upload/v1729586264/merry_njpuyv.jpg",
				title: 'Шаблон на тему "Свадьба"',
				topic: 'wedding',
				description: 'Этот шаблон охватывает важные аспекты организации свадеб. Вопросы помогут вам понять, что необходимо для успешного проведения мероприятия.',
				tags: JSON.stringify([{ id: 21, label: 'Праздник' }, { id: 12, label: 'Мероприятие' }]),
				questions: JSON.stringify([
					{
						id: 1,
						name: "Как вы планируете бюджет свадьбы?",
						access: "public",
						answerType: "singleLine",
						selectedUsers: [],
						checkboxes: []
					},
					{
						id: 2,
						name: "Какие места для проведения свадьбы вы рассматриваете?",
						access: "public",
						answerType: "checkboxes",
						selectedUsers: [],
						checkboxes: [
							{ id: 1, value: "Зал", selected: false },
							{ id: 2, value: "На природе", selected: false },
							{ id: 3, value: "Дома", selected: false }
						]
					},
					{
						id: 3,
						name: "Какой стиль свадьбы вам нравится?",
						access: "public",
						answerType: "singleLine",
						selectedUsers: [],
						checkboxes: []
					},
					{
						id: 4,
						name: "Как вы выбираете дату свадьбы?",
						access: "public",
						answerType: "paragraph",
						selectedUsers: [],
						checkboxes: []
					},
				]),
				disable: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				userId: 1,
				img: "https://res.cloudinary.com/dewxfivxh/image/upload/v1729586264/planet_mvfsx5.jpg",
				title: 'Шаблон на тему "Экология"',
				topic: 'ecology',
				description: 'Этот шаблон охватывает важные аспекты темы "Экология". Вопросы помогут вам глубже понять различные мнения и подходы к данной теме.',
				tags: JSON.stringify([{ id: 13, label: 'Экология' }, { id: 1, label: 'Наука' }]),
				questions: JSON.stringify([
					{
						id: 1,
						name: "Что такое экология?",
						access: "restricted",
						answerType: "paragraph",
						selectedUsers: [{ id: 1, first_name: "Ivan", last_name: "Ivanov", email: "ivan@mail.ru"}],
						checkboxes: []
					},
					{
						id: 2,
						name: "Как экология влияет на наше здоровье?",
						access: "public",
						answerType: "paragraph",
						selectedUsers: [],
						checkboxes: []
					},
					{
						id: 3,
						name: "Какие основные проблемы экологии существуют?",
						access: "public",
						answerType: "paragraph",
						selectedUsers: [],
						checkboxes: []
					},
					{
						id: 4,
						name: "Что можно сделать для улучшения состояния экологии?",
						access: "public",
						answerType: "paragraph",
						selectedUsers: [],
						checkboxes: []
					},
				]),
				disable: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				userId: 1,
				img: "https://res.cloudinary.com/dewxfivxh/image/upload/v1729586265/family_ggc73k.jpg",
				title: 'Шаблон на тему "Родительство"',
				topic: 'parenting',
				description: 'Этот шаблон охватывает важные аспекты хорошего родительства. Вопросы помогут вам понять различные подходы к воспитанию детей.',
				tags: JSON.stringify([{ id: 17, label: 'Семья' }, { id: 18, label: 'Психология' }]),
				questions: JSON.stringify([
					{
						id: 1,
						name: "Как вы определяете хорошее родительство?",
						access: "public",
						answerType: "paragraph",
						selectedUsers: [],
						checkboxes: []
					},
					{
						id: 2,
						name: "Как вы помогаете своему ребенку развивать навыки?",
						access: "restricted",
						answerType: "singleLine",
						selectedUsers: [{ id: 3, first_name: "Светлана", last_name: "Кузнецова", email: "svetlana@example.com" }],
						checkboxes: []
					},
					{
						id: 3,
						name: "Какие вы выбираете книги для своего ребенка?",
						access: "public",
						answerType: "checkboxes",
						selectedUsers: [],
						checkboxes: [
							{ id: 1, value: "Сказки", selected: false },
							{ id: 2, value: "Образовательные книги", selected: false },
							{ id: 3, value: "Приключенческие книги", selected: false }
						]
					},
					{
						id: 4,
						name: "Что для вас самое важное в воспитании детей?",
						access: "public",
						answerType: "paragraph",
						selectedUsers: [],
						checkboxes: []
					},
				]),
				disable: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 4,
				userId: 1,
				img: "https://res.cloudinary.com/dewxfivxh/image/upload/v1736884884/education_hiohqi.jpg",
				title: 'Шаблон на тему "Образование"',
				topic: 'education',
				description: 'Этот шаблон охватывает вопросы, связанные с образованием и обучением.',
				tags: JSON.stringify([{ id: 5, label: 'Образование' }, { id: 1, label: 'Наука' }]),
				questions: JSON.stringify([
					{
						id: 1,
						name: "Какую роль образование играет в вашей жизни?",
						access: "public",
						answerType: "paragraph",
						selectedUsers: [],
						checkboxes: []
					},
					{
						id: 2,
						name: "Какие навыки вы хотели бы освоить?",
						access: "public",
						answerType: "singleLine",
						selectedUsers: [],
						checkboxes: []
					},
					{
						id: 3,
						name: "Какой уровень образования для вас важен?",
						access: "public",
						answerType: "checkboxes",
						selectedUsers: [],
						checkboxes: [
							{ id: 1, value: "Среднее", selected: false },
							{ id: 2, value: "Высшее", selected: false },
							{ id: 3, value: "Дополнительное", selected: false }
						]
					},
					{
						id: 4,
						name: "Какой формат обучения вам предпочтителен?",
						access: "public",
						answerType: "paragraph",
						selectedUsers: [],
						checkboxes: []
					},
				]),
				disable: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			// Новый шаблон для userId = 2 на тему "Работа"
			{
				id: 5,
				userId: 2,
				img: "https://res.cloudinary.com/dewxfivxh/image/upload/v1729542694/yhw69ktc4eumja4uksoy.avif",
				title: 'Шаблон на тему "Работа"',
				topic: 'work',
				description: 'Вопросы о карьере, профессиональном росте и работе.',
				tags: JSON.stringify([{ id: 2, label: 'Технологии' }, { id: 19, label: 'Маркетинг' }]),
				questions: JSON.stringify([
					{
						id: 1,
						name: "Как вы описали бы свою идеальную работу?",
						access: "public",
						answerType: "paragraph",
						selectedUsers: [],
						checkboxes: []
					},
					{
						id: 2,
						name: "Какие навыки необходимы в вашей профессии?",
						access: "public",
						answerType: "checkboxes",
						selectedUsers: [],
						checkboxes: [
							{ id: 1, value: "Коммуникация", selected: false },
							{ id: 2, value: "Управление временем", selected: false },
							{ id: 3, value: "Технические навыки", selected: false }
						]
					},
					{
						id: 3,
						name: "Что вас вдохновляет в работе?",
						access: "public",
						answerType: "singleLine",
						selectedUsers: [],
						checkboxes: []
					},
					{
						id: 4,
						name: "Какие факторы влияют на ваш карьерный рост?",
						access: "public",
						answerType: "paragraph",
						selectedUsers: [],
						checkboxes: []
					},
				]),
				disable: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			// Новый шаблон для userId = 2 на тему "Мероприятие"
			{
				id: 6,
				userId: 2,
				img: "https://res.cloudinary.com/dewxfivxh/image/upload/v1729542694/yhw69ktc4eumja4uksoy.avif",
				title: 'Шаблон на тему "Мероприятие"',
				topic: 'event',
				description: 'Шаблон для планирования и проведения мероприятий.',
				tags: JSON.stringify([{ id: 12, label: 'Мероприятие' }, { id: 21, label: 'Праздник' }]),
				questions: JSON.stringify([
					{
						id: 1,
						name: "Какое мероприятие вы планируете?",
						access: "public",
						answerType: "singleLine",
						selectedUsers: [],
						checkboxes: []
					},
					{
						id: 2,
						name: "Какие ресурсы необходимы для проведения?",
						access: "public",
						answerType: "paragraph",
						selectedUsers: [],
						checkboxes: []
					},
					{
						id: 3,
						name: "Сколько гостей вы ожидаете?",
						access: "public",
						answerType: "singleLine",
						selectedUsers: [],
						checkboxes: []
					},
					{
						id: 4,
						name: "Какой стиль мероприятия вам нравится?",
						access: "public",
						answerType: "checkboxes",
						selectedUsers: [],
						checkboxes: [
							{ id: 1, value: "Классический", selected: false },
							{ id: 2, value: "Современный", selected: false },
							{ id: 3, value: "Тематический", selected: false }
						]
					},
				]),
				disable: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];

		try {
			await queryInterface.bulkDelete('templates', null, {});
			return await queryInterface.bulkInsert('templates', templates, {});
		} catch (error) {
			console.error('Error inserting templates:', error);
			throw error;
		}
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('templates', null, {});
	}
};
