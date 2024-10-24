import AnswerField from "./AnswerField";
import React, {useContext} from "react";
import {TemplateContext} from "../../../contexts/TemplateContext";
import AutocompletePrivateUsersCard from "./AutoCompletePrivateUsersCard";
import AnswerTypeSelectorCard from "./AnswerTypeSelectorCard";
import QuestionTextFieldCard from "./QuestionTextFielCard";
import {Typography} from "@mui/material";
import CustomToolBlock from "./CustomToolBlock";
import AccessLevelSelector from "../AccessLevelSelector";

function QuestionCard(props){

	const { question, questionIndex } = props;
	const { handleEditorAnchor, handleDeleteQuestion, questions, setQuestions , editorAnchor,  privateUsersAnchor} = useContext(TemplateContext);
	const foundQuestion = questions.find((item, index) =>index === questionIndex);
	const accessLevel = foundQuestion ? foundQuestion.access : null;

	const handleAccessLevel = (event) => {
		const newValue = event.target.value
		setQuestions((prevState) =>
			prevState.map((question, index) => {
				if (index === questionIndex) {
					return { ...question, access: newValue };
				} else {
					return question;
				}
			})
		);
	};

	return (
		<div className=" p-4 card">
			<div className='d-flex flex-column gap-3'>
				<CustomToolBlock
					classes="toolBlockPosition"
					valueIndex={questionIndex}
					onDeleteClick={handleDeleteQuestion}
					onEditOrSaveOnClick={handleEditorAnchor}
					anchor={ editorAnchor.find(item => item.id === questionIndex)?.editorAnchorValue}
				/>
				<div className="d-flex justify-content-start gap-3 relativePosition">
					{
						editorAnchor.find(item => item.id === questionIndex)?.editorAnchorValue ? (
							<QuestionTextFieldCard question={question?.name || "Неизвестное имя"} questionIndex={questionIndex}/>) : (
							<Typography variant="body1" className="color_grey">
								{question?.name || "Неизвестное имя"}
							</Typography>
						)
					}
					{
						editorAnchor.find(item => item.id === questionIndex)?.editorAnchorValue && (
							<AnswerTypeSelectorCard questionIndex={questionIndex}/>
						)}
				</div>
				<div className="mb-3 width-50">
					<AnswerField
						question={question}
						questionIndex={questionIndex}
					/>
				</div>
				{
					editorAnchor.find(item => item.id === questionIndex)?.editorAnchorValue && (
						<div className="d-flex flex-column gap-2">
							<div className="width-50 mb-3">
								<AccessLevelSelector/>
							</div>

							<div className="width-50">
								{
									editorAnchor.find(item => item.id === questionIndex)?.editorAnchorValue &&
									privateUsersAnchor.find(item => item.id === questionIndex)?.privateUsersAnchorValue && (
										<AutocompletePrivateUsersCard question={question} questionIndex={questionIndex}/>
									)
								}

							</div>
							{/*<div className="width-50">*/}
							{/*	<AutocompleteTagsCard question={question} questionIndex={questionIndex}/>*/}
							{/*</div>*/}
						</div>
					)
				}
			</div>
		</div>
	);
};

export default QuestionCard;