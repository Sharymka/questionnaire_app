import React, {useContext} from "react";
import {List, ListItem, Typography} from "@mui/material";
import CustomToolBlock from "./CustomToolBlock";
import CustomTextField from "./CustomTextField";
import useActionsQuestion from "../../hooks/useActionsQuestion";
import QuestionTemplateBlock from "./QuestionTemplateBlock";
import {TemplateContext} from "../../contexts/TemplateContext";
import CustomCheckBoxes from "./CustomCheckBoxes";
import useActionsCheckboxes from "../../hooks/useActionsCheckboxes";
import {answerTypeName} from "../../../const/const";

function QuestionCard(props){

	const { question, config } = props;

	const { questions } = useContext(TemplateContext);

	const targetQuestion = question.id
		? questions?.find(item => item.id === question.id)
		: questions?.[questions.length - 1] || null;

	const {
		checkboxOnChange
	} = useActionsCheckboxes(targetQuestion);

	const {
		handleDeleteOnClick,
		handleEditOnClick,
		handleTextFieldOnChange
	} = useActionsQuestion(targetQuestion);

	const renderCheckboxes = () => (
		<List sx={{ width: '100%' }}>
			{
				config.question === 'edit' ? (
						question.checkboxes?.map((option, index) => (
							<ListItem key={option.id}>
								<span className="me-2">{index + 1}.</span>
								<Typography>{option.value}</Typography>
							</ListItem>
						))
					): (
						<CustomCheckBoxes
							// btnRef={btnRef}
							options={targetQuestion.checkboxes}
							actions={{
								checkboxOnChange: checkboxOnChange,
							}}
							config={config}
						/>
					)
			}
		</List>
	);

	const renderTextField = () => (
		config.question === 'readOnly'? (
			<Typography className='text-field-underline-dashed textField_style color_grey' variant="body1">
				{answerTypeName[targetQuestion.answerType] || "Неизвестное имя"}
			</Typography>
		) : (
			<CustomTextField
				value={{ answer: targetQuestion.answer || '' }}
				onChange={handleTextFieldOnChange}
				placeholder={targetQuestion.answer || 'Введите ответ'}
				field="answer"
			/>
		)
	);
	const renderAnswerField = () => {
		if (question.answerType === 'checkboxes') {
			return renderCheckboxes();
		}
		return renderTextField();
	};

	return (
		<div data-component="QuestionCard" className="p-4 card">
			<div className='d-flex flex-column gap-3'>
				{
					config.toolBlock && (
						<CustomToolBlock
							classes="toolBlockPosition"
							config={config}
							handleDeleteOnClick={handleDeleteOnClick}
							handleEditOnClick={handleEditOnClick}
						/>
					)
				}

					{
						config.question === 'edit' ? (
							<QuestionTemplateBlock
								targetQuestion={targetQuestion}
								config={config}
							/>): (
							<>
								<Typography variant="body1" className="color_grey">
									{targetQuestion.name || "Неизвестное имя"}
								</Typography>
								<div className="mb-3 width-50">
									{renderAnswerField()}
								</div>
							</>
						)
					}
			</div>
		</div>
	);
};

export default QuestionCard;