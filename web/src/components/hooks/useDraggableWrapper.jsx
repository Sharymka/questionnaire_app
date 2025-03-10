import {Draggable} from "@hello-pangea/dnd";
import {cloneElement, useEffect} from "react";


const wrapWithDraggable = (config, withHandle = false) => {


	return (item, index,  wrappedElement) => {

		return (
			config === 'readOnly' ? (
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

export default wrapWithDraggable;