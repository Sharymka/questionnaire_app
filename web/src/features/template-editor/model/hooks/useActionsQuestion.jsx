import {useContext} from "react";
import {TemplateContext} from "../TemplateContext";
import {recalculateIds} from "@/shared/lib/utilits/recalculateIds";
import {CONFIG_ACTIONS} from "../configActionTypes";

const useActionsQuestion = (targetQuestion) => {

	const { setQuestions, configDispatch, setQuestionStatus } = useContext(TemplateContext);

	const handleAddQuestionOnClick = () => {
		setQuestions((prevState) => {
			const newQuestions = [
				...prevState,
				{
					id: prevState.length + 1,
					name: "",
					answerType: "singleLine",
					answer: '',
					checkboxes: [],
					accessLevel: "public",
					selectedUsers: [],
				},
			];
			return recalculateIds(newQuestions);
		});
		setQuestionStatus('edit');
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
		configDispatch({ type: CONFIG_ACTIONS.TOGGLE_QUESTION_MODE, payload: targetQuestion.id});
	}


	const handleDeleteOnClick = () => {
		setQuestions((prevState) => {
			const updatedQuestions = prevState.filter(
				(question) => question.id !== targetQuestion.id
			);

			return recalculateIds(updatedQuestions);
		});

		configDispatch({ type: CONFIG_ACTIONS.REMOVE_QUESTION, payload: targetQuestion.id });
	};


	return {
		handleAddQuestionOnClick,
		handleTextFieldOnChange,
		handleEditOnClick,
		handleDeleteOnClick
	}


}
export default useActionsQuestion;