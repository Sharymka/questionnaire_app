'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('forms', [
			{
				id: 1,
				idTemplate: 1,
				idUser: 1,
				questions: JSON.stringify([
					{
						id: 1,
						question: "Что такое экология?",
						answerType: "paragraph",
						answer: "Экология — это наука, изучающая взаимосвязь живых существ с окружающей средой.",
						selectedUsers: [{ id: 1, first_name: "Иван", last_name: "Иванов", email: "ivan@example.com" }],
						access: "restricted",
					},
					{
						id: 2,
						question: "Как экология влияет на наше здоровье?",
						answerType: "paragraph",
						answer: "Загрязнение окружающей среды увеличивает риск респираторных и сердечно-сосудистых заболеваний.",
						selectedUsers: [{ id: 3, first_name: "Сергей", last_name: "Сергеев", email: "sergey@example.com" }],
						access: "restricted",
					},
					{
						id: 3,
						question: "Какие основные проблемы экологии существуют?",
						answerType: "paragraph",
						answer: "Основные проблемы — это загрязнение воздуха, водных ресурсов и изменение климата.",
						selectedUsers: [{ id: 4, first_name: "Александр", last_name: "Александров", email: "alexander@example.com" }],
						access: "restricted",
					},
					{
						id: 4,
						question: "Что можно сделать для улучшения состояния экологии?",
						answerType: "paragraph",
						answer: "Можно использовать альтернативные источники энергии и уменьшить количество пластиковых отходов.",
						selectedUsers: null,
						access: "public",
					}
				]),

				createdAt: new Date(),
				updatedAt: new Date()
			},

			// Записи для шаблона "Свадьба"
			{
				id: 6,
				idTemplate: 2,
				idUser: 1,
				questions: JSON.stringify([
					{
						id: 1,
						question: "Как вы планируете бюджет свадьбы?",
						answerType: "singleLine",
						answer: "Планируем бюджет исходя из 100 тысяч рублей.",
						selectedUsers: [{ id: 1, first_name: "Иван", last_name: "Иванов", email: "ivan@example.com" }],
						access: "restricted",
					},
					{
						id: 2,
						question: "Как вы планируете бюджет свадьбы?",
						answerType: "singleLine",
						answer: "Бюджет составляется совместно с родителями и составляет около 200 тысяч рублей.",
						selectedUsers: null,
						access: "public",
					},
					{
						id: 3,
						question: "Какие места для проведения свадьбы вы рассматриваете?",
						answerType: "checkboxes",
						answer: "На природе",
						selectedUsers: [{ id: 3, first_name: "Сергей", last_name: "Сергеев", email: "sergey@example.com" }],
						access: "restricted",
					},
					{
						id: 4,
						question: "Какой стиль свадьбы вам нравится?",
						answerType: "singleLine",
						answer: "Современный минимализм.",
						selectedUsers: [{ id: 5, first_name: "Наталья", last_name: "Натальевна", email: "natalia@example.com" }],
						access: "restricted",
					}

				]),

				createdAt: new Date(),
				updatedAt: new Date()
			},

			{
				id: 11,
				idTemplate: 3,
				idUser: 1,
				questions: JSON.stringify([
					{
						id: 1,
						question: "Как вы определяете хорошее родительство?",
						answerType: "paragraph",
						answer: "Хорошее родительство — это внимательность и забота о развитии ребёнка.",
						selectedUsers: [{ id: 1, first_name: "Иван", last_name: "Иванов", email: "ivan@example.com" }],
						access: "restricted",
					},
					{
						id: 2,
						question: "Как вы помогаете своему ребенку развивать навыки?",
						answerType: "singleLine",
						answer: "Занимаюсь с ним играми, развивающими логику и мышление.",
						selectedUsers: null,
						access: "public",
					},
					{
						id: 3,
						question: "Как вы выбираете книги для своего ребенка?",
						answerType: "checkboxes",
						answer: "Сказки",
						selectedUsers: null,
						access: "public",
					}

				]),
				createdAt: new Date(),
				updatedAt: new Date()
			},

		]);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('forms', null, {});
	}
};
