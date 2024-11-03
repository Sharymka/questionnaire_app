import React from 'react';

function withDataAttributes(WrappedComponent) {
	console.log("displayName", WrappedComponent.displayName);

	const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

	// Создаем новый компонент
	const WithAttributes = (props) => {
		return (
			<WrappedComponent
				{...props}
				key={displayName}
				data-content={displayName}
			/>
		);
	};

	// Устанавливаем displayName для нового компонента
	WithAttributes.displayName = `WithDataAttributes(${displayName})`;

	return WithAttributes;
}

export default withDataAttributes;
