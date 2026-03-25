import {Draggable} from "@hello-pangea/dnd";
import {cloneElement} from "react";


const createDraggableWrapper = (config, withHandle = false) => {

	return (item, index,  wrappedElement) => {

		return (
			config === 'readOnly' || config === 'select' ? (
				wrappedElement
			): (
				<Draggable key={item.id} draggableId={String(item.id)} index={index}>
					{(provided) => (
						<div
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
						>
							{withHandle
								? cloneElement(wrappedElement, { dragHandleProps: provided.dragHandleProps })
								: wrappedElement

							}

						</div>
					)}
				</Draggable>
			)
		)
	}
}

export default createDraggableWrapper;
