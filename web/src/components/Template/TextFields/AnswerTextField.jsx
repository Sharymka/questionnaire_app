import React from 'react';
import CustomTextField from "../ReusableComponents/CustomTextField";

function AnswerTextField(props) {

	const { answerType } = props;

	const classes='text-field-underline-dashed';
	const placeholder = answerType === 'singleLine' ? "краткий ответ" : "развернутый ответ";
	const variant="standard"
	const multiline= answerType === 'paragraph';
	const minRows= answerType === 'paragraph' ? 4 : 1;
	const maxRows= answerType === 'paragraph' ? Infinity : 1;
	const rows= answerType === 'paragraph' ? 4 : 1;
	const handleValue = () => {

	}

  return (
	  <CustomTextField
		  className={classes}
		  placeholder={placeholder}
		  fullWidth
		  variant={variant}
		  onChange={handleValue}
		  multiline={multiline}
		  minRows={minRows}
		  maxRows={maxRows}
		  rows={rows}
	  />
  );
}

export default AnswerTextField;