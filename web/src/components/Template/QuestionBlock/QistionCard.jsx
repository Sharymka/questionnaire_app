import ToolBlock from "../toolBlock";
import QuestionTextField from "../TextFields/QuestionTextField";
import AnswerField from "./AnswerField";
import SelectAnswerType from "../selectAnswerType";
import React, {useContext} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AutocompletePrivateUsers from "../AutocompletePrivateUsers";
import AutocompleteTags from "../AutocompleteTags";
import {TemplateContext} from "../TemplateContext";

function QuestionCard(props){

	const { accessLevel, handleAccessLevel } = useContext(TemplateContext);
	const { showUsers, question, checkboxOptions, setEditorAnchor, editorAnchor, indexValue } = props;

	return (
		<>
			<div className='d-flex flex-column'>
				<div className="p-4 d-flex relativePosition">
					<ToolBlock setEditorAnchor={setEditorAnchor}/>
					<QuestionTextField question={question.name} editorAnchor={editorAnchor} indexValue={indexValue}/>
					{editorAnchor && (<SelectAnswerType/>)}
				</div>
				<AnswerField
					question={question}
					checkboxOptions={checkboxOptions}
					editorAnchor={editorAnchor}
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