import React, {useContext} from "react";
import {TemplateContext} from "../userPage/contexts/TemplateContext";

const useActionsQuestion = (targetQuestion) => {

	const { setQuestions } = useContext(TemplateContext);

	const recalculateIds = (questionsArray) => {
		return questionsArray.map((question, index) => ({
			...question,
			id: index + 1,
		}));
	};
	const handleAddQuestionOnClick = () => {
		setQuestions((prevState) => {
			const newQuestions = [
				...prevState,
				{
					id: prevState.length + 1,
					name: "",
					answerType: "singleLine",
					checkboxes: [],
					accessLevel: "public",
					selectedUsers: [],
					add: false,
					edit: true,
				},
			];
			return recalculateIds(newQuestions);
		});
	};


	const handleTextFieldOnChange = (value, field) => {

		setQuestions(prevState => {
			const updatedQuestions = [...prevState];
			const targetQuestionIndex = updatedQuestions.findIndex(question => question.id === targetQuestion.id);
			updatedQuestions[targetQuestionIndex][field] = value;

			return updatedQuestions;

		});
		if(field !== 'checkboxes'){
			setQuestions((prevState) =>  {
				const updatedQuestions = [...prevState];
				const targetQuestionIndex = updatedQuestions.findIndex(question => question.id === targetQuestion.id);
				updatedQuestions[targetQuestionIndex].checkboxes = [];
				return updatedQuestions;
			})
		}

		if(field === 'public'){
			setQuestions((prevState) =>  {
				const updatedQuestions = [...prevState];
				const targetQuestionIndex = updatedQuestions.findIndex(question => question.id === targetQuestion.id);
				updatedQuestions[targetQuestionIndex].selectedUsers = [];
				return updatedQuestions;
			})
		}

	}

	const handleEditOnClick = () => {
		console.log('targetQuestion.id', targetQuestion.id)
		setQuestions((prevState)=> prevState.map((question) => {
			if (question.id === targetQuestion.id) {
				return {...question, edit: !question.edit}
			} else {
				return question;
			}
		}));
	}

	const handleDeleteOnClick = () => {
		setQuestions((prevState) => {
			const updatedQuestions = prevState.filter(
				(question) => question.id !== targetQuestion.id
			);

			return updatedQuestions.map((question, index) => ({
				...question,
				id: index + 1,
			}));
		});
	};


	return {
		handleAddQuestionOnClick,
		handleTextFieldOnChange,
		handleEditOnClick,
		handleDeleteOnClick
	}


}
export default useActionsQuestion;