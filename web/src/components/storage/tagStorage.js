import {initialTags} from "../../const/const";

export const loadTags = () => {
	const savedTags = JSON.parse(localStorage.getItem('tags'));
	return savedTags || initialTags;
};

export const saveTags = (tags) => {
	localStorage.setItem('tags', JSON.stringify(tags));
};

export const removeTagById = (id) => {
	const tags = JSON.parse(localStorage.getItem('tags')) || [];
	const updatedTags = tags.filter(tag => tag.id !== id);
	localStorage.setItem('tags', JSON.stringify(updatedTags));
};



