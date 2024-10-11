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

	const { setAnswerType, setCheckboxOptions } = useContext(TemplateContext);
	const[selectedType, setSelectedType] = React.useState('');

	const handleChange = (event) => {
		const selectedAnswerType = event.target.value;
		setSelectedType(selectedAnswerType);
		setAnswerType(answerTypeName[selectedAnswerType]);
		if(selectedAnswerType !== 'checkboxes') {
			setCheckboxOptions([]);
		}

	};

	return (
		<div className="flex-grow-1">
			<FormControl style={{width: "100%"}} >
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
