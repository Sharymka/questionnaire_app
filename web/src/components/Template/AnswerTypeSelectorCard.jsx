import React, {useContext} from "react";
import {TemplateContext} from "./TemplateContext";
import {answerTypeName} from "../../const/const";
import CustomFormControlSelect from "./ReusableComponents/CustomFormControlSelect";

function AnswerTypeSelectorCard(props) {

	const { questionIndex } = props;

	const { setQuestions, questions } = useContext(TemplateContext);

	const handleAnswerType = (event) => {
		const newAnswerType = event.target.value;

		setQuestions(prevState =>
			prevState.map((item, index) => {
				if (index === questionIndex) {
					return { ...item, answerType: newAnswerType };
				} else {
					return item;
				}
			})
		);
	};

	const answerType = questions.find((item, index)=>  index === questionIndex).answerType;

	return (
		<div className="flex-grow-06 margin-right-70">
			<CustomFormControlSelect
				name="Ответы"
				value={answerType}
				onChange={handleAnswerType}
				options={answerTypeName}
			/>
		</div>

	);
}

export default AnswerTypeSelectorCard;