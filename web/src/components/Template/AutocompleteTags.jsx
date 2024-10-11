import React, {useContext} from 'react';
import {TemplateContext} from "./TemplateContext";
import CustomAutoComplete from "./ReusableComponents/CustomAutoComplete";
import {LABEL_TAGS, tags} from "../../const/const";

function AutocompleteTags(props) {
	const {selectedTags, setSelectedTags} =  useContext(TemplateContext);

	const handleSelectedUsers = (newTag) => {
		if (newTag.length === 0) {
			setSelectedTags([]);
		}
		newTag.forEach((user) => {
			setSelectedTags((prevState) => {
				if (prevState.includes(user)) {
					return prevState;
				} else {
					return [...prevState, user];
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
			handleValue={handleSelectedUsers}
			sortBy=''
			deleteTag={deleteTag} placeholder=''
		/>
	);
}

export default AutocompleteTags;