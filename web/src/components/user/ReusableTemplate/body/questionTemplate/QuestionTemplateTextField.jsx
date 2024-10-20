import React, {useContext, useEffect, useState} from 'react';
import CustomTextField from "../../reusableSimpleComp/CustomTextField";
import {TemplateContext} from "../../../contexts/TemplateContext";

function QuestionTemplateTextField() {

	const { handleQuestion, question } = useContext(TemplateContext);
	const [, setForceUpdate] = useState(0);

	useEffect(() => {
		console.log('сработал useEffect');
		setForceUpdate(prev => prev + 1);

		// console.log("Question updated:", question);
	}, [question]);

  return (
	  <CustomTextField
		  label="задайте вопрос"
		  variant="standard"
		  value={question}
		  onChange={handleQuestion}
		  placeholder={question || 'Введите вопрос'}
	  />
  );
}

export default QuestionTemplateTextField;