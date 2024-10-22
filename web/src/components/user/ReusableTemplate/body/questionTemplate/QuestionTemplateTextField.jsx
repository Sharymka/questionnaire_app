import React, {useContext} from 'react';
import CustomTextField from "../../reusableSimpleComp/CustomTextField";
import {TemplateContext} from "../../../contexts/TemplateContext";

function QuestionTemplateTextField() {

	const { setQuestion, question } = useContext(TemplateContext);
	// const [forceUpdate, setForceUpdate] = useState(0);

	// useEffect(() => {
	// 	setForceUpdate(prev => prev + 1);
	// }, [question]);

  return (
	  <CustomTextField
		  label="задайте вопрос"
		  variant="standard"
		  value={question}
		  onChange={setQuestion}
		  placeholder={question || 'Введите вопрос'}
	  />
  );
}

export default QuestionTemplateTextField;