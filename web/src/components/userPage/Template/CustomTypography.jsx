import React from 'react';
import { Typography } from "@mui/material";
import {textFieldNames} from "../../../const/const";
import {getFieldValue} from "../../../utilits/getFieldValue";

function CustomTypography(props) {

	const { value } = props;
	const firstKey = value && Object.keys(value)[0];
	const label = firstKey && firstKey in textFieldNames ? textFieldNames[firstKey] : 'Неизвестное поле';
	const fieldValue = getFieldValue(value, firstKey);
	return (
		<div>
			<Typography component="span" className="label">{label}</Typography>
			<Typography component="span" className="font_size_1rem">{fieldValue}</Typography>
		</div>
	);
}

export default CustomTypography;
