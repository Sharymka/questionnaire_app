import React from "react";
import {Typography} from "@mui/material";
import CustomToolBlock from "./CustomToolBlock";
import CustomTextField from "../../reusableSimpleComp/CustomTextField";
import useActionsQuestion from "../../../../hooks/useActionsQuestion";
import QuestionTemplateBlock from "../questionTemplate/QuestionTemplateBlock";

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
										value={{answerType: question.answerType}}
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