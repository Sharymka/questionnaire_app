import React, {useEffect, useState} from 'react';
import CustomAutoComplete from "./CustomAutoComplete";
import {LABEL_TAGS, tags} from "../../../../const/const";
import {loadTags, saveTags} from "../../../storage/tagStorage";

function AutocompleteTags(props) {

	const { selectedTags, setSelectedTags } = props;
	const [tags, setTags] = useState([]);

	useEffect(() => {
		const loadedTags = loadTags();
		setTags(loadedTags);
	}, []);

	const handleSelectedTags = (newTag) => {
		if (newTag.length === 0) {
			setSelectedTags([]);
		}
		newTag.forEach((tag) => {
			setSelectedTags((prevState) => {
				if (prevState.includes(tag)) {
					return prevState;
				} else {
					return [...prevState, tag];
				}
			});
		})
	}

	const addNewOption = (newTag) => {
		console.log(newTag);
		const findTag = tags.find((tag) => newTag === tag.label);

		if (!findTag) {
			const updatedTags = [...tags, { id: tags.length + 1, label: newTag }];
			setTags(updatedTags); // Обновляем состояние
			saveTags(updatedTags); // Сохраняем в Local Storage
		}
	};

	const handleTextOnChange = (event) => {
		console.log("handleTextOnChange");
		setSelectedTags((prevState) => [...prevState, event.target.value]);
	}

	const deleteTag = (optionId)=> {
		setSelectedTags((prevState) => prevState.filter((tag)=> tag.id !== optionId))
	}
	const getOptionLabel = (option) => `${option.label}`;
	const getTagLabel =(option, sortBy)=> `${option.label}`;

	return (
		<CustomAutoComplete
			value={selectedTags}
			customOptions={tags}
			getOptionLabel={getOptionLabel}
			getTagLabel={getTagLabel}
			label={LABEL_TAGS}
			handleValue={handleSelectedTags}
			addNewOption={addNewOption}
			textOnChange={handleTextOnChange}
			sortBy=''
			deleteTag={deleteTag}
			variant="standard"
			placeholder=''
		/>
	);
}

export default AutocompleteTags;