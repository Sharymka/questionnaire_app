// tagStorage.js

// Начальные теги
const initialTags = [
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
	{ id: 20, label: "Социальные сети" }
];

// Функция для загрузки тегов
export const loadTags = () => {
	const savedTags = JSON.parse(localStorage.getItem('tags'));
	return savedTags || initialTags; // Возвращаем сохраненные теги или начальные
};

// Функция для сохранения тегов
export const saveTags = (tags) => {
	localStorage.setItem('tags', JSON.stringify(tags));
};
