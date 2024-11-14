import {PARAGRAPH, SINGLE_LINE, CHECKBOXES, NUMBER, answerTypeName} from "../../../../../const/const";
import React, {useContext} from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import {Checkbox, List, ListItem, Radio, Typography} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import {TemplateContext} from "../../../contexts/TemplateContext";
import CheckBoxesCard from "./CheckBoxesCard";
import CustomTextField from "../../reusableSimpleComp/CustomTextField";

const AnswerField = (props) => {

	const {
		question,
		questionIndex,
		questions,
	} = props;
	const { editorAnchor } = useContext(TemplateContext);

	switch (questions.find((question, index)=> questionIndex === index)?.answerType) {
		case SINGLE_LINE:
		case PARAGRAPH:
		case NUMBER:
			return (
				<CustomTextField
					value={{answerType: question.answerType}}
				/>
			)


		case CHECKBOXES:
			return (
				editorAnchor.find(item => item.id === questionIndex)?.editorAnchorValue ? (
					<CheckBoxesCard question={question} questionIndex={questionIndex}/>
				): (
					<List data-component="List">
						{question.checkboxes?.map((option, index) => (
							<ListItem key={index}>
								<ListItemIcon>
									<Radio
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



