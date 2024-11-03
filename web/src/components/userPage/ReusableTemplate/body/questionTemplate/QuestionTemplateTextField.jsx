import React, {useContext} from 'react';
import CustomTextField from "../../reusableSimpleComp/CustomTextField";
import {TemplateContext} from "../../../contexts/TemplateContext";

function QuestionTemplateTextField() {

	const { setQuestion, question } = useContext(TemplateContext);

  return (
	  <CustomTextField
		  value={{ question: question }}
		  onChange={setQuestion}
		  placeholder={question || 'Введите вопрос'}
	  />
  );
}

export default QuestionTemplateTextField;