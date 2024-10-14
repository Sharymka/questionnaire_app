import ToolBlock from "../toolBlock";
import QuestionTextField from "../TextFields/QuestionTextField";
import AnswerField from "./AnswerField";
import AnswerTypeSelector from "../FormControlSelectors/AnswerTypeSelector";
import React, {useContext} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AutocompletePrivateUsers from "../AutocompletePrivateUsers";
import AutocompleteTags from "../AutocompleteTags";
import {TemplateContext} from "../TemplateContext";
import {QuestionContext} from "../contexts/QuestionContext";

function QuestionCard(props){

	const { accessLevel, handleAccessLevel, checkboxOptions } = useContext(TemplateContext);
	const { editorAnchor, showUsers } = useContext(QuestionContext);
	const { question, indexValue } = props;

	return (
		<>
			<div className='d-flex flex-column'>
				<ToolBlock/>
				<div className="d-flex relativePosition">
					<QuestionTextField question={question.name} indexValue={indexValue}/>
					{editorAnchor && (<AnswerTypeSelector/>)}
				</div>
					<AnswerField
						question={question}
						indexValue={indexValue}
					/>
				{
					editorAnchor&& (
						<div>
							<FormControl sx={{width: "50%"}} variant="outlined">
								<InputLabel id="access-level-label">Уровень доступа</InputLabel>
								<Select
									labelId="access-level-label"
									id="access-level"
									value={accessLevel || ''}
									onChange={handleAccessLevel}
									label="Уровень доступа"
								>
									<MenuItem value="public">Общедоступный</MenuItem>
									<MenuItem value="restricted">Ограниченный</MenuItem>
								</Select>
							</FormControl>
							<div style={{width: "50%"}}>
								{
									showUsers && (
										<AutocompletePrivateUsers/>
									)
								}
							</div>
							<div style={{width: "50%"}}>
								<AutocompleteTags/>
							</div>
						</div>
					)
				}
			</div>
		</>
	);
};

export default QuestionCard;