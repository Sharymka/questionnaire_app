import React, {useContext} from 'react';
import QuestionCard from "./QuestionCard";
import {TemplateContext} from "@/features/template-editor/model/TemplateContext";
import useDraggableWrapper from "@/features/template-editor/model/hooks/useDraggableWrapper";
import useDragDropWrapper from "@/features/template-editor/model/hooks/useDragDropWrapper";

function QuestionsList() {

	const { config, questions, setQuestions } = useContext(TemplateContext);
	const wrapWithDraggable = useDraggableWrapper( config.baseConfig.header);
	const wrapWithDragDrop = useDragDropWrapper( 'questionsList', config.baseConfig.header, questions, setQuestions);

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
