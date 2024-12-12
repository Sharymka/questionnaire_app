import {useContext, useEffect} from "react";
import {TemplateContext} from "../contexts/TemplateContext";
import {getQuestionCardConfig} from "../../utilits/getQuestionCardConfig";

const useActionsQuestion = (targetQuestion, config) => {

	const { questions, setQuestions, setConfig, context } = useContext(TemplateContext);


	const recalculateIds = (questionsArray) => {
		return questionsArray.map((question, index) => ({
			...question,
			id: index + 1,
		}));
	};
	const handleAddQuestionOnClick = () => {
		console.log("handleAddQuestionOnClick");
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
		setConfig((prevState) => {
			return {
				...prevState,
				questionList: prevState.questionList.map((item) => {
					if (item.id === targetQuestion.id) {
						if (item.question === 'edit') {
							return { ...item, question: 'readOnly', checkboxMode:'readOnly' };
						} else if (item.question === 'readOnly') {
							return { ...item, question: 'edit', checkboxMode:'edit' };
						}
					}
					return item;
				}),
			};
		});
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