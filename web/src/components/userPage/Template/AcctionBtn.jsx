import React, { forwardRef } from 'react';
import { IconButton } from '@mui/material';
import withTooltip from "../../hocs/withTooltip";

const ActionButton = forwardRef((props, ref) => {
	const {
		classes,
		onClick,
		imgSrc,
		icon,
		altText,
		...rest
	} = props;

	return (
		<IconButton className={classes} onClick={onClick} {...rest} ref={ref}>
			{icon}
			{imgSrc && <img src={imgSrc} alt={altText} style={{ maxWidth: '25px', maxHeight: '25px' }} />}
		</IconButton>
	);
});

export default withTooltip(ActionButton);
