import React, {useContext} from 'react';
import CustomTextField from "../../ReusableComponents/CustomTextField";
import {TemplateContext} from "../TemplateContext";

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