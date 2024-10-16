import React, {useEffect} from 'react';
import CustomTextField from "../ReusableComponents/CustomTextField";

function AnswerTextField(props) {

	const { question } = props;



	useEffect(() => {
		console.log(question.answerType);
	}, []);
	const classes='text-field-underline-dashed';
	const placeholder = question.answerType === 'singleLine' ? "краткий ответ": question.answerType === 'number' ? "числовой ответ" : "развернутый ответ";
	const variant="standard"
	const multiline= question.answerType === 'paragraph';
	const minRows= question.answerType === 'paragraph' ? 2 : 1;
	const maxRows= question.answerType === 'paragraph' ? Infinity : 1;
	// const rows= answerType === 'paragraph' ? 4 : 1;
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
		  // rows={rows}
	  />
  );
}

export default AnswerTextField;