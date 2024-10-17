import React, {useContext} from 'react';
import {TemplateContext} from "./TemplateContext";
import CustomAutoComplete from "./ReusableComponents/CustomAutoComplete";
import {LABEL_TAGS, tags} from "../../const/const";

function AutocompleteTags() {
	const { selectedTags, setSelectedTags } =  useContext(TemplateContext);

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
			sortBy=''
			deleteTag={deleteTag}
			variant="standard"
			placeholder=''
		/>
	);
}

export default AutocompleteTags;