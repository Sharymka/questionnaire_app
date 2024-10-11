import React, {useContext} from 'react';
import QuestionCard from "./QistionCard";
import {TemplateContext} from "../TemplateContext";

function QuestionsList(props) {

	const { checkboxOptions, questions } = useContext(TemplateContext);
	const { setEditorAnchor, editorAnchor, showUsers } = props;

	return (
		<div className='card d-flex flex-column'>
			{questions.map((question, index) => (
				<QuestionCard
					key={index}
					question={question}
					checkboxOptions={checkboxOptions}
					setEditorAnchor={setEditorAnchor}
					editorAnchor={editorAnchor}
					indexValue={index}
					showUsers={showUsers}
				/>
			))}
		</div>
	);
}

export default QuestionsList;