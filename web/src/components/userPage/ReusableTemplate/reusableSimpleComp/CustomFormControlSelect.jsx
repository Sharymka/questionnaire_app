import React from 'react';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@mui/material/FormControl";

function CustomFormControlSelect(props) {

  const {
	  value, // приходит просто строка '' или 'назавние'
	  onChange, // приходит просто функция типа setTopic
	  options, //приходит массив вариантов для селектора
	  label, // просто строка
	  classes,
	  field,
	  // optionId = null
  } = props;
	const handleChange = (event) => {
		if (typeof onChange === 'function') {
			if(field) {
				onChange(event.target.value, field);
			} else {
				onChange(event.target.value);
			}
		} else {
			console.error('onChange is not a function:', onChange);
		}
	};


	return (
		  <FormControl
			  className={`fullWidth ${classes}`}
		  >
			  <InputLabel>{label}</InputLabel>
			  <Select
				  value={value}
				  displayEmpty
				  onChange={handleChange}
				  input={<OutlinedInput label={label} />}
			  >
				  {Object.keys(options).map((name,index) => (
					  <MenuItem key={index} value={name}>
						  <ListItemText  primary={options[name]} />
					  </MenuItem>
				  ))}
			  </Select>
		  </FormControl>
  );
}

export default CustomFormControlSelect;