import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

function SignOutBtn(props) {

	const navigate = useNavigate();
	const { isDarkMode } = props;

	const onLogout = async () => {
		localStorage.removeItem('userId');
		localStorage.removeItem('nickname');

		await fetch('api/signOut', {
			method: 'POST',
			credentials: 'include',
		});

		navigate('/signIn');
	};
  return (
	  <Button
		  color="inherit"
		  onClick={onLogout}
		  sx={{
			  color: isDarkMode ? '#F7FAFC' : '#51565a',
			  '&:hover': { bgcolor: isDarkMode ? '#4A5568' : '#d5e7fd' },
			  px: 2
		  }}
	  >
		  Log Out
	  </Button>
  );
}

export default SignOutBtn;