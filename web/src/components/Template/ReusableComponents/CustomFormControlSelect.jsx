import React from 'react';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@mui/material/FormControl";

function CustomFormControlSelect(props) {

  const {
	  classes='',
	  name,
	  options,
	  value,
	  onChange,
  } = props;

  return (
		  <FormControl
			  className={classes + "w-100"}
		  >
			  <InputLabel>{name}</InputLabel>
			  <Select
				  value={value}
				  displayEmpty
				  onChange={ onChange}
				  input={<OutlinedInput label={name} />}
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