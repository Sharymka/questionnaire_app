import {useContext} from "react";
import {TemplateContext} from "../contexts/TemplateContext";

const useActionsQuestion = (targetQuestion) => {

	const { setQuestions, setConfig, setQuestionStatus } = useContext(TemplateContext);


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
		console.log('handleDeleteOnClick');
		setQuestions((prevState) => {
			const updatedQuestions = prevState.filter(
				(question) => question.id !== targetQuestion.id
			);

			return updatedQuestions.map((question, index) => ({
				...question,
				id: index + 1,
			}));
		});

		setConfig((prevState) => {
			const updatedConfigs = prevState.questionList.filter(
				(question) => question.id !== targetQuestion.id
			);

			return {...prevState, questionList: updatedConfigs.map((config, index) => ({
					...config,
					id: index + 1,
				}))}
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