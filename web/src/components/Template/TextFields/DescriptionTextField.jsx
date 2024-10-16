import React, {useContext} from 'react';
import CustomTextField from "../ReusableComponents/CustomTextField";
import {TemplateContext} from "../TemplateContext";

function DescriptionTextField() {

	const { handleDescription, description } = useContext(TemplateContext);
  return (
	  <CustomTextField
		  placeholder="Введите текст"
		  label="Описание"
		  variant="standard"
	      onChange={handleDescription}
		  value={description}
	  />
  );
}

export default DescriptionTextField;