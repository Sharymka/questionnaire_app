import React from 'react';
import CustomTextField from "../../reusableSimpleComp/CustomTextField";

function AnswerTextField(props) {

	const { question } = props;

	const classes='text-field-underline-dashed';
	const placeholder = question.answerType === 'singleLine' ? "краткий ответ": question.answerType === 'number' ? "числовой ответ" : "развернутый ответ";
	const variant="standard"
	const multiline= question.answerType === 'paragraph';
	const minRows= question.answerType === 'paragraph' ? 2 : 1;
	const maxRows= question.answerType === 'paragraph' ? Infinity : 1;
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
	  />
  );
}

export default AnswerTextField;