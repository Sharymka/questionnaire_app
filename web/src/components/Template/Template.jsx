import React, {useContext, useState} from 'react';
import {
	Button, FormControlLabel, IconButton, Radio, RadioGroup,
	TextField,
	Typography,
} from '@mui/material';
import SelectAnswerType from "./selectAnswerType";
import {TemplateContext} from "./TemplateContext";
import CheckBoxes from "./CheckBoxes";
import SelectTopic from "./Theme";
import MarkdownEditor from "./MarkdownEditor";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import AutocompletePrivateUsers from "./AutocompletePrivateUsers";
import AutocompleteTags from "./AutocompleteTags";
import SidePanel from "./SidePanel";
import ToolBlock from "./toolBlock";
import QuestionTextField from "./TextFields/QuestionTextField";
import AnswerTextField from "./TextFields/AnswerTextField";
import CheckboxTextField from "./TextFields/CheckboxTextField";
import QuestionList from "./QuestionBlock/QuestionList";

function Template() {

	const { answerType, handleSetName, handleSetDescription, handleSetQuestion, questions, accessLevel, setAccessLevel, setSelectedUsers, checkboxOptions } = useContext(TemplateContext);
	const [editor, setEditor] = useState(true);
	const [showUsers , setShowUsers] = React.useState(false);
	const [editorAnchor, setEditorAnchor] = useState(false);


	const handleAccessLevel = (event) => {
		const newAccessLevel = event.target.value;
		setAccessLevel(newAccessLevel);
		if(newAccessLevel === 'public'){
			setShowUsers(false);
			setSelectedUsers([]);
		}else {
			setShowUsers(true);
		}
	}

	return (
		<div className="d-flex flex-column gap-1">
			<div className="p-4 card">
				<Typography variant="h5">Новая форма</Typography>
				<div className="p-4 d-flex flex-row justify-content-between align-items-center gap-5">
					<div className="flex-grow-1">
						<TextField
							label="Название"
							fullWidth
							margin="normal"
							variant="standard"
							onChange={(event) => handleSetName(event)}
						/>
					</div>
					<div className="flex-grow-1">
						<SelectTopic/>
					</div>
				</div>
				<SidePanel/>
			</div>
			<div className="p-4  card">
				<TextField
					className='text-field-class'
					label="Описание"
					fullWidth
					margin="normal"
					variant="standard"
					slotProps={{
						input: {
							style: {
								userSelect: 'text',
								cursor: 'text !important',
								pointerEvents: 'auto',
							},
						},
					}}
					onFocus={() => setEditor(true)}
					onBlur={() => setEditor(false)}
					onChange={(event) => handleSetDescription(event)}
				/>

			{
				editor && (
					<>
						<MarkdownEditor  className={`markdown-editor ${editor ? 'visible' : ''}`}/>
						{/*<div style={{marginTop: '20px'}}>*/}
						{/*	<ReactMarkdown>{description}</ReactMarkdown>*/}
						{/*</div>*/}
					</>

				)
			}
			</div>
			<QuestionList
				editorAnchor={editorAnchor}
				setEditorAnchor={setEditorAnchor}
				showUsers={showUsers}
			/>
			<div className="p-4 card d-flex flex-row justify-content-between align-items-center gap-5">
				<div className="flex-grow-1">
					<TextField
						label="задайте вопрос"
						fullWidth
						margin="normal"
						variant="standard"
						onChange={(event) => handleSetQuestion(event)}
					/>
				</div>
				<div className="flex-grow-1">
					<SelectAnswerType/>
				</div>
			</div>
			<div className="p-4 card">
				{
					answerType === 'checkboxes' && (
						<CheckBoxes/>
					)
				}
			</div>
			<div className="p-4 card">
					<FormControl sx={{width: "50%"}}  variant="outlined">
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
			</div>
			<div className="p-4 card">
				<div style={{width: "50%"}}>
					<AutocompleteTags/>
				</div>
				{/*<div className="d-flex flex-row justify-content-end align-items-center gap-5">*/}
				{/*	<Button*/}
				{/*		className='btn-primary btn-block'*/}
				{/*		// onClick={handleAddOption}*/}
				{/*		variant="contained"*/}
				{/*		style={{margin: '16px 0', width: '20%'}}*/}
				{/*	>*/}
				{/*		Сохранить вопрос*/}
				{/*	</Button>*/}
				{/*</div>*/}
			</div>
		</div>
	);
}

export default Template;