import React, {useContext} from 'react';
import CustomTextField from "../../ReusableComponents/CustomTextField";

function CheckboxTextField(props) {
	const { option } = props;

	const classes = 'block-width-50 text-field-underline-none'
	const variant="standard"


	return (
		<CustomTextField
			classes={classes}
			variant={variant}
			label=''
			value={option}
		/>
	);
}

export default CheckboxTextField;