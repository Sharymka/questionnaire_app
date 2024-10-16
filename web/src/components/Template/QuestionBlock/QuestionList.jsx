import React, {useContext} from 'react';
import QuestionCard from "./QistionCard";
import {TemplateContext} from "../TemplateContext";

function QuestionsList() {

	const { questions } = useContext(TemplateContext);

	return (
		<div className='d-flex flex-column gap-2'>
			{questions.map((question, index) => (
				<QuestionCard
					key={index}
					question={question}
					questionIndex={index}
				/>
			))}
		</div>
	);
}

export default QuestionsList;