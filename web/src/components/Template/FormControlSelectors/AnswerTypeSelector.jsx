import React, {useContext} from "react";
import {TemplateContext} from "../TemplateContext";
import {answerTypeName} from "../../../const/const";
import CustomFormControlSelect from "../../ReusableComponents/CustomFormControlSelect";

 function AnswerTypeSelector () {

	const { handleAnswerType, answerType } = useContext(TemplateContext);

	return (
		<div className="flex-grow-08 margin-right-60">
			<CustomFormControlSelect
				name="Ответы"
				value={answerType}
				onChange={handleAnswerType}
				options={answerTypeName}
			/>
		</div>

	);
}

export default AnswerTypeSelector;