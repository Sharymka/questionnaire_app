
import { useEffect, useState } from 'react';
import {getTags, saveTags, setTags} from "../storage/tagStorage";

const useActionsTags = (tags, onTagsChange) => {
	const [tagsOptions, setTagsOptions] = useState([]);

	useEffect(()=> {
		setTags();
		setTagsOptions(getTags());
	},[])

	const addTags = (newTag) => {
		if (!newTag || !newTag.label) {
			onTagsChange([]);
			return;
		}
		onTagsChange((prevState = []) => {
			const isTagExists = prevState.some(tag => tag.label === newTag.label);

			return isTagExists ? prevState : [...prevState, newTag];
		});
	};

	const deleteTag = (tagId) => {
		onTagsChange((prevState) => prevState.filter((tag) => tag.id !== tagId));
	};

	const addNewOptionTag = (newTagLabel) => {
		const findTag = tagsOptions.find((tag) => newTagLabel === tag?.label);

		if (!findTag){
			const updatedTags = [...tagsOptions, { id: tags.length + 1, label: newTagLabel }];
			saveTags(updatedTags);
			setTagsOptions(getTags());
		}
	};

	return {
		tagsOptions,
		addTags,
		deleteTag,
		addNewOptionTag
	};
};

export default useActionsTags;
