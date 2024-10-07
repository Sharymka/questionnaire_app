import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select  from '@mui/material/Select';
import {useContext} from "react";
import {TemplateContext} from "./TemplateContext";

import {answerTypeName} from "../../const/const";

const names = Object.keys(answerTypeName);

export default function SelectAnswerType () {

	const { setAnswerType } = useContext(TemplateContext);
	const[selectedType, setSelectedType] = React.useState('');

	const handleChange = (event) => {
		setSelectedType(event.target.value);
		setAnswerType(answerTypeName[event.target.value]);
	};

	return (
		<div>
			<FormControl sx={{ m: 1, width: 300 }}>
				<InputLabel>Ответы</InputLabel>
				<Select
					value={selectedType}
					onChange={handleChange}
					input={<OutlinedInput label="Ответы" />}
				>
					{names.map((name,index) => (
						<MenuItem key={name} value={name}>
							<ListItemText primary={name} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
