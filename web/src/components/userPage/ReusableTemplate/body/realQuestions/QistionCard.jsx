import React from "react";
import {styled, TextField, Typography} from "@mui/material";
import CustomToolBlock from "./CustomToolBlock";
import CustomTextField from "../../reusableSimpleComp/CustomTextField";
import useActionsQuestion from "../../../../hooks/useActionsQuestion";
import QuestionTemplateBlock from "../questionTemplate/QuestionTemplateBlock";
import {answerTypeName} from "../../../../../const/const";

function QuestionCard(props){

	const { question } = props;

	const {
		handleDeleteOnClick,
		handleEditOnClick
	} = useActionsQuestion();

	return (
		<div data-component="QuestionCard" className=" p-4 card">
			<div className='d-flex flex-column gap-3'>
				<CustomToolBlock
					classes="toolBlockPosition"
					question={question}
					handleDeleteOnClick={handleDeleteOnClick}
					handleEditOnClick={handleEditOnClick}
				/>
					{
						question.edit ? (
							<QuestionTemplateBlock/>): (
							<>
								<Typography variant="body1" className="color_grey">
									{question?.name || "Неизвестное имя"}
								</Typography>
								<div className="mb-3 width-50">
									<CustomTextField
										// classes="color_grey"
										value={{answerType: question.answerType}}
										placeholder={answerTypeName[question.answerType]}
									/>
								</div>
							</>
						)
					}
			</div>
		</div>
	);
};

export default QuestionCard;