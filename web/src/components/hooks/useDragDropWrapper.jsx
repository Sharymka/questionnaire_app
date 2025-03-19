import {DragDropContext, Droppable} from "@hello-pangea/dnd";
import {useContext} from "react";
import {TemplateContext} from "../contexts/TemplateContext";

function useDragDropWrapper(droppableId, config, items, setItems) {

	const handleOnDragEnd = (result) => {
		if (!result.destination) return;
		const array = Array.from(items);
		const [reorderedItem] = array.splice(result.source.index, 1);
		array.splice(result.destination.index, 0, reorderedItem);
		setItems(array);
	};

	return (children) => {
		return  (
			config === 'readOnly' ? (
				children
				): (
				<DragDropContext
					onDragEnd={handleOnDragEnd}
				>
					<Droppable droppableId={droppableId}>
						{(provided) => (
							<div
								className='d-flex flex-column gap-2'
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{children}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
				)
		)
	}

}

export default useDragDropWrapper;