import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select  from '@mui/material/Select';
import {useContext} from "react";
import {TemplateContext} from "./TemplateContext";

import {questionTopics} from "../../const/const";

const topics = Object.keys(questionTopics);

export default function SelectTopic () {

	const {setTopic} = useContext(TemplateContext);
	const[selectedType, setSelectedType] = React.useState('');

	const handleChange = (event) => {
		setSelectedType(event.target.value);
		setTopic(questionTopics[event.target.value]);
	};

	return (
		<div>
			<FormControl style={{width: "100%"}} >
				<InputLabel>Тема</InputLabel>
				<Select
					value={selectedType}
					onChange={handleChange}
					input={<OutlinedInput label="Ответы" />}
				>
					{topics.map((name,index) => (
						<MenuItem key={name} value={name}>
							<ListItemText primary={name} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
