import React, {useContext} from "react";
import {TemplateContext} from "../TemplateContext";
import {answerTypeName, LABEL_TAGS} from "../../../const/const";
import CustomFormControlSelect from "../ReusableComponents/CustomFormControlSelect";

 function AnswerTypeSelector () {

	const { handleAnswerType, answerType } = useContext(TemplateContext);

	return (
		<CustomFormControlSelect
			name="ответы"
			value={answerType}
			label="ответы"
			onChange={handleAnswerType}
			options={answerTypeName}
		/>
	);
}

export default AnswerTypeSelector;