import React, {useContext} from 'react';
import QuestionCard from "./QistionCard";
import {TemplateContext} from "../TemplateContext";

function QuestionsList() {

	const { questions } = useContext(TemplateContext);

	return (
		<div className='card d-flex flex-column'>
			{questions.map((question, index) => (
				<QuestionCard
					key={index}
					question={question}
					indexValue={index}
				/>
			))}
		</div>
	);
}

export default QuestionsList;