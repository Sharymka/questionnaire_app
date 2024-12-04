import React from 'react';
import { IconButton } from '@mui/material';

function ActionButton(props){

	const {
		classes,
		onClick,
		imgSrc,
		icon,
		altText,
	} = props;

	return (
		<IconButton className={classes} onClick={onClick}>
			{icon}
			{imgSrc && <img src={imgSrc} alt={altText} style={{ maxWidth: '25px', maxHeight: '25px' }} />}
		</IconButton>
	)
}

export default ActionButton;
