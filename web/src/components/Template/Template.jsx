import React, {useContext, useState} from 'react';
import {
	Autocomplete,
	FormControlLabel, Radio,
	TextField,
	Typography,
} from '@mui/material';

import SelectAnswerType from "./selectAnswerType";
import {TemplateContext} from "./TemplateContext";
import CheckBoxes from "./CheckBoxes";
import SelectTopic from "./Theme";
import MarkdownEditor from "./MarkdownEditor";
import FixedTags from "./test2";


function Template() {

	const { description, answerType, handleSetName, handleSetDescription, handleSetTopic,handleSetQuestion } = useContext(TemplateContext);
	const [checked, setChecked] = useState(false);
	const [editor, setEditor] = useState(true);
	const[privateUsers, setPrivateUsers] = React.useState([]);
	const [showUsers , setShowUsers] = React.useState(false);
	const handleChange = (event) => {
		setChecked(event.target.checked);
	};
	const handleSetShowUsers = () => {
		setShowUsers(!showUsers);
	}
	return (
		<div className="d-flex flex-column gap-1">
			<div className="p-4 card ">
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
					<FormControlLabel
						control={<Radio checked={showUsers}/>}
						onClick={handleSetShowUsers}
						label="ограничить доступ"
					/>
					{
						showUsers && (
							<FixedTags/>

							// <Autocomplete renderInput={(params) => (
							// 	<TextField  variant="outlined" label="Выберите пользователей" />
							// )}/>
							// <PrivateUsersBlock setShowUsers={setShowUsers} showUsers={showUsers}/>
							// <UserSelection/>
						)
					}
					{/*<Switch*/}
					{/*	checked={checked}*/}
					{/*	onChange={handleChange}*/}
					{/*	inputProps={{ 'aria-label': 'controlled' }}*/}
					{/*/>*/}
					{/*<FormControlLabel*/}
					{/*	control={*/}
					{/*		<Switch*/}
					{/*			checked={required}*/}
					{/*			onChange={(event) => setRequired(event.target.checked)}*/}
					{/*		/>*/}
					{/*	}*/}
					{/*	label="Обязательный вопрос"*/}
					{/*/>*/}
				</div>
		</div>
	);
}

export default Template;