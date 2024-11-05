import React, {useContext} from "react";
import {TemplateContext} from "../userPage/contexts/TemplateContext";

const useActionsQuestion = (props) => {

	const { questions, setQuestions } = useContext(TemplateContext);

	const handleAddQuestionOnClick = () => {
		setQuestions((prevState)=> [...prevState, {
			id: prevState.length + 1,
			name: '',
			answerType: 'singleLine',
			checkboxes: [],
			access: 'public',
			selectedUsers: [],
			add: false
		}])
	}

	const handleTextFieldOnChange = (value,field) => {
		setQuestions((prevState) => {
			const updatedQuestions = [...prevState];
			updatedQuestions[updatedQuestions.length - 1][field] = value;
			return updatedQuestions;
		});
	}

	return {
		handleAddQuestionOnClick,
		handleTextFieldOnChange,
	}


}
export default useActionsQuestion;