import React from 'react';
import { IconButton } from '@mui/material';

function ActionButton(props){

	const {
		onClick,
		icon,
		altText,
		imgSrc
	} = props;

	return (
		<IconButton onClick={onClick}>
			{icon}
			{imgSrc && <img src={imgSrc} alt={altText} style={{ maxWidth: '25px', maxHeight: '25px' }} />}
		</IconButton>
	)
}

export default ActionButton;
