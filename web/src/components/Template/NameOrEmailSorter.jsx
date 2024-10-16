import React from 'react';
import {FormControlLabel, Radio} from "@mui/material";

function NameOrEmailSorter(props) {
	const { selectedUsers, setSortBy, sortBy } = props;

	const handelSortBy = (value) => {
		if(sortBy !== value) {
			setSortBy(value);
		} else {
			setSortBy('');
		}
	}

	const sortedUsers = (sortBy)=> {
		selectedUsers.sort((a, b) => {
			if (sortBy === 'name') {
				return `${a.first_name}`.localeCompare(`${b.first_name}`);

			} else {
				return a.email.localeCompare(b.email);
			}
		});
	}

	return (
	  <div>
		  <FormControlLabel
			  control={
				  <Radio
					  checked={sortBy === 'name'}
					  onClick={() => {
						  handelSortBy('name');
						  sortedUsers()
					  }
					  }
				  />
			  }
			  label="ФИО"
			  className='checkbox_style'
		  />
		  <FormControlLabel
			  control={
				  <Radio
					  checked={sortBy === 'email'}
					  onClick={() => {
						  handelSortBy('email');
						  sortedUsers()
					  }}
				  />
			  }
			  label="Почта"
			  className='checkbox_style'
		  />
	  </div>
  );
}

export default NameOrEmailSorter;