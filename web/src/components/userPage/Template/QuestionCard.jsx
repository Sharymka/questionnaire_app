import React, {useContext, useState} from "react";
import { Typography } from "@mui/material";
import CustomToolBlock from "./CustomToolBlock";
import CustomTextField from "./CustomTextField";
import useActionsQuestion from "../../hooks/useActionsQuestion";
import QuestionTemplateBlock from "./QuestionTemplateBlock";
import { TemplateContext } from "../../contexts/TemplateContext";
import CustomCheckBoxes from "./CustomCheckBoxes";
import useActionsCheckboxes from "../../hooks/useActionsCheckboxes";
import { answerTypeName } from "../../../const/const";
import useDragDropWrapper from "../../hooks/useDragDropWrapper";

function QuestionCard({ question, config }) {
	const { questions } = useContext(TemplateContext);
	const targetQuestion = question.id
		? questions?.find(item => item.id === question.id) || {}
		: questions?.length ? questions[questions.length - 1] : {};


	const { handleDeleteOnClick, handleEditOnClick, handleTextFieldOnChange } = useActionsQuestion(targetQuestion);
	const [checkboxesList, setCheckboxesList] = useState(targetQuestion.checkboxes);
	const withDragDropWrapper = useDragDropWrapper('checkboxesId', config.checkboxMode, targetQuestion.checkboxes, setCheckboxesList);

	const { checkboxOnChange } = useActionsCheckboxes(targetQuestion, checkboxesList);

	const renderCheckboxes = () => {
		if (!targetQuestion) return null; // Защита от `undefined`

		if (targetQuestion.answer && config.answer !== 'fillOut') {
			return (
				<Typography className="text-field-underline-dashed textField_style color_grey">
					{targetQuestion.answer}
				</Typography>
			);
		} else {
			if (typeof withDragDropWrapper !== 'function') {
				console.error('withDragDropWrapper is not a function');
				return null;
			}

			return withDragDropWrapper(
				<div className="width-100">
					<CustomCheckBoxes
						options={targetQuestion.checkboxes || []} // Защита от `undefined`
						actions={{ checkboxOnChange }}
						config={config}
					/>
				</div>
			);
		}
	};


	const renderTextField = () => {
		if (config.answer === 'readOnly') {
			return (
				<Typography className='text-field-underline-dashed textField_style color_grey' variant="body1">
					{targetQuestion.answer || answerTypeName[targetQuestion.answerType] || "Неизвестное имя"}
				</Typography>
			);
		}

		if (config.answer === 'fillOut') {
			return (
				<CustomTextField
					value={{ answer: targetQuestion.answer || '' }}
					onChange={handleTextFieldOnChange}
					placeholder={targetQuestion.answer || 'Введите ответ'}
					field="answer"
				/>
			);
		}

		return null;
	};

	const renderAnswerField = () => (question.answerType === 'checkboxes' ? renderCheckboxes() : renderTextField());

	return (
		<div data-component="QuestionCard" className="p-4 card">
			<div className='d-flex flex-column gap-3'>
				{config.toolBlock && (
					<CustomToolBlock
						classes="toolBlockPosition"
						config={config}
						handleDeleteOnClick={handleDeleteOnClick}
						handleEditOnClick={handleEditOnClick}
					/>
				)}

				{config.question === 'readOnly' ? (
					<>
						<Typography variant="body1" className="typographyQuestion">
							{targetQuestion.name || "Неизвестное имя"}
						</Typography>
						<div className="mb-3">
							{renderAnswerField()}
						</div>
					</>
				) :
					config.question === 'edit' ?
						(
							<QuestionTemplateBlock targetQuestion={targetQuestion} config={config} />
						): null
				}
			</div>
		</div>
	);
}

export default QuestionCard;
