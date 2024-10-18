import React, {useContext, useEffect, useState} from 'react';
import CustomTextField from "../../ReusableComponents/CustomTextField";
import {TemplateContext} from "../TemplateContext";

function QuestionTemplateTextField() {

	const { handleQuestion, question } = useContext(TemplateContext);

  return (
	  <CustomTextField
		  key={question}
		  label="задайте вопрос"
		  variant="standard"
		  value={question}
		  onChange={handleQuestion}
		  placeholder={question || 'Введите вопрос'}
	  />
  );
}

export default QuestionTemplateTextField;