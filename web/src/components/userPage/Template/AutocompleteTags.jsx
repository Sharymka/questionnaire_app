import React from 'react';
import CustomAutoComplete from "./CustomAutoComplete";
import { LABEL_TAGS } from "../../../const/const";
import useActionsTags from "../../hooks/useActionsTags";

function AutocompleteTags(props) {

	const {
		value,
		onTagsChange
	} = props;

	const {
		tagsOptions,
		addTags,
		deleteTag,
		addNewOptionTag
	} = useActionsTags(value, onTagsChange);


	const handleTextOnChange = (event) => {
		onTagsChange((prevState) => [...prevState, event.target.value]);
	}

	const getOptionLabel = (option) => `${option.label}`;
	const getTagChipLabel =(option, sortBy)=> `${option.label}`;

	return (
		<CustomAutoComplete
			value={value}
			options={tagsOptions || []}
			label={LABEL_TAGS}
			getOptionLabel={getOptionLabel}
			getTagChipLabel={getTagChipLabel}
			addTags={addTags}
			addNewOptionTag={addNewOptionTag}
			textOnChange={handleTextOnChange}
			deleteTag={deleteTag}
		/>
	);
}

export default AutocompleteTags;