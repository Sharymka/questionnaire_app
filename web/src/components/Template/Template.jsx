import React, {useContext, useState} from 'react';
import {
	TextField,
	Typography,
} from '@mui/material';
import SelectAnswerType from "./selectAnswerType";
import {TemplateContext} from "./TemplateContext";
import CheckBoxes from "./CheckBoxes";


function Template() {

	const { answerType } = useContext(TemplateContext);
	const [required, setRequired] = useState(false);

	return (
		<div className="d-flex flex-column gap-1">
			<div className="p-4 card ">
				<Typography variant="h5">Новая форма</Typography>
				<TextField
					label="Название"
					fullWidth
					margin="normal"
					variant="standard"
				/>
			</div>
			<div className="p-4 card ">
				<TextField
					label="Описание"
					fullWidth
					margin="normal"
					variant="standard"
					InputProps={{ disableUnderline: true }}
				/>
			</div>
			<div className="p-4 card d-flex flex-row justify-content-between align-items-end gap-5">
				<div className="flex-grow-1 ">
					<TextField
						label="задайте вопрос"
						fullWidth
						margin="normal"
						variant="standard"
					/>
				</div>
				<div className="flex-grow-1">
					<div>
						<SelectAnswerType/>
					</div>
				</div>
			</div>
			<div className="p-4 card">
				{
					answerType === 'checkboxes' && (
						<CheckBoxes/>
					)
				}
			</div>
			{/*<FormControlLabel*/}
			{/*	control={<Switch checked={required} onChange={(e) => setRequired(e.target.checked)}/>}*/}
			{/*	label="Обязательный вопрос"*/}
			{/*/>*/}
		</div>
	);
}

export default Template;