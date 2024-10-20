import React from 'react';
import CustomTextField from "./CustomTextField";

function DescriptionTextField(props) {

	const { onChange, description} = props;
  return (
	  <CustomTextField
		  placeholder="Введите текст"
		  label="Описание"
		  variant="standard"
	      onChange={onChange}
		  value={description}
	  />
  );
}

export default DescriptionTextField;