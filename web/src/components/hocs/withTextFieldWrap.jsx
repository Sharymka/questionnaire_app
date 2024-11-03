import React from 'react';
import TextFieldWrap from '../wrappers/TextFieldWrap';

function withTextFieldWrap(WrappedComponent) {
	return function WrappedWithTextField(props) {
		const { wrap = true, ...rest } = props;

		if (!wrap) {
			return <WrappedComponent {...rest} />;
		}

		return (
			<TextFieldWrap>
				<WrappedComponent {...rest} />
			</TextFieldWrap>
		);
	};
}

export default withTextFieldWrap;
