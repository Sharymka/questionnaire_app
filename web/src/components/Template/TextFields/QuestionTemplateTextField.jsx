import React, {useContext} from 'react';
import CustomTextField from "../ReusableComponents/CustomTextField";
import {TemplateContext} from "../TemplateContext";

function QuestionTemplateTextField() {

	const { handleSetQuestion } = useContext(TemplateContext);
  return (
	  <CustomTextField
		  label="задайте вопрос"
		  variant="standard"
		  onChange={handleSetQuestion}
	  />
  );
}

export default QuestionTemplateTextField;