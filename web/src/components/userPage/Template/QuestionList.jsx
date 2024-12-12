import React, {useContext} from 'react';
import {DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd';
import QuestionCard from "./QistionCard";
import {TemplateContext} from "../../contexts/TemplateContext";

function QuestionsList(props) {

	const { config } = props;
	const { questions, setQuestions } = useContext(TemplateContext);

	const handleOnDragEnd = (result) => {
		if (!result.destination) return;
		const items = Array.from(questions);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setQuestions(items);
	};

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Droppable droppableId="questionsList">
				{(provided) => (
					<div
						className='d-flex flex-column gap-2'
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{questions?.map((question, index) => (
								<Draggable key={question?.id} draggableId={String(question?.id)} index={index}>
									{(provided) => (
										<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
											<QuestionCard
												question={question}
												config={config?.questionList?.find((item) => item.id === question.id) || {}}
											/>
										</div>
									)}
								</Draggable>
						))}
					{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}

export default QuestionsList;
