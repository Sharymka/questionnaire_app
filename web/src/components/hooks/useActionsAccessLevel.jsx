import React, {useContext} from "react";
import {TemplateContext} from "../userPage/contexts/TemplateContext";

const useActionsAccessLevel = (setShowUsers) => {

	const { setQuestions } = useContext(TemplateContext);

	const handleAccessLevel = (accessValue, questionId = null) => {
		setQuestions((prevState) =>  {
				const updatedQuestions = [...prevState];
				const questionIndex = questionId ? updatedQuestions.findIndex(question => question.id === questionId) : updatedQuestions.length - 1;
				const targetQuestion = { ...updatedQuestions[questionIndex] };
				targetQuestion.accessLevel = accessValue;

				updatedQuestions[questionIndex] = targetQuestion;
				return updatedQuestions;
		})

		if(accessValue === 'public'){
			setShowUsers(false);
			setQuestions((prevState) =>  {
				const updatedQuestions = [...prevState];
				const questionIndex = questionId ? updatedQuestions.findIndex(question => question.id === questionId) : updatedQuestions.length - 1;
				const targetQuestion = { ...updatedQuestions[questionIndex] };
				targetQuestion.selectedUsers = [];

				updatedQuestions[questionIndex] = targetQuestion;
				return updatedQuestions;
			})
		}else {
			setShowUsers(true);
		}
	}

	return {
		handleAccessLevel,
	}


}
export default useActionsAccessLevel;