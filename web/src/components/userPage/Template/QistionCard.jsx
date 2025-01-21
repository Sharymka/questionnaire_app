import React, { useContext } from "react";
import { List, Typography } from "@mui/material";
import CustomToolBlock from "./CustomToolBlock";
import CustomTextField from "./CustomTextField";
import useActionsQuestion from "../../hooks/useActionsQuestion";
import QuestionTemplateBlock from "./QuestionTemplateBlock";
import { TemplateContext } from "../../contexts/TemplateContext";
import CustomCheckBoxes from "./CustomCheckBoxes";
import useActionsCheckboxes from "../../hooks/useActionsCheckboxes";
import { answerTypeName } from "../../../const/const";

function QuestionCard({ question, config }) {
	const { questions } = useContext(TemplateContext);
	const targetQuestion = question.id
		? questions?.find(item => item.id === question.id)
		: questions?.[questions.length - 1] || null;

	const { checkboxOnChange } = useActionsCheckboxes(targetQuestion, 'answer');

	const { handleDeleteOnClick,
			handleEditOnClick,
			handleTextFieldOnChange
	      } = useActionsQuestion(targetQuestion);

	const renderCheckboxes = () => (
		<List sx={{ width: '100%' }}>
			<CustomCheckBoxes
				options={targetQuestion.checkboxes}
				actions={{ checkboxOnChange }}
				config={config}
			/>
		</List>
	);

	const renderTextField = () => {
		if (config.answer === 'readOnly') {
			return (
				<Typography className='text-field-underline-dashed textField_style color_grey' variant="body1">
					{answerTypeName[targetQuestion.answerType] || "Неизвестное имя"}
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
						<Typography variant="body1" className="color_grey">
							{targetQuestion.name || "Неизвестное имя"}
						</Typography>
						<div className="mb-3 width-50">
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
