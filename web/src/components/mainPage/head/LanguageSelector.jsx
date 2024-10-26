import React from 'react';
import {MenuItem, Select} from "@mui/material";
import {EN_FLAG_URL, RU_FLAG_URL} from "../../../url/url";

function LanguageSelector(props) {

	const {isDarkMode, handleLanguageChange, language} = props;
  return (
	  <Select
		  value={language}
		  onChange={handleLanguageChange}
		  variant="outlined"
		  size="small"
		  sx={{
			  mx: 2,
			  minWidth: 100,
			  bgcolor: isDarkMode ? '#A0AEC0' : '#fdfdfe',
			  color: '#2D3748',
			  '& .MuiSelect-icon': { color:'#2D3748'},
			  '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
		  }}
	  >
		  <MenuItem value="RU">
			  <img src={RU_FLAG_URL} alt="RU" width="20" style={{ marginRight: 8 }} />
			  RU
		  </MenuItem>
		  <MenuItem value="EN">
			  <img src={EN_FLAG_URL} alt="RU" width="20" style={{ marginRight: 8 }} />
			  EN
		  </MenuItem>
	  </Select>
  );
}

export default LanguageSelector;