import React from 'react';
import CustomTextField from "./CustomTextField";

function TitleTextField(props) {

  const { title, onChange } = props;

  return (
	  <CustomTextField
		  placeholder="Введите текст"
		  label='Название'
		  variant="standard"
		  onChange={onChange}
		  value={title}
	  />
  );
}

export default TitleTextField;