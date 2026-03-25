import React, {useContext} from 'react';
import QuestionCard from "./QuestionCard";
import {TemplateContext} from "@/features/template-editor/model/TemplateContext";
import createDraggableWrapper from "@/features/template-editor/model/hooks/createDraggableWrapper";
import createDragDropWrapper from "@/features/template-editor/model/hooks/createDragDropWrapper";

function QuestionsList() {

	const { config, questions, setQuestions } = useContext(TemplateContext);
	const wrapWithDraggable = createDraggableWrapper( config.baseConfig.header);
	const wrapWithDragDrop = createDragDropWrapper( 'questionsList', config.baseConfig.header, questions, setQuestions);

	const listContent = (
		<div className='d-flex flex-column gap-2'>
			{
				questions?.map((question, index) =>  {

						const questionCard = (
							<QuestionCard
								question={question}
								config={config?.questionList?.find((item) => item.id === question.id) || {}}
							/>
						);
						return wrapWithDraggable(question, index, questionCard);
					}
				)
			}
		</div>
	);
	return wrapWithDragDrop(listContent);


}

export default QuestionsList;
