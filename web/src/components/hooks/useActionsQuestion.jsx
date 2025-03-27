import {useContext} from "react";
import {TemplateContext} from "../contexts/TemplateContext";
import {recalculateIds} from "../../utilits/recalculateIds";
import {getQuestionCardConfig} from "../../utilits/getQuestionCardConfig";

const useActionsQuestion = (targetQuestion) => {

	const { setQuestions,questions,  configDispatch, config, setQuestionStatus } = useContext(TemplateContext);

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
		configDispatch({ type: 'TOGGLE_QUESTION_MODE', payload: targetQuestion.id});
	}


	const handleDeleteOnClick = () => {
		console.log('targetQuestion id:', targetQuestion.id);
		setQuestions((prevState) => {
			const updatedQuestions = prevState.filter(
				(question) => question.id !== targetQuestion.id
			);

			return updatedQuestions.map((question, index) => ({
				...question,
				id: index + 1,
			}));
		});

		const filteredConfigs = config.questionList.filter(
			(question) => question.id !== targetQuestion.id
		);

		const reIndexedConfig = filteredConfigs.map((question, index) => ({
			...question,
				id: index + 1
		}));

		configDispatch({ type: 'REMOVE_QUESTION', payload: reIndexedConfig });
	};


	return {
		handleAddQuestionOnClick,
		handleTextFieldOnChange,
		handleEditOnClick,
		handleDeleteOnClick
	}


}
export default useActionsQuestion;