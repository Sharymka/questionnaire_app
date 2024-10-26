import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

function SignOutBtn() {

	const navigate = useNavigate();

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
			  bgcolor: 'error.main',
			  color: 'white',
			  '&:hover': { bgcolor: 'error.dark' },
			  fontWeight: 'bold',
			  borderRadius: 2,
			  px: 2,
		  }}
	  >
		  Log Out
	  </Button>
  );
}

export default SignOutBtn;