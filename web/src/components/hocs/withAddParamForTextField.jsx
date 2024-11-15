import {answerTypeName} from "../../const/const";

function withAddParamForTextField(CustomTextField) {
	return function WrappedWithAddParamForTextField(props) {
		const { value, ...otherProps } = props;

		const classes = 'text-field-underline-dashed textField_style';
		const placeholder = answerTypeName[value.answerType] || "Введите текст";
		const variant = "standard";
		const textFieldOptions = {
			multiline: value.answerType === 'paragraph',
			minRows: value.answerType === 'paragraph' ? 2 : 1,
			maxRows: value.answerType === 'paragraph' ? 6 : 1,
		};

		return (
			<CustomTextField
				value={value}
				classes={classes}
				placeholder={placeholder}
				variant={variant}
				textFieldOptions={textFieldOptions}
				{...otherProps} // передача других пропсов, как onChange
			/>
		);
	};
}

export default withAddParamForTextField;
