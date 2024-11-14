import {useContext} from "react";
import {TemplateContext} from "../userPage/contexts/TemplateContext";

const useActionsCheckboxes = () => {

	const {
		questions,
		setQuestions
	} =useContext(TemplateContext);

	const checkboxOnChange = (checkboxId, questionId = null) => {
		//value -это option id

		setQuestions(prevState => {
			const updatedQuestions = [...prevState];
			const questionIndex = questionId ? updatedQuestions.findIndex(question => question.id === questionId) : updatedQuestions.length - 1;
			const targetQuestion = { ...updatedQuestions[questionIndex] };

			targetQuestion.checkboxes = targetQuestion.checkboxes.map((checkbox) =>
				checkbox.id === checkboxId
					? { ...checkbox, selected: true }
					: { ...checkbox, selected: false }
			);

			updatedQuestions[questionIndex] = targetQuestion;
			return updatedQuestions;
		});


		// setCheckboxes((prevState) =>
		// 	prevState.map((option) => {
		//
		// 		if(option.id === parseInt(value)) {
		// 			return {...option, selected: true}
		// 		}else {
		// 			return {...option, selected: false}
		// 		}
		//
		// 	})
		// );
	};
	const addOptionOnClick = (event, questionId = null) => {

		setQuestions(prevState => {
			const updatedQuestions = [...prevState];

			let questionIndex;

			if (questionId !== null) {
				questionIndex = updatedQuestions.findIndex(question => question.id === questionId);

				if (questionIndex === -1) {
					console.warn('Question not found with id:', questionId);
					// Если не найден, можно вернуть предыдущее состояние или обработать как-то иначе
					return prevState;
				}
			} else {
				questionIndex = updatedQuestions.length - 1;
			}
			const targetQuestion = { ...updatedQuestions[questionIndex] };
			console.log('targetQuestion ->', targetQuestion);

			targetQuestion.checkboxes = [
				...targetQuestion.checkboxes,
				{ id: targetQuestion.checkboxes.length + 1, value: '', selected: false }
			];

			updatedQuestions[questionIndex] = targetQuestion;
			return updatedQuestions;
		});
		// setCheckboxes([...checkboxes, { id:checkboxes.length + 1, value: '', selected: false }]);
	};

	const deleteOptionOnClick = (checkboxId, questionId = null) => {
		setQuestions(prevState => {
			const updatedQuestions = [...prevState];
			const questionIndex = questionId ? updatedQuestions.findIndex(question => question.id === questionId) : updatedQuestions.length - 1;
			const targetQuestion = { ...updatedQuestions[questionIndex] };

			targetQuestion.checkboxes = targetQuestion.checkboxes.filter((checkbox) => checkbox.id !== checkboxId);

			updatedQuestions[questionIndex] = targetQuestion;
			return updatedQuestions;
		});
		// setCheckboxes(prevState => (prevState.filter((option, index)=> option.id!== selectedId)));
	};

	const textFieldOnChange = (value, checkboxId, questionId = null)=> {

		setQuestions(prevState => {
			const updatedQuestions = [...prevState];
			const questionIndex = questionId ? updatedQuestions.findIndex(question => question.id === questionId) : updatedQuestions.length - 1;
			const targetQuestion = { ...updatedQuestions[questionIndex] };

			targetQuestion.checkboxes = targetQuestion.checkboxes.map((checkbox) => {
				if (checkbox.id === checkboxId) {
					return {...checkbox, value: value};
				} else {
					return checkbox;
				}
			})

			updatedQuestions[questionIndex] = targetQuestion;
			return updatedQuestions;
		});
		// setCheckboxes((prevState) => (
		// 	prevState.map((option, index)=> option.id === selectedId ? {...option, value: value}  : option )
		// ));
	}

	return {
		checkboxOnChange,
		addOptionOnClick,
		deleteOptionOnClick,
		textFieldOnChange
	}


}
export default useActionsCheckboxes;