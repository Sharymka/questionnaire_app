import React, {useContext} from "react";
import {TemplateContext} from "../../../contexts/TemplateContext";
import {answerTypeName} from "../../../../../const/const";
import CustomFormControlSelect from "../../reusableSimpleComp/CustomFormControlSelect";

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