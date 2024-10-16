import React, {useContext} from 'react';
import {TemplateContext} from "./TemplateContext";
import CustomAutoComplete from "./ReusableComponents/CustomAutoComplete";
import {LABEL_TAGS, tags} from "../../const/const";

function AutocompleteTagsCard(props) {
	const { question, questionIndex } = props;
	const { setQuestions } =  useContext(TemplateContext);

	const handleSelectedTags = (newTag) => {
		if (newTag.length === 0) {
			setQuestions((prevState) =>
				prevState.map((question) => ({ ...question, selectedTags: [] }))
			);
		}else {
			newTag.forEach((tag) => {
				setQuestions((prevState) =>
					prevState.map((question, index) => {
						if(index === questionIndex ) {
							if (question.selectedTags.includes(tag)) {
								return question;
							} else {
								return { ...question, selectedTags: [...question.selectedTags, tag] };
							}
						}
					})
				);
			});
		}
	}

	const deleteTag = (selectedTagId)=> {
		setQuestions(prevState => prevState.map((question, index) => {
				if(index === questionIndex) {
					return { ...question, selectedTags: question.selectedTags.filter((tag, tagIndex) => tag.id !== selectedTagId)};
				} else {
					return question;
				}
		}))
	}
	const getOptionLabel = (option) => `${option.label}`;
	const getTagLabel =(option, sortBy)=> `${option.label}`;

	return (
		<CustomAutoComplete
			value={question.selectedTags}
			customOptions={tags}
			getOptionLabel={getOptionLabel}
			getTagLabel={getTagLabel}
			label={LABEL_TAGS}
			handleValue={handleSelectedTags}
			sortBy=''
			deleteTag={deleteTag}
			placeholder=''
		/>
	);
}

export default AutocompleteTagsCard;