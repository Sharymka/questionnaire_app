import React, {useContext} from 'react';
import CustomTextField from "../ReusableComponents/CustomTextField";
import {TemplateContext} from "../TemplateContext";

function TitleTextField() {

	const { handleTitle, title } = useContext(TemplateContext);

  return (
	  <CustomTextField
		  placeholder="Введите текст"
		  label='Название'
		  variant="standard"
		  onChange={handleTitle}
		  value={title}
	  />
  );
}

export default TitleTextField;