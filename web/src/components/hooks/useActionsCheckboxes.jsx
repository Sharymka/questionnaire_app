import {useContext} from "react";
import {TemplateContext} from "../contexts/TemplateContext";

const useActionsCheckboxes = (targetQuestion) => {

	const { setQuestions } =useContext(TemplateContext);

	const checkboxOnChange = (checkboxId, questionId = null) => {
		console.log('checkboxOnChange', checkboxId);
		setQuestions(prevState => {
			const updatedQuestions = [...prevState];
			const targetQuestionIndex = updatedQuestions.findIndex(question => question.id === targetQuestion.id);
			console.log('targetQuestionIndex', targetQuestionIndex);
			updatedQuestions[targetQuestionIndex].checkboxes = updatedQuestions[targetQuestionIndex].checkboxes.map((checkbox) =>
				checkbox.id === Number(checkboxId)
					? {...checkbox, selected: true}
					: {...checkbox, selected: false}
			);

			return updatedQuestions;
		});
	}

	const addOptionOnClick = (event, questionId = null) => {
		setQuestions(prevState => {
			const updatedQuestions = [...prevState];
			const targetQuestionIndex = updatedQuestions.findIndex(question => question.id === targetQuestion.id);
			updatedQuestions[targetQuestionIndex].checkboxes
				.push({ id: updatedQuestions[targetQuestionIndex].checkboxes.length + 1, value: '', selected: false })

			return updatedQuestions;
		});
	};


	const deleteOptionOnClick = (checkboxId) => {
		setQuestions(prevState => {
			const updatedQuestions = [...prevState];
			const targetQuestionIndex = updatedQuestions.findIndex(question => question.id === targetQuestion.id);
			updatedQuestions[targetQuestionIndex].checkboxes = updatedQuestions[targetQuestionIndex].checkboxes.filter((checkbox) => checkbox.id !== checkboxId);
			return updatedQuestions;
		});
	};

	const textFieldOnChange = (value, checkboxId)=> {

		setQuestions(prevState => {
			const updatedQuestions = [...prevState];
			const targetQuestionIndex = updatedQuestions.findIndex(question => question.id === targetQuestion.id);

			updatedQuestions[targetQuestionIndex].checkboxes = updatedQuestions[targetQuestionIndex].checkboxes.map((checkbox) => {
				if (checkbox.id === checkboxId) {
					return {...checkbox, value: value};
				} else {
					return checkbox;
				}
			})
			return updatedQuestions;
		});
	}

	return {
		checkboxOnChange,
		addOptionOnClick,
		deleteOptionOnClick,
		textFieldOnChange
	}


}
export default useActionsCheckboxes;