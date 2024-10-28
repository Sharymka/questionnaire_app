import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {AuthContext} from "../context/AuthContext";

function SignOutBtn(props) {

	const { signOut } = useContext(AuthContext);
	const navigate = useNavigate();
	const { isDarkMode } = props;

	const onLogout = async () => {
		localStorage.removeItem('userId');

		await fetch('api/signOut', {
			method: 'POST',
			credentials: 'include',
		});

		signOut();
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
		  Sign Out
	  </Button>
  );
}

export default SignOutBtn;