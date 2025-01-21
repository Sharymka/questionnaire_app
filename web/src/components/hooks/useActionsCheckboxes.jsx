import {useContext} from "react";
import {TemplateContext} from "../contexts/TemplateContext";

const useActionsCheckboxes = (targetQuestion) => {

	const { setQuestions } =useContext(TemplateContext);

	const checkboxOnChange = (checkboxId) => {

		setQuestions(prevState =>
			prevState.map(question =>
				question.id ===  Number(targetQuestion.id)
					? {
						...question,
						checkboxes: question.checkboxes.map(checkbox => {
							if (checkbox.id === Number(checkboxId)) {
								return { ...checkbox, selected: true };
							}
							return { ...checkbox, selected: false };
						}),
						answer: question.checkboxes.find(checkbox => checkbox.id === Number(checkboxId))?.value || '',
					}
					: question
			)
		);
	}

	const addOptionOnClick = () => {
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