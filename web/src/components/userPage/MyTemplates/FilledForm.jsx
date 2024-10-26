import React from 'react';
import TemplateHeader from "../ReusableTemplate/head/TemplateHeader";
import CustomToolBlock from "../ReusableTemplate/body/realQuestions/CustomToolBlock";
import QuestionTextFieldCard from "../ReusableTemplate/body/realQuestions/QuestionTextFielCard";
import {Typography} from "@mui/material";
import AnswerTypeSelectorCard from "../ReusableTemplate/body/realQuestions/AnswerTypeSelectorCard";
import AnswerField from "../ReusableTemplate/body/realQuestions/AnswerField";
import AccessLevelSelector from "../ReusableTemplate/body/AccessLevelSelector";
import AutocompletePrivateUsersCard from "../ReusableTemplate/body/realQuestions/AutoCompletePrivateUsersCard";

function FilledForm(props) {

	const { filledForm, showFilledFormAnchor } = props;

	return (
		<div>
			<div className="card mb-2 card-background"
			     style={{backgroundImage: `url(${filledForm.template.img})`}}></div>
			<TemplateHeader filledForm={filledForm} showFilledFormAnchor={showFilledFormAnchor}/>

			<div className="d-flex flex-column gap-1">
				{
					filledForm.questions.map((question, index) => (
						<>
							<div className="card p-3">
								<Typography
									component="h6"
									variant="h6"
									className="mb-4"
								>
									<span>{index + 1}.</span> {' '}
									{question?.question || "Неизвестное имя"}
								</Typography>
								<Typography
									className="ms-3 darkGrey_color"
									variant="body1"
								>{question?.answer} </Typography>
								<div className="width-50 separator">
								</div>
							</div>

						</>

					))
				}
			</div>
		</div>
	);
}

export default FilledForm;