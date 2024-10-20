import React, {useContext} from 'react';
import CustomTextField from "../../reusableSimpleComp/CustomTextField";
import {TemplateContext} from "../../../contexts/TemplateContext";

function QuestionTextFieldCard(props) {

	const { question, questionIndex } = props;
	const { editorAnchor, setQuestions } = useContext(TemplateContext);
	const underlineNone = 'block-width-50 text-field-underline-none'
	const underlineSolid = 'block-width-50 text-field-underline-solid';
	const variant="standard";
	const name = "name";

	const handleEditQuestion = (event) => {
		setQuestions((prevState) => prevState.map((question, index) =>{
			if (questionIndex === index) {
				return { ...question, name: event.target.value };
			} else {
				return question;
			}
		}))
	}

	return (
		<div className='flex-grow-07'>
			<CustomTextField
				classes={editorAnchor? underlineSolid : underlineNone }
				variant={variant}
				label= ''
				value={question}
				onChange={handleEditQuestion}

			/>
		</div>

	);
}

export default QuestionTextFieldCard;