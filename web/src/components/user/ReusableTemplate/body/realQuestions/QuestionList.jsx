import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import QuestionCard from "./QistionCard";

function QuestionsList(props) {
	const { questions, setQuestions } = props;

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
						{questions.map((question, index) => (
							<Draggable key={index} draggableId={String(index)} index={index}>
								{(provided) => (
									<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
										<QuestionCard
											question={question}
											questionIndex={index}
										/>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder} {/* Место для заполнения, чтобы избежать изменения размера при перетаскивании */}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}

export default QuestionsList;
