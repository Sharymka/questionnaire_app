import AnswerTextField from "./AnswerTextField";
import {PARAGRAPH, SINGLE_LINE, CHECKBOXES, NUMBER}  from "../../../../../const/const";
import React, {useContext} from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import {Checkbox, List, ListItem} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import {TemplateContext} from "../../../contexts/TemplateContext";
import CheckBoxesCard from "./CheckBoxesCard";

const AnswerField = (props) => {

	const { question, questionIndex } = props;
	const { setQuestions, questions, editorAnchor } = useContext(TemplateContext);
	const handleDeleteOption = (optionIndex) => {
		setQuestions((prevstate) => prevstate.map((question, index) =>({
			...question,
			checkBoxes: question.checkBoxes.filter((option, index) => index !== optionIndex)
		})));
	}


	switch (questions.find((question, index)=> questionIndex === index)?.answerType) {
		case SINGLE_LINE:
		case PARAGRAPH:
		case NUMBER:
			return <AnswerTextField question={question} questionIndex={questionIndex} />;


		case CHECKBOXES:
			return (
				editorAnchor.find(item => item.id === questionIndex)?.editorAnchorValue ? (
					<CheckBoxesCard question={question} questionIndex={questionIndex}/>
				): (
					<List>
						{question.checkboxOptions.map((option, index) => (
							<ListItem key={index}>
								<ListItemIcon>
									<Checkbox
										edge="start"
										tabIndex={-1}
										disableRipple
										checked={option.selected}
									/>
								</ListItemIcon>
								<ListItemText primary={option.value} />
							</ListItem>
						))}
					</List>
				)
			);

		default:
			return null;
	}
};

export default AnswerField;



