import {initialTags} from "../../const/const";


export const setTags = () => {
	if (!localStorage.getItem('tags')) {
		localStorage.setItem('tags', JSON.stringify(initialTags));
	}
	return JSON.parse(localStorage.getItem('tags'));
};

export const getTags = () => {
	return JSON.parse(localStorage.getItem('tags')) || [];
};

export const saveTags = (tags) => {
	localStorage.setItem('tags', JSON.stringify(tags));
};

export const removeTagById = (id) => {
	const tags = JSON.parse(localStorage.getItem('tags')) || [];
	const updatedTags = tags.filter(tag => tag.id !== id);
	localStorage.setItem('tags', JSON.stringify(updatedTags));
};



