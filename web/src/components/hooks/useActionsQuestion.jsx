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
			accessLevel: 'public',
			selectedUsers: [],
			add: false,
			edit: false
		}])
	}

	const handleTextFieldOnChange = (value,field) => {
		setQuestions((prevState) => {
			const updatedQuestions = [...prevState];
			updatedQuestions[updatedQuestions.length - 1][field] = value;
			return updatedQuestions;
		});
	}

	const handleEditOnClick = (questionId) => {
		console.log('questionId', questionId);
		setQuestions((prevState)=> prevState.map((question) => {
			if (question.id === questionId) {
				return {...question, edit: !question.edit}
			} else {
				return question;
			}
		}));
	}

	const handleDeleteOnClick = (questionId) => {
		setQuestions((prevState)=>
			prevState.filter((selectedQuestion) => selectedQuestion.id !== questionId),
		)
	}

	return {
		handleAddQuestionOnClick,
		handleTextFieldOnChange,
		handleEditOnClick,
		handleDeleteOnClick
	}


}
export default useActionsQuestion;